import React, { useRef, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { uploadFile } from '../../../services/storageService';

interface FileUploadFieldProps {
  label: string;
  accept: string;
  onFileUploaded: (url: string) => void;
  currentUrl?: string;
}

export default function FileUploadField({
  label,
  accept,
  onFileUploaded,
  currentUrl
}: FileUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const path = accept.includes('video') ? 'videos' : 'images';
      const url = await uploadFile(file, path);
      onFileUploaded(url);
      setPreviewUrl(url);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
      <div className="mt-1 flex items-center gap-4">
        {previewUrl && (
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
            {accept.includes('image') ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={previewUrl}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        )}
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg
            text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50
            disabled:cursor-not-allowed"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Escolher arquivo
            </>
          )}
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}