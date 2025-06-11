
// Cloudinary configuration

export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,

  get uploadUrl() {
    return `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
  }
};

// Instructions for setting up Cloudinary:
// 1. Sign up at https://cloudinary.com/
// 2. Get your cloud name from the dashboard
// 3. Create an upload preset in Settings > Upload > Upload presets
// 4. Set the upload preset to "unsigned" for client-side uploads
// 5. Update the values above with your actual cloud name and upload preset
