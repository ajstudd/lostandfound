"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SearchIcon, MapPin, Calendar } from "lucide-react";
import Link from "next/link";

// Define the structure of the item
export interface Item {
  _id: string;
  type: "lost" | "found";
  itemName: string;
  description: string;
  location: string;
  createdAt: string;
  reward?: string;
  imageUrl: string;
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
}

export default function ItemsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]); // Store fetched items
  console.log('items', items);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch("api/getlostitems", {
          method: "GET",
        });
        const data = await response.json();
        console.log("Received data:", data); // Add this for debugging
        setItems(data.documents);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }
    fetchItems();
  }, []);

  const filteredItems = items.filter(
    (item) =>
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openDetails = (id: string) => {
    router.push(`/item?id=${id}`);
  };

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
          <Card key={item._id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm ${item.type === "lost"
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
                  }`}
              >
                {item.type === "lost" ? "Lost" : "Found"}
              </span>
              <span className="text-sm text-muted-foreground">
                <Calendar className="inline-block w-4 h-4 mr-1" />
                {item.createdAt}
              </span>
            </div>

            <h3 className="text-xl font-semibold mb-2">{item.itemName}</h3>
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

            <Button
              className="w-full mt-4"
              onClick={() => {
                openDetails(item._id); // Using _id for routing
              }}
            >
              View Details
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
