"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Stage = "New" | "Needs Details" | "Quoted" | "Follow Up";

type Inquiry = {
  id: number;
  name: string;
  service: string;
  address: string;
  contact: string;
  stage: Stage;
};

const starter: Inquiry[] = [
  { id: 1, name: "Sample homeowner", service: "Seamless metal gutters", address: "Fort Wayne property", contact: "Phone provided", stage: "New" },
  { id: 2, name: "Sample repair lead", service: "Gutter repair", address: "Nearby property", contact: "Email provided", stage: "Needs Details" },
  { id: 3, name: "Sample installation lead", service: "Gutter installation", address: "Fort Wayne property", contact: "Phone and email provided", stage: "Quoted" },
];

const stages: Stage[] = ["New", "Needs Details", "Quoted", "Follow Up"];

export default function AdminPage() {
  const [inquiries, setInquiries] = useState(starter);
  const [filter, setFilter] = useState<Stage | "All">("All");
  const [files, setFiles] = useState<string[]>([]);
  const visible = useMemo(() => filter === "All" ? inquiries : inquiries.filter((item) => item.stage === filter), [filter, inquiries]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("gutterRunnersRequests") || "[]") as Inquiry[];
    // The Estimate Desk hydrates local demo requests after the static page mounts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved.length) setInquiries([...saved, ...starter]);
  }, []);

  function move(id: number, stage: Stage) {
    setInquiries((current) => current.map((item) => item.id === id ? { ...item, stage } : item));
  }

  return (
    <main className="adminShell">
      <div className="demoBar">
        <span>Sweet Dreams demo</span>
        <Link href="/">View public site</Link>
      </div>
      <header className="adminHeader">
        <div><p>GUTTER RUNNERS</p><h1>ESTIMATE DESK</h1></div>
        <Link href="/">← Back to site</Link>
      </header>

      <section className="adminOverview">
        <div><span>OPEN REQUESTS</span><strong>{inquiries.filter((item) => item.stage !== "Quoted").length}</strong></div>
        <div><span>NEW</span><strong>{inquiries.filter((item) => item.stage === "New").length}</strong></div>
        <div><span>QUOTED</span><strong>{inquiries.filter((item) => item.stage === "Quoted").length}</strong></div>
        <div><span>FOLLOW UP</span><strong>{inquiries.filter((item) => item.stage === "Follow Up").length}</strong></div>
      </section>

      <section className="deskPanel">
        <div className="deskToolbar">
          <div><p>LOCAL SAMPLE BOARD</p><h2>Estimate requests</h2></div>
          <label>SHOW
            <select value={filter} onChange={(event) => setFilter(event.target.value as Stage | "All")}>
              <option>All</option>{stages.map((stage) => <option key={stage}>{stage}</option>)}
            </select>
          </label>
        </div>
        <div className="inquiryList">
          {visible.map((inquiry) => (
            <article className="inquiryCard" key={inquiry.id}>
              <div className="requestNumber">{String(inquiry.id).padStart(2, "0").slice(-2)}</div>
              <div className="inquiryMain"><span>{inquiry.service}</span><h3>{inquiry.name}</h3><p>{inquiry.address} · {inquiry.contact}</p></div>
              <label>STAGE
                <select value={inquiry.stage} onChange={(event) => move(inquiry.id, event.target.value as Stage)}>
                  {stages.map((stage) => <option key={stage}>{stage}</option>)}
                </select>
              </label>
            </article>
          ))}
        </div>
      </section>

      <section className="photoIntake">
        <div><p>PROJECT INTAKE</p><h2>Collect work photos</h2><span>Keep incoming photos with the matching estimate request.</span></div>
        <label className="uploadBox">
          <input type="file" accept="image/*" multiple onChange={(event) => setFiles(Array.from(event.target.files || []).map((file) => file.name))} />
          <strong>{files.length ? `${files.length} file${files.length === 1 ? "" : "s"} selected` : "Choose project photos"}</strong>
          <span>{files.length ? files.join(", ") : "Local demo intake"}</span>
        </label>
      </section>
    </main>
  );
}
