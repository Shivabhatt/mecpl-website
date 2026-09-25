import "./_group.css";

const stats = [
  { val: "50+", label: "YEARS OF LEGACY" },
  { val: "30+", label: "COMPLETED PROJECTS" },
  { val: "MAHARASHTRA", label: "REGIONAL PRESENCE" },
];

export function Current() {
  return (
    <main className="current-preview">
      <header className="current-sectors-heading">
        <span>TODAY, WE BUILD ACROSS</span>
        <h2>Diverse Spaces. A Stronger India.</h2>
      </header>

      <section className="current-stats-grid" aria-label="MECPL at a glance">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`current-stat-item${index === 1 ? " is-featured" : ""}`}
          >
            <div className="current-stat-value">{stat.val}</div>
            <div className="current-stat-label">{stat.label}</div>
          </div>
        ))}
      </section>

      <section className="current-continuation">
        <span>THE JOURNEY CONTINUES</span>
        <h2>
          SAME PURPOSE.
          <br />
          GREATER POSSIBILITIES.
        </h2>
        <p>
          From the foundations we laid in 1975 to what we build next, the
          purpose remains the same: to build better, safer and stronger.
        </p>
      </section>

      <style>{`
        .current-preview {
          min-height: 100vh;
          background: #ffffff;
          color: #232529;
          font-family: "Montserrat", sans-serif;
        }
        .current-sectors-heading {
          padding: 32px 20px 26px;
          text-align: center;
        }
        .current-sectors-heading > span,
        .current-continuation > span {
          display: block;
          color: #ec3338;
          font-weight: 600;
          text-transform: uppercase;
        }
        .current-sectors-heading > span {
          margin-bottom: 4px;
          font-size: 7px;
          letter-spacing: 0.19em;
          line-height: 1.4;
        }
        .current-sectors-heading h2 {
          margin: 0;
          font-size: clamp(22px, 2.7vw, 31px);
          font-weight: 400;
          letter-spacing: -0.025em;
          line-height: 1.15;
          text-transform: uppercase;
        }
        .current-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        .current-stat-item {
          display: flex;
          min-width: 0;
          min-height: 94px;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 18px clamp(22px, 7vw, 72px);
          border-right: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          background: #232529;
          text-align: left;
        }
        .current-stat-item.is-featured {
          background: #ec3338;
        }
        .current-stat-item:last-child {
          border-right: 0;
        }
        .current-stat-value {
          margin-bottom: 7px;
          color: #ffffff;
          font-size: clamp(22px, 3vw, 31px);
          font-weight: 400;
          letter-spacing: 0.005em;
          line-height: 1;
        }
        .current-stat-item:last-child .current-stat-value {
          font-size: clamp(15px, 2.5vw, 29px);
          letter-spacing: 0.01em;
        }
        .current-stat-label {
          color: rgba(255, 255, 255, 0.48);
          font-size: 5px;
          font-weight: 500;
          letter-spacing: 0.11em;
          line-height: 1.3;
          text-transform: uppercase;
        }
        .current-continuation {
          box-sizing: border-box;
          min-height: 420px;
          padding: 96px 40px 120px;
          text-align: center;
        }
        .current-continuation > span {
          margin-bottom: 24px;
          font-size: 15px;
          letter-spacing: 0.3em;
        }
        .current-continuation h2 {
          margin: 0 0 24px;
          color: #232529;
          font-size: 36px;
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .current-continuation p {
          max-width: 600px;
          margin: 0 auto;
          color: #5f6368;
          font-family: Inter, sans-serif;
          font-size: 1.05rem;
          line-height: 1.7;
        }
        @media (max-width: 768px) {
          .current-sectors-heading {
            padding: 28px 14px 20px;
          }
          .current-stats-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          .current-stat-item {
            min-height: 86px;
            padding: 14px clamp(11px, 4.5vw, 22px);
          }
          .current-stat-value {
            font-size: clamp(17px, 5.5vw, 25px);
          }
          .current-stat-item:last-child .current-stat-value {
            font-size: clamp(8px, 2.6vw, 12px);
            letter-spacing: 0;
            white-space: nowrap;
          }
          .current-stat-label {
            font-size: 4.5px;
            letter-spacing: 0.07em;
          }
          .current-continuation {
            min-height: auto;
            padding: 32px 20px 40px;
          }
          .current-continuation h2 {
            font-size: clamp(24px, 7vw, 36px);
          }
          .current-continuation p {
            font-size: 0.94rem;
          }
        }
      `}</style>
    </main>
  );
}