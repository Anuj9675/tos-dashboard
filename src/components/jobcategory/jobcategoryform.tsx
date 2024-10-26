'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation schema using Yup
const schema = yup.object().shape({
    jobCategory: yup.string().required('Job Category is required'),
});

interface JobCategoryFormInputs {
    jobCategory: string;
}

interface JobCategoryFormProps {
    onSave: (newJobCategory: { id: number; jobCategory: string }) => void;
    onClose: () => void; // Add onClose prop type
    onDelete: (id: number) => void; // Add onDelete prop type
    initialData?: { id: number; jobCategory: string } | null; // Accept initial data for editing
}

const JobCategoryForm = ({ onSave, onClose, onDelete, initialData }: JobCategoryFormProps) => {
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    // Initialize the form with react-hook-form and yup resolver
    const { control, handleSubmit, formState: { errors }, reset } = useForm<JobCategoryFormInputs>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData); // Reset form with initial data for editing
        }
    }, [initialData, reset]);

    const onSubmit = (data: JobCategoryFormInputs) => {
        const newJobCategory = { id: initialData ? initialData.id : Date.now(), ...data }; // Use existing ID or create a new one
        onSave(newJobCategory); // Call onSave with the new Job Category
        reset(); // Reset the form after successful submission
        setSuccessMessage('Job Category saved successfully.');
        setErrorMessage('');
    };

    const handleDelete = () => {
        if (initialData) {
            onDelete(initialData.id); // Call onDelete with the current ID
            onClose(); // Close the form after deletion
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-72 relative">
                <button
                    onClick={onClose}
                    className="absolute top-0 right-3 text-3xl text-gray-500 hover:text-gray-700"
                >
                    &times; {/* Close button using × character */}
                </button>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-xs font-medium mb-1">Job Category</label>
                        <Controller
                            name="jobCategory"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded text-xs font-medium"
                                    placeholder="Enter job category"
                                    {...field}
                                />
                            )}
                        />
                        {errors.jobCategory && <p className="text-red-500">{errors.jobCategory.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white mr-2 px-4 py-2 text-xs font-medium rounded hover:bg-blue-700"
                    >
                        Save
                    </button>
                    
                    {initialData && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-4 py-2 text-xs font-medium rounded hover:bg-red-700"
                        >
                            Delete
                        </button>
                    )}
                </form>

                {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
                {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default JobCategoryForm;
