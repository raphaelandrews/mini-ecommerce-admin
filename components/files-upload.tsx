"use client";

import { X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";

interface FileUploadProps {
  onChange: (urls: string[]) => void;
  value: string[];
  endpoint: "messageFile" | "serverImage";
}

export const FilesUpload = ({
  onChange,
  value,
  endpoint
}: FileUploadProps) => {
  const removeImage = (index: number) => {
    const newImages = [...value];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div>
      {value.map((imageUrl, index) => (
        <div key={index} className="relative h-40 w-40 inline-block mr-4">
          <Image
            fill
            src={imageUrl}
            alt="Upload"
            className="rounded-md"
          />
          <button
            onClick={() => removeImage(index)}
            className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange([...value, res?.[0].url]); // Concatenate new URL with existing ones
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
      />
    </div>
  );
};
