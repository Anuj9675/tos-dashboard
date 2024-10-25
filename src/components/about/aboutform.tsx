'use client';
import { useState } from 'react';

const AboutForm = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/about', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description }),
            });

            if (response.ok) {
                setTitle('');
                setDescription('');
                setSuccessMessage('About section saved successfully.');
                setErrorMessage('');
            } else {
                setErrorMessage('Failed to save the about section.');
            }
        } catch (error) {
            setErrorMessage('Error occurred while saving the about section.');
        }
    };

    return (
        <div className="p-6">
            <form onSubmit={handleSave} className="space-y-6">
                <div>
                    <label className="block text-lg font-medium">About Title</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        placeholder="Enter about title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium">About Description</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        rows={6}
                        placeholder="Enter about description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Save Changes
                </button>
            </form>

            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>
    );
}

export default AboutForm;
