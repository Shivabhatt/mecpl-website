import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/ThemeContext";
import { ModalProvider } from "@/context/ModalContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CertificationAwardsCTA from "@/components/CertificationAwardsCTA";
import { useLocation } from "wouter";
import EnquiryModal from "@/components/EnquiryModal";
import Preloader from "@/components/Preloader";
import HomePage from "@/pages/HomePage";
import useGsapPageAnimations from "./hooks/useGsapPageAnimations";
import useLenis from "./hooks/useLenis";
import AboutPage from "@/pages/AboutPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ServicesPage from "@/pages/ServicesPage";
import CompletedProjectsPage from "@/pages/CompletedProjectsPage";
import OngoingProjectsPage from "@/pages/OngoingProjectsPage";
import ClientsPage from "@/pages/ClientsPage";
import EquipmentPage from "@/pages/EquipmentPage";
import AwardsPage from "@/pages/AwardsPage";
import CertificationsPage from "@/pages/CertificationsPage";
import InvestorsPage from "@/pages/InvestorsPage";
import CareersPage from "@/pages/CareersPage";
import ContactPage from "@/pages/ContactPage";
import BlogPage from "@/pages/BlogPage";
import BlogArticlePage from "@/pages/BlogArticlePage";
import NotFound from "@/pages/not-found";
import { useCallback, useEffect, useState } from "react";

const queryClient = new QueryClient();


function Router({ pageReady }: { pageReady: boolean }) {
  const containerRef = useGsapPageAnimations();
  const [location] = useLocation();

  useEffect(() => {
    window.dispatchEvent(new Event("mecpl:scroll-top"));
  }, [location]);

  return (
    <div
      ref={containerRef}
      className={`site-typography flex min-h-screen flex-col${location === "/" ? " home-route" : ""}${location === "/" || location === "/about" ? " mecpl-font-spec" : ""}`}
      inert={!pageReady}
    >
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/"><HomePage isReady={pageReady} /></Route>
          <Route path="/about" component={AboutPage} />
          <Route path="/projects" component={ProjectsPage} />
          <Route path="/services" component={ServicesPage} />
          <Route path="/completed-projects" component={CompletedProjectsPage} />
          <Route path="/ongoing-projects" component={OngoingProjectsPage} />
          <Route path="/clients" component={ClientsPage} />
          <Route path="/equipment" component={EquipmentPage} />
          <Route path="/awards" component={AwardsPage} />
          <Route path="/certifications" component={CertificationsPage} />
          <Route path="/blog/:slug" component={BlogArticlePage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/investors" component={InvestorsPage} />
          <Route path="/careers" component={CareersPage} />
          <Route path="/contact" component={ContactPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      {location === "/certifications" && <CertificationAwardsCTA />}
      <div className="mecpl-font-spec">
        <Footer variant="home" />
      </div>
      <EnquiryModal />
    </div>
  );
}

function App() {
  useLenis();
  const [pageReady, setPageReady] = useState(false);
  const revealWebsite = useCallback(() => setPageReady(true), []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <ModalProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Preloader onReveal={revealWebsite} />
              <Router pageReady={pageReady} />
            </WouterRouter>
            <Toaster />
          </ModalProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
