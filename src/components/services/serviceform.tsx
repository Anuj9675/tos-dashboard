'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaTimes } from 'react-icons/fa'; 
import { ServiceItem } from '@/types';

// Validation schema using Yup
const schema = yup.object().shape({
    title: yup.string().required('Service title is required'),
    description: yup.string().required('Description is required'),
    image: yup.string().url('Must be a valid URL').required('Image URL is required'),
});

interface ServiceFormInputs {
    title: string;
    description: string;
    image: string;
}

interface ServiceFormProps {
    onSave: (newService: { id: number; title: string; description: string; image: string }) => void;
    onClose: () => void;
    onDelete: () => void; // Accept delete function
    initialData?: ServiceItem | null; // Accept initial data for editing
}

const ServiceForm = ({ onSave, onClose, onDelete, initialData }: ServiceFormProps) => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<ServiceFormInputs>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData); // Reset form with initial data
        }
    }, [initialData, reset]);

    const onSubmit = (data: ServiceFormInputs) => {
        const newService = { id: initialData ? initialData.id : Date.now(), ...data }; // Use existing ID or create a new one
        onSave(newService);
        reset(); 
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96 relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-xl text-gray-500 hover:text-gray-700">
                    <FaTimes />
                </button>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-xs font-medium mb-1">Service Title</label>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded text-xs font-medium"
                                    placeholder="Enter service title"
                                    {...field}
                                />
                            )}
                        />
                        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-medium mb-1">Description</label>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <textarea
                                    className="w-full p-2 border rounded text-xs font-medium"
                                    rows={6}
                                    placeholder="Enter service description"
                                    {...field}
                                />
                            )}
                        />
                        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-medium mb-1">Image URL</label>
                        <Controller
                            name="image"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded text-xs font-medium"
                                    placeholder="Enter image URL"
                                    {...field}
                                />
                            )}
                        />
                        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
                    </div>

                    <button type="submit" className="bg-blue-600 mr-2 text-white px-4 py-2 text-xs font-medium rounded hover:bg-blue-700">
                        Save Service
                    </button>
                    
                    {initialData && ( // Show delete button only if editing
                        <button type="button" onClick={onDelete} className="bg-red-600  text-white px-4 py-2 text-xs font-medium rounded hover:bg-red-700">
                            Delete Service
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ServiceForm;
