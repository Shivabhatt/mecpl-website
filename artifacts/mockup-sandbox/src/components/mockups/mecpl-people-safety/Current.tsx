import "./_group.css";
import PeopleSafetySection from "./_shared/PeopleSafetySection";

export function Current() {
  return (
    <div
      className="home-page-typography"
      style={{ background: "#ffffff", color: "#232529" }}
    >
      <PeopleSafetySection />
    </div>
  );
}