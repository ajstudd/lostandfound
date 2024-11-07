//NOTE: This is not in use for now
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { compressImage } from "@/utils/compressImage";

const ImageUpload = ({ onImageSelect }: any) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const compressedFile = await compressImage(file);
            setPreviewImage(URL.createObjectURL(compressedFile));
            onImageSelect(compressedFile); // Pass compressed image back to parent
        }
    };

    return (
        <div>
            <Input
                id="file-upload"
                type="file"
                accept="image/jpeg, image/png, image/webp"
                onChange={handleImageChange}
            />
            <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => document.getElementById("file-upload")?.click()}
            >
                <Upload className="h-4 w-4" />
            </Button>
            {previewImage && (
                <div className="mt-4">
                    <Image src={previewImage} alt="Item Preview" width={100} height={100} className="object-cover" />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
