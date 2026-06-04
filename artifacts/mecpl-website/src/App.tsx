import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/ThemeContext";
import { ModalProvider } from "@/context/ModalContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation } from "wouter";
import EnquiryModal from "@/components/EnquiryModal";
import HomePage from "@/pages/HomePage";
import useGsapPageAnimations from "./hooks/useGsapPageAnimations";
import useLenis from "./hooks/useLenis";
import Preloader from "@/components/Preloader";
import AboutPage from "@/pages/AboutPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ServicesPage from "@/pages/ServicesPage";
import CompletedProjectsPage from "@/pages/CompletedProjectsPage";
import OngoingProjectsPage from "@/pages/OngoingProjectsPage";
import ClientsPage from "@/pages/ClientsPage";
import EquipmentPage from "@/pages/EquipmentPage";
import AwardsPage from "@/pages/AwardsPage";
import InvestorsPage from "@/pages/InvestorsPage";
import CareersPage from "@/pages/CareersPage";
import ContactPage from "@/pages/ContactPage";
import BlogPage from "@/pages/BlogPage";
import BlogArticlePage from "@/pages/BlogArticlePage";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

const queryClient = new QueryClient();


function Router() {
  const containerRef = useGsapPageAnimations();
  const [location] = useLocation();

  useEffect(() => {
    window.dispatchEvent(new Event("mecpl:scroll-top"));
  }, [location]);

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/projects" component={ProjectsPage} />
          <Route path="/services" component={ServicesPage} />
          <Route path="/completed-projects" component={CompletedProjectsPage} />
          <Route path="/ongoing-projects" component={OngoingProjectsPage} />
          <Route path="/clients" component={ClientsPage} />
          <Route path="/equipment" component={EquipmentPage} />
          <Route path="/awards" component={AwardsPage} />
          <Route path="/blog/:slug" component={BlogArticlePage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/investors" component={InvestorsPage} />
          <Route path="/careers" component={CareersPage} />
          <Route path="/contact" component={ContactPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      {location !== "/" && <Footer />}
      <EnquiryModal />
    </div>
  );
}

function App() {
  useLenis();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <ModalProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Preloader />
            <Toaster />
          </ModalProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
