import "./_group.css";

const stats = [
  { value: "50+", label: "YEARS OF LEGACY" },
  { value: "30+", label: "COMPLETED PROJECTS" },
  { value: "MAHARASHTRA", label: "REGIONAL PRESENCE" },
];

export function UnifiedCharcoalBand() {
  return (
    <main className="ucb-page">
      <header className="ucb-sectors-heading">
        <span className="ucb-eyebrow">TODAY, WE BUILD ACROSS</span>
        <h1>Diverse Spaces. A Stronger India.</h1>
      </header>

      <section className="ucb-band" aria-label="MECPL at a glance">
        <div className="ucb-band-inner">
          {stats.map((stat, index) => (
            <div className="ucb-stat" key={stat.label}>
              <span className="ucb-stat-index">0{index + 1}</span>
              <div className="ucb-stat-copy">
                <div className={`ucb-value${index === 2 ? " ucb-value-region" : ""}`}>
                  {stat.value}
                </div>
                <div className="ucb-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ucb-continuation">
        <div className="ucb-continuation-inner">
          <div className="ucb-cta-copy">
            <span className="ucb-eyebrow">THE JOURNEY CONTINUES</span>
            <h2>
              SAME PURPOSE.
              <br />
              GREATER POSSIBILITIES.
            </h2>
          </div>
          <p>
            From the foundations we laid in 1975 to what we build next, the
            purpose remains the same: to build better, safer and stronger.
          </p>
        </div>
      </section>

      <style>{`
        .ucb-page {
          min-height: 100dvh;
          color: #232529;
          background: #fff;
          font-family: var(--font-montserrat), sans-serif;
        }

        .ucb-sectors-heading {
          box-sizing: border-box;
          padding: clamp(34px, 5.4vw, 66px) 24px clamp(30px, 4.2vw, 52px);
          text-align: center;
        }

        .ucb-eyebrow {
          display: block;
          color: #ec3338;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .ucb-sectors-heading .ucb-eyebrow {
          margin-bottom: 12px;
        }

        .ucb-sectors-heading h1 {
          margin: 0;
          font-size: clamp(25px, 3.1vw, 38px);
          font-weight: 400;
          letter-spacing: -0.045em;
          line-height: 1.15;
          text-transform: uppercase;
        }

        .ucb-band {
          position: relative;
          color: #fff;
          background: #232529;
        }

        .ucb-band::before {
          position: absolute;
          top: 0;
          left: 50%;
          width: min(92%, 1160px);
          height: 3px;
          background: #ec3338;
          content: "";
          transform: translateX(-50%);
        }

        .ucb-band-inner {
          box-sizing: border-box;
          display: grid;
          width: min(100%, 1240px);
          min-height: 174px;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          margin: 0 auto;
          padding: 30px 34px;
        }

        .ucb-stat {
          position: relative;
          display: flex;
          min-width: 0;
          align-items: center;
          gap: clamp(14px, 2.6vw, 34px);
          padding: 8px clamp(16px, 3.2vw, 46px);
        }

        .ucb-stat + .ucb-stat {
          border-left: 1px solid rgba(255, 255, 255, 0.18);
        }

        .ucb-stat-index {
          align-self: flex-start;
          padding-top: 5px;
          color: #ec3338;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          line-height: 1;
        }

        .ucb-stat-copy {
          min-width: 0;
        }

        .ucb-value {
          margin-bottom: 11px;
          color: #f8f7f3;
          font-size: clamp(32px, 4.2vw, 54px);
          font-weight: 500;
          letter-spacing: -0.055em;
          line-height: 0.98;
          white-space: nowrap;
        }

        .ucb-value-region {
          font-size: clamp(19px, 2.6vw, 31px);
          letter-spacing: -0.025em;
        }

        .ucb-label {
          color: rgba(255, 255, 255, 0.76);
          font-size: clamp(11px, 1vw, 13px);
          font-weight: 600;
          letter-spacing: 0.14em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .ucb-continuation {
          box-sizing: border-box;
          min-height: 330px;
          border-top: 1px solid #e8e6e2;
          background: #fff;
        }

        .ucb-continuation-inner {
          box-sizing: border-box;
          display: flex;
          width: min(100%, 1050px);
          min-height: 330px;
          align-items: center;
          justify-content: space-between;
          gap: 56px;
          margin: 0 auto;
          padding: 72px 32px 82px;
        }

        .ucb-cta-copy {
          flex: 0 1 auto;
        }

        .ucb-cta-copy .ucb-eyebrow {
          margin-bottom: 22px;
        }

        .ucb-continuation h2 {
          margin: 0;
          color: #232529;
          font-size: clamp(28px, 3.5vw, 43px);
          font-weight: 600;
          letter-spacing: -0.045em;
          line-height: 1.12;
        }

        .ucb-continuation p {
          max-width: 390px;
          margin: 36px 0 0;
          color: #686a6d;
          font-size: 15px;
          font-weight: 400;
          line-height: 1.8;
        }

        @media (max-width: 760px) {
          .ucb-sectors-heading {
            padding: 34px 18px 28px;
          }

          .ucb-sectors-heading .ucb-eyebrow {
            margin-bottom: 9px;
            font-size: 10px;
          }

          .ucb-sectors-heading h1 {
            font-size: clamp(23px, 6.1vw, 32px);
          }

          .ucb-band::before {
            width: calc(100% - 36px);
          }

          .ucb-band-inner {
            min-height: auto;
            grid-template-columns: 1fr;
            padding: 12px 22px;
          }

          .ucb-stat {
            min-height: 102px;
            gap: 20px;
            padding: 20px 4px;
          }

          .ucb-stat + .ucb-stat {
            border-top: 1px solid rgba(255, 255, 255, 0.18);
            border-left: 0;
          }

          .ucb-stat-index {
            width: 24px;
            padding-top: 7px;
            font-size: 10px;
          }

          .ucb-value {
            margin-bottom: 8px;
            font-size: 38px;
          }

          .ucb-value-region {
            font-size: clamp(23px, 7vw, 31px);
          }

          .ucb-label {
            font-size: 12px;
            letter-spacing: 0.13em;
          }

          .ucb-continuation,
          .ucb-continuation-inner {
            min-height: 0;
          }

          .ucb-continuation-inner {
            display: block;
            padding: 44px 24px 54px;
          }

          .ucb-cta-copy .ucb-eyebrow {
            margin-bottom: 17px;
            font-size: 10px;
          }

          .ucb-continuation h2 {
            font-size: clamp(27px, 7.4vw, 36px);
          }

          .ucb-continuation p {
            max-width: 500px;
            margin-top: 24px;
            font-size: 14px;
          }
        }

        @media (prefers-reduced-motion: no-preference) {
          .ucb-sectors-heading,
          .ucb-stat,
          .ucb-continuation-inner {
            animation: ucb-rise 650ms both;
          }

          .ucb-stat:nth-child(2) {
            animation-delay: 70ms;
          }

          .ucb-stat:nth-child(3) {
            animation-delay: 140ms;
          }

          .ucb-continuation-inner {
            animation-delay: 160ms;
          }
        }

        @keyframes ucb-rise {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}