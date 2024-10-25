'use client';

import { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa'; // Import Plus and Close icons
import FAQForm from './faqform';
import { FAQItem } from '@/types'; // Importing the FAQItem type

export const FAQ = () => {
  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddClick = () => {
    setShowForm(true); // Open the form when 'Add New' is clicked
  };

  const handleSave = (newItem: FAQItem) => {
    setFaqData((prev) => [...prev, newItem]);
    setShowForm(false); // Close the form after saving
  };

  const handleCloseForm = () => {
    setShowForm(false); // Close the form when the close icon is clicked
  };

  return (
    <div className="p-6">
      {/* Table Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">FAQ List</h1>
        <button
          onClick={handleAddClick}
          className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 text-sm flex items-center"
        >
          <FaPlus className="mr-1 text-sm" /> Add New
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-300 text-sm">
      
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-300">ID</th>
            <th className="py-2 px-4 border border-gray-300">Question</th>
            <th className="py-2 px-4 border border-gray-300">Answer</th>
          </tr>
        </thead>
        <tbody>
          {faqData.length > 0 ? (
            faqData.map((faq, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border border-gray-300 text-left">{index + 1}</td>
                <td className="py-2 px-4 border border-gray-300 text-left">{faq.question}</td>
                <td className="py-2 px-4 border border-gray-300 text-left">{faq.answer}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center py-4">No FAQs available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Conditionally render the FAQForm */}
      {showForm && (
        <div className="mt-6 relative">
          <FAQForm onSave={handleSave} onClose={handleCloseForm} />
         
        </div>
      )}
    </div>
  );
};
