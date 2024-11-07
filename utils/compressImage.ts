// utils/compressImage.ts
export const compressImage = async (file: File, maxFileSizeKB = 50): Promise<File> => {
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

                  // Function to attempt compression with a decreasing quality value
                  const attemptCompression = (quality: number) => {
                      canvas.toBlob(
                          async (blob) => {
                              if (blob) {
                                  if (blob.size / 1024 <= maxFileSizeKB) {
                                      resolve(new File([blob], file.name, { type: file.type }));
                                  } else if (quality > 0.1) {
                                      // Reduce quality and try again
                                      attemptCompression(quality - 0.1);
                                  } else {
                                      // If compression cannot meet the target, return the best result
                                      resolve(new File([blob], file.name, { type: file.type }));
                                  }
                              } else {
                                  reject(new Error("Compression failed"));
                              }
                          },
                          file.type,
                          quality
                      );
                  };

                  // Start compression with initial quality
                  attemptCompression(0.7); // Start with quality 0.7
              }
          };
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
  });
};
