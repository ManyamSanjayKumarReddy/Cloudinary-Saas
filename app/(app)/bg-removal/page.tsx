"use client"
import React , { useState, useEffect, useRef }from 'react'
import { CldImage} from "next-cloudinary"
import { toast } from 'react-toastify';
export default function GrayScaleImage() {

    const [uploadedIamge, setUploadedIamge] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isTransforming, setIsTransforming] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);


    useEffect(() => {
        if(uploadedIamge){
            setIsTransforming(true);
        }
    }, [uploadedIamge])

    const handleFileUpload = async(
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
                body: formData
            })

            if (!response.ok) throw new Error("Failed to upload image");

            const data = await response.json();
            setUploadedIamge(data.publicId);
            setIsUploading(false);
            
        } catch (error) {
            console.log(error)
            toast.error("Failed to upload image")
        } finally {
            setIsUploading(false);
        }
    }

    const handleDownload = () => {
        if (!imageRef.current) return;
    
        fetch(imageRef.current.src)
          .then((response) => response.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "bgremoved.png";
            // link.download = `${selectedFormat
            //     .replace(/\s+/g, "_")
            //     .toLowerCase()}.png`;
            // link.download = `${uploadedIamge?.substring(0,5)}_generated.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            // document.body.removeChild(link);
          });
      };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Background Remove for Images
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

          {uploadedIamge && (
            <div className="mt-6">
            
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
                     src={uploadedIamge}
                     sizes="100vw"
                     removeBackground
                     alt="uploaded image"
                    ref={imageRef}
                    onLoad={() => setIsTransforming(false)}
                  />
                </div>
              </div>

              <div className="card-actions justify-end mt-6">
                <button className="btn btn-primary" onClick={handleDownload}>
                  Download BG Removed Image
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

