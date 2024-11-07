export interface Item {
    _id: string;
    type: "lost" | "found";
    itemName: string;
    description: string;
    location: string;
    createdAt: string;
    reward?: string;
    returnRequirement?: string;
    imageUrl: string;
    contactName: string;
    contactPhone: string;
    contactEmail?: string;
    comments?: String[];
  }