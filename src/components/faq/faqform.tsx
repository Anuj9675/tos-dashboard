// src/components/faqform.tsx

'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaTimes } from 'react-icons/fa'; // Import the close icon

// Validation schema using Yup
const schema = yup.object().shape({
    question: yup.string().required('Question is required'),
    answer: yup.string().required('Answer is required'),
});

interface FAQFormInputs {
    question: string;
    answer: string;
}

interface FAQFormProps {
    onSave: (newFAQ: { id: number; question: string; answer: string }) => void; // Add onSave prop type
    onClose: () => void; // Add onClose prop type
}

const FAQForm = ({ onSave, onClose }: FAQFormProps) => {
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    // Initialize the form with react-hook-form and yup resolver
    const { control, handleSubmit, formState: { errors }, reset } = useForm<FAQFormInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: FAQFormInputs) => {
        const newFAQ = { id: Date.now(), ...data }; // Use Date.now() as a unique ID
        onSave(newFAQ); // Call onSave with the new FAQ
        reset(); // Reset the form after successful submission
        setSuccessMessage('FAQ saved successfully.');
        setErrorMessage('');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96 relative">
            <button
                    onClick={onClose}
                    className="absolute top-0 right-3 text-3xl text-gray-500 hover:text-gray-700"
                >
                    &times; {/* Close button using × character */}
                </button>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block  text-xs font-medium mb-1">Question</label>
                        <Controller
                            name="question"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded  text-xs font-medium"
                                    placeholder="Enter question"
                                    {...field}
                                />
                            )}
                        />
                        {errors.question && <p className="text-red-500">{errors.question.message}</p>}
                    </div>

                    <div>
                        <label className="block  text-xs font-medium mb-1">Answer</label>
                        <Controller
                            name="answer"
                            control={control}
                            render={({ field }) => (
                                <textarea
                                    className="w-full p-2 border rounded  text-xs font-medium"
                                    rows={6}
                                    placeholder="Enter answer"
                                    {...field}
                                />
                            )}
                        />
                        {errors.answer && <p className="text-red-500">{errors.answer.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2  text-xs font-medium rounded hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                </form>

                {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
                {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
            </div>
        </div>
    );
}

export default FAQForm;
