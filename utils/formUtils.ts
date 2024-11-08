// utils/formSubmit.ts
//NOTE: This is not in use for now
import axios from "axios";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post("/api/upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.status !== 200) throw new Error("Image upload failed");
  return response.data.imageUrl;
};

export const submitFormData = async (data: any, endpoint: string) => {
  try {
    const response = await axios.post(endpoint, data);
    if (response.status !== 200) {
      throw new Error("Failed to submit data");
    }
    return response.data;
  } catch (error) {
    console.error("Form submission error:", error);
    throw error;
  }
};
