"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

const services = [
  { number: "01", name: "Seamless metal gutters", text: "A continuous gutter run fitted to the roofline." },
  { number: "02", name: "Gutter installation", text: "New gutter systems for homes around Fort Wayne." },
  { number: "03", name: "Gutter repair", text: "Help for leaks, loose sections, and drainage trouble." },
];

export default function Home() {
  const [sent, setSent] = useState(false);

  function submitEstimate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const saved = JSON.parse(localStorage.getItem("gutterRunnersRequests") || "[]") as unknown[];
    saved.push({
      id: Date.now(),
      name: String(data.get("name") || "Estimate request"),
      service: String(data.get("service") || "Gutter service"),
      address: String(data.get("address") || "Fort Wayne property"),
      contact: [String(data.get("phone") || ""), String(data.get("email") || "")].filter(Boolean).join(" · "),
      stage: "New",
    });
    localStorage.setItem("gutterRunnersRequests", JSON.stringify(saved));
    setSent(true);
  }

  return (
    <main>
      <div className="demoBar">
        <span>Sweet Dreams demo</span>
        <Link href="/admin">Open Estimate Desk</Link>
      </div>

      <header className="siteHeader">
        <Link className="wordmark" href="#top" aria-label="Gutter Runners home">
          <span>GUTTER</span> RUNNERS
        </Link>
        <nav aria-label="Main navigation">
          <Link href="#services">Services</Link>
          <Link href="#estimate">Estimate</Link>
        </nav>
        <a className="headerCall" href="tel:2605572569">260 557 2569</a>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow">FORT WAYNE GUTTER SERVICE</p>
          <h1>KEEP WATER<br />MOVING.</h1>
          <p className="heroSub">Installation, repair, and seamless metal gutters for Fort Wayne and surrounding areas.</p>
          <div className="heroActions">
            <a className="primaryCta" href="#estimate">Request a Free Estimate <span aria-hidden="true">↓</span></a>
            <p className="trustLine"><span aria-hidden="true">●</span> Free estimates.<br />Locally owned and operated.</p>
          </div>
        </div>
        <div className="rainPanel" aria-label="Abstract rain on galvanized metal atmosphere">
          <Image src="/rain-on-metal.png" alt="Rain moving across a plain galvanized metal surface" fill priority sizes="(max-width: 700px) 100vw, 46vw" />
          <div className="rainShade" />
          <span className="waterDrop dropOne" />
          <span className="waterDrop dropTwo" />
          <span className="waterDrop dropThree" />
          <p>RAIN IN.<br /><strong>WATER OUT.</strong></p>
        </div>
        <div className="channel" aria-hidden="true"><span className="channelShine" /><span className="channelWater" /></div>
        <div className="downspout heroDownspout" aria-hidden="true"><span /></div>
      </section>

      <section className="serviceSection" id="services">
        <div className="sectionIntro">
          <p className="eyebrow dark">ONE CLEAR ROUTE</p>
          <h2>GUTTER WORK,<br />WITHOUT THE RUNAROUND.</h2>
          <p>Choose what you need. The route ends at one simple estimate request.</p>
        </div>
        <div className="serviceList">
          {services.map((service) => (
            <article className="serviceRow" key={service.number}>
              <span>{service.number}</span>
              <div><h3>{service.name}</h3><p>{service.text}</p></div>
              <a href="#estimate" aria-label={`Request an estimate for ${service.name}`}>↘</a>
            </article>
          ))}
        </div>
      </section>

      <section className="routeSection" aria-labelledby="routeTitle">
        <div className="verticalPipe" aria-hidden="true"><i /></div>
        <div className="routeCopy">
          <p className="eyebrow">BUILT FOR THE WATER PATH</p>
          <h2 id="routeTitle">FROM ROOFLINE<br />TO DRAINAGE.</h2>
          <p>Tell Gutter Runners what is happening at your property. Your request stays focused on the work you need.</p>
        </div>
        <dl className="factGrid">
          <div><dt>AREA</dt><dd>Fort Wayne and surrounding areas</dd></div>
          <div><dt>SERVICE</dt><dd>Installation and repair</dd></div>
          <div><dt>ESTIMATE</dt><dd>Free to request</dd></div>
          <div><dt>CONTACT</dt><dd>Call, email, or use the form</dd></div>
        </dl>
      </section>

      <section className="estimateSection" id="estimate">
        <div className="estimateHeading">
          <p className="eyebrow dark">THE DOWNSPOUT ENDS HERE</p>
          <h2>REQUEST YOUR<br />FREE ESTIMATE.</h2>
          <p>Share the property and the gutter service you need. Gutter Runners can follow up with the next step.</p>
          <div className="contactDetails">
            <a href="tel:2605572569">260 557 2569</a>
            <a href="mailto:zacharyhughes181997@yahoo.com">zacharyhughes181997@yahoo.com</a>
            <span>2204 Fillmore Street, Fort Wayne, IN 46802</span>
          </div>
        </div>

        {sent ? (
          <div className="successCard" role="status">
            <span>REQUEST READY</span>
            <h3>Your request is in the Estimate Desk.</h3>
            <p>Gutter Runners can review the details and follow up.</p>
            <button type="button" onClick={() => setSent(false)}>Start another request</button>
          </div>
        ) : (
          <form className="estimateForm" onSubmit={submitEstimate}>
            <label>NAME<input name="name" required /></label>
            <div className="fieldPair">
              <label>PHONE<input name="phone" inputMode="tel" required /></label>
              <label>EMAIL<input name="email" type="email" required /></label>
            </div>
            <label>PROPERTY ADDRESS<input name="address" required /></label>
            <label>SERVICE
              <select name="service" defaultValue="">
                <option value="" disabled>Choose a service</option>
                <option>Seamless metal gutters</option>
                <option>Gutter installation</option>
                <option>Gutter repair</option>
              </select>
            </label>
            <label>WHAT IS HAPPENING?<textarea name="notes" rows={4} /></label>
            <label className="fileField">OPTIONAL PHOTOS<input name="photos" type="file" accept="image/*" multiple /><span>Add photos from this device</span></label>
            <button className="submitButton" type="submit">Send Estimate Request <span aria-hidden="true">→</span></button>
          </form>
        )}
      </section>

      <footer>
        <Link className="wordmark footerMark" href="#top"><span>GUTTER</span> RUNNERS</Link>
        <p>Gutter installation and repair in Fort Wayne and surrounding areas.</p>
        <Link href="/admin">Estimate Desk</Link>
      </footer>
    </main>
  );
}
