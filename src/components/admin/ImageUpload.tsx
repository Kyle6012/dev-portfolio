
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CLOUDINARY_CONFIG } from '@/config/cloudinary';

interface ImageUploadProps {
  onImageUpload: (imageData: { url: string; publicId: string }) => void;
  onImageRemove: () => void;
  currentImage?: string;
  isLoading?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  onImageRemove,
  currentImage,
  isLoading = false
}) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please select an image file',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'Image size must be less than 5MB',
        variant: 'destructive',
      });
      return;
    }

   if (
    !CLOUDINARY_CONFIG.cloudName ||
    !CLOUDINARY_CONFIG.uploadPreset ||
    CLOUDINARY_CONFIG.cloudName === 'your_cloudinary_cloud_name' || 
    CLOUDINARY_CONFIG.uploadPreset === 'your_upload_preset'
    ) {
    toast({
        title: 'Configuration Required',
        description: `Please configure your Cloudinary settings in src/config/cloudinary.ts: ${CLOUDINARY_CONFIG.uploadPreset}`,
        variant: 'destructive',
    });
    return;
    }


    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

      const response = await fetch(CLOUDINARY_CONFIG.uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      onImageUpload({
        url: data.secure_url,
        publicId: data.public_id,
      });

      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload image. Please check your Cloudinary configuration.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  }, [onImageUpload, toast]);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileUpload(files[0]);
      }
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFileUpload(files[0]);
      }
    },
    [handleFileUpload]
  );

  return (
    <div className="space-y-4">
      {currentImage ? (
        <Card className="relative p-4">
          <img
            src={currentImage}
            alt="Uploaded"
            className="w-full h-48 object-cover rounded-md"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-6 right-6"
            onClick={onImageRemove}
            disabled={isLoading}
          >
            <X className="w-4 h-4" />
          </Button>
        </Card>
      ) : (
        <Card
          className="border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-muted rounded-full">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  Drag and drop an image here, or click to select
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="image-upload"
                disabled={uploading || isLoading}
              />
              <Button
                type="button"
                variant="outline"
                asChild
                disabled={uploading || isLoading}
              >
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? 'Uploading...' : 'Select Image'}
                </label>
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
