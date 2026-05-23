import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import CompletedProjectsPage from "@/pages/CompletedProjectsPage";
import OngoingProjectsPage from "@/pages/OngoingProjectsPage";
import ClientsPage from "@/pages/ClientsPage";
import EquipmentPage from "@/pages/EquipmentPage";
import AwardsPage from "@/pages/AwardsPage";
import InvestorsPage from "@/pages/InvestorsPage";
import CareersPage from "@/pages/CareersPage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/completed-projects" component={CompletedProjectsPage} />
          <Route path="/ongoing-projects" component={OngoingProjectsPage} />
          <Route path="/clients" component={ClientsPage} />
          <Route path="/equipment" component={EquipmentPage} />
          <Route path="/awards" component={AwardsPage} />
          <Route path="/investors" component={InvestorsPage} />
          <Route path="/careers" component={CareersPage} />
          <Route path="/contact" component={ContactPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
