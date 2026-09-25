import "./_group.css";

const stats = [
  { value: "50+", label: "YEARS OF LEGACY" },
  { value: "30+", label: "COMPLETED PROJECTS" },
  { value: "MAHARASHTRA", label: "REGIONAL PRESENCE" },
];

export function SeamlessLightBand() {
  return (
    <main className="slb-page">
      <header className="slb-sectors">
        <span className="slb-eyebrow">Today, we build across</span>
        <h1>Diverse Spaces. A Stronger India.</h1>
      </header>

      <section className="slb-proof" aria-label="MECPL at a glance">
        <div className="slb-proof-inner">
          {stats.map((stat, index) => (
            <article className="slb-stat" key={stat.label}>
              <span className="slb-index">0{index + 1}</span>
              <div className="slb-copy">
                <div className="slb-value">{stat.value}</div>
                <div className="slb-label">{stat.label}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="slb-continuation">
        <span className="slb-eyebrow">The journey continues</span>
        <h2>
          Same purpose.
          <br />
          <em>Greater possibilities.</em>
        </h2>
        <p>
          From the foundations we laid in 1975 to what we build next, the
          purpose remains the same: to build better, safer and stronger.
        </p>
      </section>

      <style>{`
        .slb-page {
          --slb-ink: #232529;
          --slb-muted: #676b70;
          --slb-red: #ec3338;
          min-height: 100vh;
          overflow: hidden;
          background: #fff;
          color: var(--slb-ink);
          font-family: var(--font-montserrat), Montserrat, sans-serif;
        }
        .slb-sectors {
          padding: clamp(36px, 6vw, 74px) 24px clamp(30px, 4vw, 52px);
          text-align: center;
        }
        .slb-eyebrow {
          display: block;
          color: var(--slb-red);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .19em;
          line-height: 1.5;
          text-transform: uppercase;
        }
        .slb-sectors h1 {
          margin: 9px 0 0;
          font-size: clamp(23px, 3.2vw, 38px);
          font-weight: 500;
          letter-spacing: -.045em;
          line-height: 1.16;
          text-transform: uppercase;
        }
        .slb-proof {
          position: relative;
          background: #f5f5f3;
          border-top: 1px solid #e9e9e6;
          border-bottom: 1px solid #e9e9e6;
        }
        .slb-proof-inner {
          display: grid;
          width: min(1120px, 100%);
          grid-template-columns: repeat(3, minmax(0, 1fr));
          margin: 0 auto;
        }
        .slb-stat {
          position: relative;
          display: flex;
          min-width: 0;
          min-height: 156px;
          align-items: center;
          gap: clamp(14px, 2vw, 28px);
          padding: 28px clamp(20px, 4vw, 62px);
        }
        .slb-stat + .slb-stat {
          border-left: 1px solid #d9d9d5;
        }
        .slb-stat::before {
          position: absolute;
          top: 50%;
          left: 0;
          width: 3px;
          height: 34px;
          background: var(--slb-red);
          content: "";
          transform: translateY(-50%);
        }
        .slb-stat:first-child::before {
          display: none;
        }
        .slb-index {
          align-self: flex-start;
          padding-top: 5px;
          color: #a5a6a5;
          font-family: var(--font-montserrat), Montserrat, sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .1em;
        }
        .slb-copy {
          min-width: 0;
        }
        .slb-value {
          color: var(--slb-ink);
          font-size: clamp(26px, 3.7vw, 44px);
          font-weight: 500;
          letter-spacing: -.045em;
          line-height: 1.04;
          white-space: nowrap;
        }
        .slb-stat:last-child .slb-value {
          font-size: clamp(18px, 2.5vw, 28px);
          letter-spacing: -.025em;
        }
        .slb-label {
          margin-top: 11px;
          color: #5e6266;
          font-size: clamp(10px, 1vw, 12px);
          font-weight: 700;
          letter-spacing: .105em;
          line-height: 1.45;
        }
        .slb-continuation {
          position: relative;
          padding: clamp(56px, 8vw, 96px) 24px 112px;
          text-align: center;
        }
        .slb-continuation::before {
          position: absolute;
          top: 0;
          left: 50%;
          width: 52px;
          height: 2px;
          background: var(--slb-red);
          content: "";
          transform: translateX(-50%);
        }
        .slb-continuation .slb-eyebrow {
          margin-bottom: 19px;
        }
        .slb-continuation h2 {
          margin: 0;
          font-size: clamp(30px, 5vw, 52px);
          font-weight: 700;
          letter-spacing: -.055em;
          line-height: 1.08;
          text-transform: uppercase;
        }
        .slb-continuation h2 em {
          color: #777a7d;
          font-style: normal;
          font-weight: 400;
        }
        .slb-continuation p {
          max-width: 610px;
          margin: 22px auto 0;
          color: var(--slb-muted);
          font-size: 15px;
          font-weight: 400;
          line-height: 1.75;
        }
        @media (max-width: 680px) {
          .slb-sectors {
            padding: 34px 18px 28px;
          }
          .slb-eyebrow {
            font-size: 10px;
            letter-spacing: .16em;
          }
          .slb-sectors h1 {
            font-size: clamp(22px, 6vw, 30px);
          }
          .slb-proof-inner {
            grid-template-columns: 1fr;
            width: min(100% - 40px, 460px);
            padding: 6px 0;
          }
          .slb-stat {
            min-height: 98px;
            gap: 19px;
            padding: 17px 8px;
          }
          .slb-stat + .slb-stat {
            border-top: 1px solid #dededb;
            border-left: 0;
          }
          .slb-stat::before,
          .slb-stat:first-child::before {
            display: block;
            left: -1px;
            height: 31px;
          }
          .slb-index {
            width: 20px;
            flex: 0 0 20px;
            padding-top: 4px;
          }
          .slb-value {
            font-size: clamp(29px, 9vw, 38px);
          }
          .slb-stat:last-child .slb-value {
            font-size: clamp(20px, 6.5vw, 27px);
            letter-spacing: -.035em;
          }
          .slb-label {
            margin-top: 7px;
            font-size: 11px;
            letter-spacing: .09em;
          }
          .slb-continuation {
            padding: 54px 22px 72px;
          }
          .slb-continuation .slb-eyebrow {
            margin-bottom: 15px;
          }
          .slb-continuation h2 {
            font-size: clamp(29px, 8vw, 39px);
          }
          .slb-continuation p {
            margin-top: 18px;
            font-size: 14px;
          }
        }
      `}</style>
    </main>
  );
}