'use client'
import { Header, Sidebar } from '@/components';
import { NextPage } from 'next';
import { useState } from 'react';

const Services: NextPage = () => {
    const [serviceTitle, setServiceTitle] = useState<string>('');
    const [serviceDescription, setServiceDescription] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(' http://localhost:5000/api/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ serviceTitle, serviceDescription }),
            });

            if (response.ok) {
                setServiceTitle('');
                setServiceDescription('');
                setSuccessMessage('Service saved successfully.');
                setErrorMessage('');
            } else {
                setErrorMessage('Failed to save the service.');
            }
        } catch (error) {
            console.log(error)
            setErrorMessage('Error occurred while saving the service.');
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 bg-gray-100">
                <Header title="Edit Services Page" />
                <div className="p-6">
                    <form onSubmit={handleSave} className="space-y-6">
                        <div>
                            <label className="block text-lg font-medium">Service Title</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="Enter service title"
                                value={serviceTitle}
                                onChange={(e) => setServiceTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium">Service Description</label>
                            <textarea
                                className="w-full p-2 border rounded"
                                rows={6}
                                placeholder="Enter service description"
                                value={serviceDescription}
                                onChange={(e) => setServiceDescription(e.target.value)}
                            />
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
            </div>
        </div>
    );
}

export default Services;
