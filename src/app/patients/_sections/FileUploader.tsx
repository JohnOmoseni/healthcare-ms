"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { cn, convertFileToUrl, toastNotify } from "@/lib/utils";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/Button";
import { Upload } from "@/constants/icons";
import { useToast } from "@/components/ui/use-toast";
import { SUPPORTED_FORMATS } from "@/schema";

type FileUploaderProps = {
  file: File;
  onChange: (file: File) => void;
};

export const FileUploader = ({ file, onChange }: FileUploaderProps) => {
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];

    if (!SUPPORTED_FORMATS.includes(selectedFile.type)) {
      toastNotify(toast, "Please select a JPG, PNG, or SVG file.", "");
      return;
    }

    // Check file size
    if (selectedFile.size > 4 * 1024 * 1024) {
      toastNotify(toast, "File size exceeds 4MB", "");
      return;
    }

    onChange(selectedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
      "application/msword": [".doc"],
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".bmp", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex min-h-72 cursor-pointer flex-col items-center overflow-hidden rounded-xl border border-border bg-input px-3",
        isDragActive && "border-2 border-dashed border-ring",
      )}
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {file ? (
        <div className="flex h-full w-full flex-1 justify-center">
          <Image
            src={convertFileToUrl(file)}
            width={1000}
            height={1000}
            alt="uploaded image"
            className="max-h-[350px] overflow-hidden object-cover"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center py-5">
          <span className="icon my-6">
            <Upload size={50} />
          </span>

          <h3 className="my-2 px-2 text-center">
            {isDragActive ? (
              "Drag and drop here...."
            ) : (
              <>
                <span className="text-green-500">Click to upload </span>
                or drag and drop here
              </>
            )}
          </h3>
          <p className="text-base">SVG, PNG, JPG or GIF (max. 800x400px)</p>
          {!isDragActive && (
            <Button title="Select from computer" className="mt-6" />
          )}
        </div>
      )}
    </div>
  );
};
