"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const formSchema = z.object({
  itemName: z.string().min(2, { message: "Item name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  foundLocation: z.string().min(5, { message: "Location must be at least 5 characters." }),
  requirements: z.string().min(10, { message: "Requirements must be at least 10 characters." }),
  finderName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  finderEmail: z.string().email({ message: "Please enter a valid email address." }),
  finderPhone: z.string().min(10, { message: "Please enter a valid phone number." }),
  image: z.any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), ".jpg, .jpeg, .png and .webp files are accepted."),
});

export default function FoundItemForm() {
  const { toast } = useToast();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      description: "",
      foundLocation: "",
      requirements: "",
      finderName: "",
      finderEmail: "",
      finderPhone: "",
    },
  });

  // Function to compress the image
  const compressImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        // Using the native Image constructor
        const img = new window.Image() as HTMLImageElement; // Explicitly using window.Image constructor
        img.src = event.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;

          const scaleFactor = Math.min(1, 800 / Math.max(img.width, img.height));
          canvas.width = img.width * scaleFactor;
          canvas.height = img.height * scaleFactor;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(
            (blob) => {
              if (blob) resolve(blob);
              else reject(new Error('Canvas to Blob conversion failed'));
            },
            file.type,
            0.7
          );
        };
      };

      reader.onerror = (error) => reject(error);
    });
  };



  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const compressedImage = await compressImage(values.image[0]);

      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key !== 'image') {
          formData.append(key, value);
        }
      });

      formData.append('image', compressedImage, values.image[0].name);

      const response = await axios.post('/api/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        toast({
          title: "Found Item Report Submitted",
          description: "Thank you for helping return this item to its owner.",
        });
      } else {
        throw new Error('Failed to submit the form');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit the form. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center mb-6 text-primary hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Report Found Item</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="itemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Blue Wallet" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Provide detailed description of the item..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="foundLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Found Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Central Park, New York" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements for Return</FormLabel>
                  <FormControl>
                    <Textarea placeholder="What does the owner need to do to claim this item?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Item Image</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            onChange(e.target.files);
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setPreviewImage(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        {...rest}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                  {previewImage && (
                    <div className="mt-4">
                      <Image src={previewImage} alt="Preview" width={200} height={200} className="rounded-md object-cover" />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-8">
              <h2 className="text-xl font-semibold">Finder&apos;s Information</h2>

              <FormField
                control={form.control}
                name="finderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="finderEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="finderPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-center">
              <Button type="submit">Submit Report</Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
