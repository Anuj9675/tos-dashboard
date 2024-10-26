'use client';

import { useState } from 'react';
import { FaPlus } from 'react-icons/fa'; // Import Plus icon
import FAQForm from './faqform';
import { FAQItem } from '@/types'; // Importing the FAQItem type

export const FAQ = () => {
  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null); // State for the item being edited

  const handleAddClick = () => {
    setEditingItem(null); // Reset editing item when adding a new FAQ
    setShowForm(true); // Open the form when 'Add New' is clicked
  };

  const handleRowClick = (faq: FAQItem) => {
    setEditingItem(faq); // Set the item to be edited
    setShowForm(true); // Open the form for editing
  };

  const handleSave = (newItem: FAQItem) => {
    if (editingItem) {
      // Update existing item
      setFaqData((prev) =>
        prev.map((item) => (item.id === newItem.id ? newItem : item))
      );
    } else {
      // Add new item
      setFaqData((prev) => [...prev, newItem]);
    }
    setShowForm(false); // Close the form after saving
  };

  const handleDelete = (id: number) => {
    setFaqData((prev) => prev.filter((item) => item.id !== id)); // Remove the item from the state
    setShowForm(false); // Close the form after deleting
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
              <tr key={faq.id} onClick={() => handleRowClick(faq)} className="cursor-pointer hover:bg-gray-100">
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
          <FAQForm 
            onSave={handleSave} 
            onClose={handleCloseForm} 
            onDelete={handleDelete} // Pass the delete function to the form
            initialData={editingItem} // Pass the editing item data
          />
        </div>
      )}
    </div>
  );
};
