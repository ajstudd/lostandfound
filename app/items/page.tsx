"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, MapPin, Calendar } from "lucide-react";
import Link from "next/link";

// Mock data for demonstration
const mockItems = [
  {
    id: 1,
    type: "lost",
    name: "Black Leather Wallet",
    description: "Contains ID and credit cards",
    location: "Central Park",
    date: "2024-03-20",
    reward: "$50",
  },
  {
    id: 2,
    type: "found",
    name: "iPhone 13",
    description: "Black color with clear case",
    location: "Times Square Station",
    date: "2024-03-19",
  },
  // Add more mock items as needed
];

export default function ItemsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = mockItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Recent Items</h1>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link href="/post/lost">
            <Button>Report Lost</Button>
          </Link>
          <Link href="/post/found">
            <Button variant="outline">Report Found</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-sm ${
                item.type === "lost"
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}>
                {item.type === "lost" ? "Lost" : "Found"}
              </span>
              <span className="text-sm text-muted-foreground">
                <Calendar className="inline-block w-4 h-4 mr-1" />
                {item.date}
              </span>
            </div>
            
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-muted-foreground mb-4">{item.description}</p>
            
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <MapPin className="w-4 h-4 mr-1" />
              {item.location}
            </div>
            
            {item.reward && (
              <div className="text-sm font-medium text-green-600">
                Reward: {item.reward}
              </div>
            )}
            
            <Button className="w-full mt-4">
              View Details
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}