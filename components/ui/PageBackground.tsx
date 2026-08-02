"use client";

export function PageBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: "#0d1117" }}>
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          right: "10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #7c3aed18 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%",
          left: "5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #06b6d412 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "40%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "1px",
          background: "linear-gradient(90deg, transparent, #7c3aed15, #06b6d415, transparent)",
        }}
      />
    </div>
  );
}
