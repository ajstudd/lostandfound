import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SearchIcon, MapPin, Gift, Shield } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Welcome to LostFin
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Reuniting lost items with their rightful owners through our community-driven platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Link href="/post/lost" className="group">
            <Card className="p-6 h-full transition-all hover:shadow-lg group-hover:-translate-y-1">
              <div className="text-center">
                <SearchIcon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h2 className="text-2xl font-semibold mb-4">Lost Something?</h2>
                <p className="text-muted-foreground mb-6">
                  Post details about your lost item and let our community help you find it
                </p>
                <Button size="lg" className="w-full">
                  Report Lost Item
                </Button>
              </div>
            </Card>
          </Link>

          <Link href="/post/found" className="group">
            <Card className="p-6 h-full transition-all hover:shadow-lg group-hover:-translate-y-1">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h2 className="text-2xl font-semibold mb-4">Found Something?</h2>
                <p className="text-muted-foreground mb-6">
                  Help someone reunite with their lost possession by posting what you&apos;ve found
                </p>
                <Button size="lg" className="w-full">
                  Report Found Item
                </Button>
              </div>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6">
            <Gift className="w-8 h-8 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Optional Rewards</h3>
            <p className="text-muted-foreground">
              Set a reward for your lost item to increase the chances of recovery
            </p>
          </Card>

          <Card className="p-6">
            <Shield className="w-8 h-8 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Secure Process</h3>
            <p className="text-muted-foreground">
              Safe and secure verification process to ensure legitimate claims
            </p>
          </Card>

          <Card className="p-6 lg:col-span-1 md:col-span-2">
            <SearchIcon className="w-8 h-8 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
            <p className="text-muted-foreground">
              Quickly search through posted items to find what you&apos;re looking for
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}