import "./_group.css";

const stats = [
  { val: "50+", label: "YEARS OF LEGACY" },
  { val: "30+", label: "COMPLETED PROJECTS" },
  { val: "MAHARASHTRA", label: "REGIONAL PRESENCE" },
];

export function AppliedStats() {
  return (
    <main className="applied-stats-preview">
      <header className="applied-sectors-heading">
        <span>TODAY, WE BUILD ACROSS</span>
        <h2>Diverse Spaces. A Stronger India.</h2>
      </header>

      <section className="applied-stats-grid" aria-label="MECPL at a glance">
        {stats.map((stat) => (
          <div className="applied-stat-item" key={stat.label}>
            <div className="applied-stat-value">{stat.val}</div>
            <div className="applied-stat-label">{stat.label}</div>
          </div>
        ))}
      </section>

      <section className="applied-continuation">
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
        <div className="applied-actions" aria-label="About page actions">
          <span className="applied-primary-action">CONTACT MECPL <b>→</b></span>
          <span className="applied-secondary-action">VIEW PROJECTS <b>→</b></span>
        </div>
      </section>

      <style>{`
        .applied-stats-preview {
          min-height: 100vh;
          background: #ffffff;
          color: #232529;
          font-family: "Montserrat", sans-serif;
        }
        .applied-sectors-heading {
          padding: 32px 20px 26px;
          text-align: center;
        }
        .applied-sectors-heading > span,
        .applied-continuation > span {
          display: block;
          color: #ec3338;
          font-weight: 600;
          text-transform: uppercase;
        }
        .applied-sectors-heading > span {
          margin-bottom: 4px;
          font-size: 7px;
          letter-spacing: 0.19em;
          line-height: 1.4;
        }
        .applied-sectors-heading h2 {
          margin: 0;
          font-size: clamp(22px, 2.7vw, 31px);
          font-weight: 400;
          letter-spacing: -0.025em;
          line-height: 1.15;
          text-transform: uppercase;
        }
        .applied-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          border-top: 1px solid #d9d9d6;
          border-bottom: 1px solid #d9d9d6;
        }
        .applied-stat-item {
          display: flex;
          min-width: 0;
          min-height: 138px;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 24px clamp(18px, 4vw, 48px);
          border-right: 1px solid #d9d9d6;
          color: #232529;
          background: transparent;
          text-align: left;
        }
        .applied-stat-item:last-child {
          border-right: 0;
        }
        .applied-stat-value {
          margin-bottom: 10px;
          color: #232529;
          font-size: clamp(34px, 4vw, 52px);
          font-weight: 500;
          letter-spacing: -0.06em;
          line-height: 1;
        }
        .applied-stat-item:last-child .applied-stat-value {
          font-size: clamp(18px, 2.2vw, 28px);
          font-weight: 600;
          letter-spacing: -0.035em;
        }
        .applied-stat-label {
          color: #56585b;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.105em;
          line-height: 1.45;
          text-transform: uppercase;
        }
        .applied-continuation {
          box-sizing: border-box;
          display: flex;
          width: 100%;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 420px;
          padding: 96px 40px 120px;
          color: #ffffff;
          background: #232529;
          text-align: center;
        }
        .applied-continuation > span {
          margin-bottom: 24px;
          color: #ec3338;
          font-size: 15px;
          letter-spacing: 0.3em;
        }
        .applied-continuation h2 {
          margin: 0 0 24px;
          color: #ffffff;
          font-size: 36px;
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .applied-continuation p {
          max-width: 600px;
          margin: 0 auto 48px;
          color: #d1d3d5;
          font-family: Inter, sans-serif;
          font-size: 1.05rem;
          line-height: 1.7;
        }
        .applied-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .applied-actions span {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 24px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }
        .applied-primary-action {
          border: 1.5px solid #ec3338;
          color: #ffffff;
          background: #ec3338;
        }
        .applied-secondary-action {
          border: 1.5px solid #ffffff;
          color: #ffffff;
          background: transparent;
        }
        .applied-actions b {
          font-size: 13px;
          font-weight: 400;
        }
        @media (max-width: 768px) {
          .applied-sectors-heading {
            padding: 28px 14px 20px;
          }
          .applied-stats-grid {
            grid-template-columns: 1fr;
          }
          .applied-stat-item {
            min-height: 78px;
            flex-direction: row;
            align-items: baseline;
            justify-content: space-between;
            gap: 16px;
            padding: 16px 20px;
            border-right: 0;
            border-bottom: 1px solid #d9d9d6;
          }
          .applied-stat-item:last-child {
            border-bottom: 0;
          }
          .applied-stat-value {
            flex: 0 0 auto;
            margin: 0;
            font-size: clamp(36px, 9vw, 46px);
          }
          .applied-stat-item:last-child .applied-stat-value {
            font-size: clamp(19px, 5.5vw, 25px);
            letter-spacing: -0.04em;
            white-space: nowrap;
          }
          .applied-stat-label {
            max-width: 48%;
            font-size: 10px;
            letter-spacing: 0.08em;
            text-align: right;
          }
          .applied-continuation {
            min-height: auto;
            padding: 32px 20px 40px;
          }
          .applied-continuation h2 {
            font-size: clamp(24px, 7vw, 36px);
          }
          .applied-continuation p {
            font-size: 0.94rem;
          }
        }
        @media (max-width: 370px) {
          .applied-stat-item {
            align-items: flex-start;
            flex-direction: column;
            gap: 8px;
          }
          .applied-stat-label {
            max-width: none;
            text-align: left;
          }
        }
      `}</style>
    </main>
  );
}