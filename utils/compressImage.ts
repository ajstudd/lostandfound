// utils/compressImage.ts
export const compressImage = async (file: File): Promise<File> => {
    const img = document.createElement("img");
    const reader = new FileReader();
  
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  resolve(new File([blob], file.name, { type: file.type }));
                } else {
                  reject(new Error("Compression failed"));
                }
              },
              file.type,
              0.7 // Adjust the compression quality here (0 to 1)
            );
          }
        };
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  