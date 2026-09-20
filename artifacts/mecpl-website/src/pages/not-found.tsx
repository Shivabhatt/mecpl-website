import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div data-animate-page className="min-h-screen w-full flex items-center justify-center bg-white">
      <Card className="w-full max-w-md mx-4 border border-mecpl-dark/[0.07]">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-mecpl-red" />
            <h3 className="page-title-font text-2xl text-mecpl-text">404 Page Not Found</h3>
          </div>

          <p className="page-subtitle-font mt-4 text-sm text-mecpl-text">
            The page you requested could not be found.
          </p>
          <Link href="/">
            <span className="inline-block mt-6 bg-mecpl-red hover:bg-mecpl-dark text-white px-6 py-3 text-xs font-semibold tracking-widest uppercase rounded-sm transition-colors cursor-pointer">
              Back to Home
            </span>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
