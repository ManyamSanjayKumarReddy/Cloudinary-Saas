"use client";
import React, { useState, useEffect, useRef } from "react";
import { CldImage } from "next-cloudinary";
import { toast } from "react-toastify";

export default function ImageTransformation() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformation, setTransformation] = useState<
    "grayscale" | "removeBackground" | null
  >(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (uploadedImage && transformation) {
      setIsTransforming(true);
    }
  }, [uploadedImage, transformation]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload image");

      const data = await response.json();
      setUploadedImage(data.publicId);
      setIsUploading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = (filename: string) => {
    if (!imageRef.current) return;

    fetch(imageRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Play with Multiple Image Transformations
      </h1>

      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Upload an Image</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Choose an image file</span>
            </label>
            <input
              type="file"
              onChange={handleFileUpload}
              className="file-input file-input-bordered file-input-primary w-full"
            />
          </div>

          {isUploading && (
            <div className="mt-4">
              <progress className="progress progress-primary w-full"></progress>
            </div>
          )}

          {uploadedImage && (
            <div className="mt-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Select Transformation</span>
                </label>
                <select
                  onChange={(e) =>
                    setTransformation(
                      e.target.value as "grayscale" | "removeBackground"
                    )
                  }
                  className="select select-primary w-full"
                >
                  <option value="grayscale">Grayscale</option>
                  <option value="removeBackground">Remove Background</option>
                </select>
              </div>

              <div className="mt-6 relative">
                <h3 className="text-lg font-semibold mb-2">Preview:</h3>
                <div className="flex justify-center">
                  {isTransforming && (
                    <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-50 z-10">
                      <span className="loading loading-spinner loading-lg"></span>
                    </div>
                  )}
                  <CldImage
                    width="960"
                    height="600"
                    src={uploadedImage}
                    sizes="100vw"
                    alt="uploaded image"
                    ref={imageRef}
                    grayscale={transformation === "grayscale"}
                    removeBackground={transformation === "removeBackground"}
                    onLoad={() => setIsTransforming(false)}
                  />
                </div>
              </div>

              <div className="card-actions justify-end mt-6">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    handleDownload(
                      transformation === "grayscale"
                        ? "grayscaled_image.png"
                        : "bg_removed_image.png"
                    )
                  }
                >
                  Download Transformed Image
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
