export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const base64Content = reader.result.split(",")[1];
        resolve(base64Content);
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
  if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  }
  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
};
