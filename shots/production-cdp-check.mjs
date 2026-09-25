import { writeFile } from "node:fs/promises";

const mode = process.argv[2] || "desktop";
const port = process.argv[3] || "9333";
const pages = await fetch(`http://127.0.0.1:${port}/json`).then((response) => response.json());
const page = pages.find((item) => item.type === "page");
if (!page) throw new Error("No browser page is available");

const socket = new WebSocket(page.webSocketDebuggerUrl);
const calls = new Map();
const events = new Map();
let messageId = 0;

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id && calls.has(message.id)) {
    const { resolve, reject } = calls.get(message.id);
    calls.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
    return;
  }
  const waiting = events.get(message.method);
  if (waiting) {
    events.delete(message.method);
    waiting(message.params);
  }
});

function send(method, params = {}) {
  const id = ++messageId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => calls.set(id, { resolve, reject }));
}

function waitFor(method, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      events.delete(method);
      reject(new Error(`Timed out waiting for ${method}`));
    }, timeout);
    events.set(method, (value) => {
      clearTimeout(timer);
      resolve(value);
    });
  });
}

await send("Page.enable");
await send("Runtime.enable");
await send("Network.enable");
await send("Network.setCacheDisabled", { cacheDisabled: true });

const isDesktop = mode === "desktop" || mode === "full";
await send("Emulation.setDeviceMetricsOverride", {
  width: isDesktop ? 1440 : 360,
  height: isDesktop ? 900 : 800,
  deviceScaleFactor: 1,
  mobile: !isDesktop,
  screenWidth: isDesktop ? 1440 : 360,
  screenHeight: isDesktop ? 900 : 800
});

if (!isDesktop) {
  await send("Emulation.setUserAgentOverride", {
    userAgent: "Mozilla/5.0 (Linux; Android 11; Pixel 4a) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36",
    platform: "Android"
  });
}

if (mode === "slow4g") {
  await send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 400,
    downloadThroughput: 50000,
    uploadThroughput: 50000,
    connectionType: "cellular4g"
  });
} else {
  await send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 0,
    downloadThroughput: -1,
    uploadThroughput: -1
  });
}

if (mode === "nojs") {
  await send("Emulation.setScriptExecutionDisabled", { value: true });
} else {
  await send("Emulation.setScriptExecutionDisabled", { value: false });
}

const loaded = waitFor("Page.loadEventFired");
await send("Page.navigate", { url: "https://gutter-runners-demo.vercel.app/" });
await loaded;
await new Promise((resolve) => setTimeout(resolve, mode === "slow4g" ? 9000 : mode === "nojs" ? 3500 : 2600));

const evaluation = await send("Runtime.evaluate", {
  expression: `JSON.stringify({
    title: document.title,
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    heading: document.querySelector('h1')?.textContent,
    heroButton: document.querySelector('.hero .primary-button')?.textContent,
    estimate: document.querySelector('#estimate')?.textContent.includes('Tell us about the job.'),
    workHidden: document.querySelector('#work')?.hidden,
    scriptCount: document.scripts.length,
    ready: window.__ready === true,
    motion: window.__motionStats || null
  })`,
  returnByValue: true
});
const screenshot = await send("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: mode === "full" });
await writeFile(`shots/prod-${mode}.png`, Buffer.from(screenshot.data, "base64"));
console.log(evaluation.result.value);
socket.close();
