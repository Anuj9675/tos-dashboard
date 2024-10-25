'use client';

import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import JobCategoryForm from './jobcategoryform'; // Import the JobCategoryForm
import { JobCategoryItem } from '@/types'; // Import the JobCategoryItem type (you will define this in types)

export const JobCategory = () => {
  const [jobCategoryData, setJobCategoryData] = useState<JobCategoryItem[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddClick = () => {
    setShowForm(true); // Open the form when 'Add New' is clicked
  };

  const handleSave = (newItem: JobCategoryItem) => {
    setJobCategoryData((prev) => [...prev, newItem]);
    setShowForm(false); // Close the form after saving
  };

  const handleCloseForm = () => {
    setShowForm(false); // Close the form when the close icon is clicked
  };

  return (
    <div className="p-6">
      {/* Table Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Job Category List</h1>
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
            <th className="py-2 px-4 border border-gray-300">Job Category</th>
          </tr>
        </thead>
        <tbody>
          {jobCategoryData.length > 0 ? (
            jobCategoryData.map((category, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border border-gray-300 text-left">{index + 1}</td>
                <td className="py-2 px-4 border border-gray-300 text-left">{category.jobCategory}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="text-center py-4">No Job Categories available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Conditionally render the JobCategoryForm */}
      {showForm && (
        <div className="mt-6 relative">
          <JobCategoryForm onSave={handleSave} onClose={handleCloseForm} />
        </div>
      )}
    </div>
  );
};
