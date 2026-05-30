import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div data-animate-page className="min-h-screen w-full flex items-center justify-center bg-mecpl-dark">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-[#C41E3A]" />
            <h3 className="text-2xl font-bold text-white">404 Page Not Found</h3>
          </div>

          <p className="mt-4 text-sm text-gray-400">
            The page you requested could not be found.
          </p>
          <Link href="/">
            <span className="inline-block mt-6 bg-[#C41E3A] hover:bg-red-700 text-white px-6 py-3 text-xs font-black tracking-widest uppercase rounded-sm transition-colors cursor-pointer">
              Back to Home
            </span>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
