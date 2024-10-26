'use client'
import { Loader2, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface FileUploadComponentProps {
  onFileUploadSuccess: (uploadedFile: string) => void; // Changed to uploadedFile
}

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({ onFileUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState<string | null>(null); // Changed from imageUrl to image

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size (max 3MB)
      if (file.size > 3 * 1024 * 1024) {
        setFileError("File size exceeds 3MB.");
        setSelectedFile(null);
        setImage(null); // Reset the image state
      } else if (!["image/jpeg", "image/png"].includes(file.type)) {
        setFileError("Invalid file format. Only JPG/PNG allowed.");
        setSelectedFile(null);
        setImage(null); // Reset the image state
      } else {
        setFileError(null);
        setSelectedFile(file);
        setImage(URL.createObjectURL(file)); // Create URL for the selected file
      }
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setFileError("Please select a file to upload.");
      return;
    }

    // Simulate file upload
    setIsUploading(true);
    setTimeout(() => {
      const uploadedFile = image; // Use the image for the upload success

      // Check if uploadedFile is not null before calling the function
      if (uploadedFile) {
        onFileUploadSuccess(uploadedFile); // Call the success handler with the uploaded file
      }

      setIsUploading(false);
      toast.success("File uploaded successfully!");
    }, 2000); // Simulated upload time
  };

  // Cleanup the object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image); // Free up memory
      }
    };
  }, [image]);

  return (
    <div className="">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Picture (JPG, PNG of max size 3MB)
      </label>
      <div className="max-w-lg px-6 bg-white border-2 border-gray-300 rounded-lg">
        {/* File Input with Beautiful Design */}
        <div className="">
          <div className="relative w-full overflow-x-clip ">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center w-full px-6 py-4 m-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300 ease-in-out"
            >
              {selectedFile ? (
                <span className="text-sm text-gray-600 max-w-80">{selectedFile.name}</span>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2 text-wrap">
                  <Upload size={24} color="#B4B4B8" />
                  <span className="text-sm text-gray-500 ">Click to select a file</span>
                </div>
              )}
            </label>
            {fileError && <p className="text-red-500 text-xs mt-2">{fileError}</p>}
          </div>
        </div>

        {/* Image Preview */}
        {image && (
          <div className="mt-4">
            <img src={image} alt="Preview" className="h-32 w-auto rounded" />
          </div>
        )}

        {/* Beautiful Upload Button */}
        {selectedFile && (
          <div className="flex justify-center my-2">
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className={`relative px-6 py-2 text-sm font-bold text-white rounded-md transition-all duration-300 ease-in-out ${
                isUploading ? "bg-blue-400 cursor-not-allowed" : "bg-main"
              }`}
            >
              {isUploading ? (
                <div className="flex flex-row justify-center gap-2">
                  <Loader2 size={24} color="white" className="animate-spin " />
                  Uploading...
                </div>
              ) : (
                "Upload"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadComponent;
