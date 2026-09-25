import "./_group.css";

const proofPoints = [
  { value: "50+", label: "YEARS OF LEGACY" },
  { value: "30+", label: "COMPLETED PROJECTS" },
  { value: "MAHARASHTRA", label: "REGIONAL PRESENCE" },
];

export function OpenEditorial() {
  return (
    <main className="open-editorial">
      <section className="oe-story" aria-label="MECPL proof points">
        <header className="oe-heading">
          <span className="oe-kicker">TODAY, WE BUILD ACROSS</span>
          <h1>Diverse Spaces. A Stronger India.</h1>
        </header>

        <div className="oe-proof">
          <div className="oe-proof-intro">
            <span className="oe-intro-mark" aria-hidden="true" />
            <p>Built on experience.<br />Grounded in place.</p>
          </div>
          <div className="oe-stats">
            {proofPoints.map((point, index) => (
              <div className="oe-stat" key={point.label}>
                <span className="oe-index">0{index + 1}</span>
                <div className="oe-stat-copy">
                  <div className={`oe-value${index === 2 ? " oe-value-region" : ""}`}>
                    {point.value}
                  </div>
                  <div className="oe-label">{point.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="oe-continuation" aria-label="The journey continues">
        <span className="oe-kicker">THE JOURNEY CONTINUES</span>
        <h2>
          SAME PURPOSE.
          <br />
          <span>GREATER POSSIBILITIES.</span>
        </h2>
        <p>
          From the foundations we laid in 1975 to what we build next, the
          purpose remains the same: to build better, safer and stronger.
        </p>
      </section>

      <style>{`
        .open-editorial {
          --oe-ink: #232529;
          --oe-muted: #67696c;
          --oe-red: #ec3338;
          --oe-rule: #d9d9d6;
          min-height: 100vh;
          color: var(--oe-ink);
          background: #fbfaf8;
          font-family: var(--font-montserrat), Montserrat, sans-serif;
        }
        .oe-story {
          padding: clamp(46px, 7.6vw, 92px) clamp(24px, 8vw, 124px) 0;
        }
        .oe-heading {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 0 clamp(32px, 5vw, 58px);
          text-align: center;
        }
        .oe-kicker {
          display: block;
          color: var(--oe-red);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.19em;
          line-height: 1.5;
          text-transform: uppercase;
        }
        .oe-heading h1 {
          margin: 10px 0 0;
          font-size: clamp(25px, 3.25vw, 42px);
          font-weight: 500;
          letter-spacing: -0.045em;
          line-height: 1.12;
          text-transform: uppercase;
        }
        .oe-proof {
          display: grid;
          grid-template-columns: minmax(170px, 0.78fr) minmax(0, 3fr);
          max-width: 1160px;
          margin: 0 auto;
          border-top: 1px solid var(--oe-rule);
          border-bottom: 1px solid var(--oe-rule);
        }
        .oe-proof-intro {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          padding: 32px 24px 34px 0;
        }
        .oe-intro-mark {
          width: 22px;
          height: 3px;
          margin-top: 8px;
          flex: 0 0 auto;
          background: var(--oe-red);
        }
        .oe-proof-intro p {
          margin: 0;
          color: var(--oe-muted);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.015em;
          line-height: 1.65;
        }
        .oe-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        .oe-stat {
          display: flex;
          min-width: 0;
          align-items: flex-start;
          gap: clamp(12px, 2vw, 27px);
          padding: 29px clamp(18px, 3.1vw, 44px) 31px;
          border-left: 1px solid var(--oe-rule);
        }
        .oe-index {
          padding-top: 5px;
          color: #a4a4a0;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.06em;
        }
        .oe-stat-copy {
          min-width: 0;
        }
        .oe-value {
          margin: 0 0 10px;
          color: var(--oe-ink);
          font-size: clamp(31px, 4.2vw, 55px);
          font-weight: 500;
          letter-spacing: -0.065em;
          line-height: 1;
          white-space: nowrap;
        }
        .oe-value-region {
          padding-top: 9px;
          font-size: clamp(17px, 2vw, 25px);
          font-weight: 600;
          letter-spacing: -0.035em;
        }
        .oe-label {
          color: #56585b;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.105em;
          line-height: 1.45;
        }
        .oe-continuation {
          max-width: 900px;
          margin: 0 auto;
          padding: clamp(66px, 9vw, 112px) 24px 100px;
          text-align: center;
        }
        .oe-continuation .oe-kicker {
          margin-bottom: 24px;
          letter-spacing: 0.22em;
        }
        .oe-continuation h2 {
          margin: 0 0 23px;
          font-size: clamp(31px, 5vw, 58px);
          font-weight: 600;
          letter-spacing: -0.055em;
          line-height: 1.08;
        }
        .oe-continuation h2 span {
          color: #77797b;
          font-weight: 400;
        }
        .oe-continuation p {
          max-width: 610px;
          margin: 0 auto;
          color: #626467;
          font-size: 15px;
          font-weight: 400;
          line-height: 1.8;
        }
        @media (max-width: 760px) {
          .oe-story {
            padding: 44px 21px 0;
          }
          .oe-heading {
            padding-bottom: 32px;
          }
          .oe-kicker {
            font-size: 10px;
          }
          .oe-heading h1 {
            margin-top: 9px;
            font-size: clamp(23px, 6vw, 34px);
          }
          .oe-proof {
            grid-template-columns: 1fr;
          }
          .oe-proof-intro {
            padding: 18px 0 19px;
            border-bottom: 1px solid var(--oe-rule);
          }
          .oe-proof-intro p br {
            display: none;
          }
          .oe-stats {
            grid-template-columns: 1fr;
          }
          .oe-stat {
            align-items: center;
            gap: 18px;
            padding: 18px 2px;
            border-left: 0;
          }
          .oe-stat + .oe-stat {
            border-top: 1px solid var(--oe-rule);
          }
          .oe-index {
            width: 22px;
            padding-top: 2px;
          }
          .oe-stat-copy {
            display: flex;
            width: 100%;
            align-items: baseline;
            justify-content: space-between;
            gap: 12px;
          }
          .oe-value {
            margin: 0;
            font-size: clamp(34px, 9vw, 46px);
          }
          .oe-value-region {
            padding-top: 0;
            font-size: clamp(19px, 5.5vw, 25px);
            letter-spacing: -0.04em;
          }
          .oe-label {
            max-width: 45%;
            text-align: right;
            font-size: 10px;
            letter-spacing: 0.08em;
          }
          .oe-continuation {
            padding: 61px 24px 76px;
          }
          .oe-continuation .oe-kicker {
            margin-bottom: 19px;
          }
          .oe-continuation h2 {
            margin-bottom: 17px;
            font-size: clamp(30px, 8vw, 42px);
          }
          .oe-continuation p {
            font-size: 14px;
            line-height: 1.75;
          }
        }
        @media (max-width: 370px) {
          .oe-stat-copy {
            align-items: flex-start;
            flex-direction: column;
            gap: 8px;
          }
          .oe-label {
            max-width: none;
            text-align: left;
          }
        }
      `}</style>
    </main>
  );
}