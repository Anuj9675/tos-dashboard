'use client'
import { useState } from 'react';
import { AboutItem } from '@/types';
import FileUploadComponent from '../fileUpload'; // Adjust the path accordingly

export const About = () => {
    const [aboutData, setAboutData] = useState<AboutItem | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [useFileUpload, setUseFileUpload] = useState(false); // Toggle between file upload and URL input

    const handleSave = () => {
        if (!aboutData) {
            setAboutData({ title, description, image });
            resetForm();
        }
    };

    const handleDelete = () => {
        setAboutData(null); // Reset the about data
        resetForm(); // Clear the input fields
    };

    const handleFileUploadSuccess = (uploadedFileUrl: string) => {
        setImage(uploadedFileUrl); // Set the uploaded file URL as image
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setImage('');
        setUseFileUpload(false);
    };

    const isValidImageUrl = (url: string) => {
        return /\.(jpeg|jpg|png|gif|bmp|webp)$/.test(url); // Check for common image file extensions
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        if (isValidImageUrl(url) || url === '') { // Allow empty value for resetting
            setImage(url);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">About Section</h1>

            {!aboutData ? (
                <div className="mb-6">
                    <div className="space-y-4">
                        <input
                            type="text"
                            className="w-full p-2 border rounded text-xs font-medium"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            className="w-full p-2 border rounded text-xs "
                            rows={4}
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        {/* Toggle between file upload and URL input */}
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={useFileUpload}
                                    onChange={() => setUseFileUpload(!useFileUpload)}
                                />
                                <span className="text-sm text-gray-600">
                                    Use file upload instead of image URL
                                </span>
                            </label>

                            {useFileUpload ? (
                                <FileUploadComponent onFileUploadSuccess={handleFileUploadSuccess} />
                            ) : (
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded text-xs font-medium"
                                    placeholder="Image URL"
                                    value={image}
                                    onChange={handleImageChange} // Updated to handle URL validation
                                />
                            )}
                        </div>

                        <button
                            onClick={handleSave}
                            className="bg-blue-600 text-white px-4 py-2 text-xs font-medium rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mb-6">
                    <div className="flex items-start border border-gray-300 p-4 rounded">
                        <div className="flex-shrink-0 w-1/3">
                            <img src={aboutData.image} alt={aboutData.title} className="w-full h-auto rounded" />
                        </div>
                        <div className="flex-grow pl-4">
                            <h3 className="text-md font-bold">{aboutData.title}</h3>
                            <p className="text-sm text-gray-600">{aboutData.description}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleDelete}
                        className="mt-4 bg-red-600 text-white px-4 py-2 text-xs font-medium rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};
