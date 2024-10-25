'use client';

import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ServiceForm from './serviceform';


interface ServiceItem {
    id: number;
    title: string;
    description: string;
    image: string;
}

export const Services = () => {
    const [services, setServices] = useState<ServiceItem[]>([]);
    const [showForm, setShowForm] = useState(false);

    const handleAddClick = () => {
        setShowForm(true);
    };

    const handleSave = (newService: ServiceItem) => {
        setServices((prev) => [...prev, newService]);
        setShowForm(false); 
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Service List</h1>
                <button
                    onClick={handleAddClick}
                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 text-sm flex items-center"
                >
                    <FaPlus className="mr-1 text-sm" /> Add New
                </button>
            </div>

            <table className="min-w-full bg-white border border-gray-300 text-sm">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border border-gray-300">ID</th>
                        <th className="py-2 px-4 border border-gray-300">Image</th>
                        <th className="py-2 px-4 border border-gray-300">Title</th>
                        <th className="py-2 px-4 border border-gray-300">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {services.length > 0 ? (
                        services.map((service, index) => (
                            <tr key={service.id}>
                                <td className="py-2 px-4 border border-gray-300 text-left">{index + 1}</td>
                                <td className="py-2 px-4 border border-gray-300 text-left">
                                    <img src={service.image} alt={service.title} className="w-16 h-16 object-cover" />
                                </td>
                                <td className="py-2 px-4 border border-gray-300 text-left">{service.title}</td>
                                <td className="py-2 px-4 border border-gray-300 text-left">{service.description}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center py-4">No Services available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {showForm && (
                <div className="mt-6 relative">
                    <ServiceForm onSave={handleSave} onClose={handleCloseForm} />
                </div>
            )}
        </div>
    );
};
