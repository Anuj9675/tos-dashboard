'use client';

import { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa'; // Import Plus and Close icons
import CareersForm from './careerform'; // Update path if necessary
import { CareerItem } from '@/types'; // Import the CareerItem type

export const Career = () => {
  const [careerData, setCareerData] = useState<CareerItem[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddClick = () => {
    setShowForm(true); // Open the form when 'Add New' is clicked
  };

  const handleSave = (newItem: CareerItem) => {
    setCareerData((prev) => [...prev, newItem]);
    setShowForm(false); // Close the form after saving
  };

  const handleCloseForm = () => {
    setShowForm(false); // Close the form when the close icon is clicked
  };

  return (
    <div className="p-6">
      {/* Table Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Careers List</h1>
        <button
          onClick={handleAddClick}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm flex items-center"
        >
          <FaPlus className="mr-2" /> Add New
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-300 text-sm">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-300">Job Title</th>
            <th className="py-2 px-4 border border-gray-300">Job Description</th>
            <th className="py-2 px-4 border border-gray-300">Responsibilities</th>
            <th className="py-2 px-4 border border-gray-300">Skills</th>
            <th className="py-2 px-4 border border-gray-300">Employment Type</th>
            <th className="py-2 px-4 border border-gray-300">Experience</th>
            <th className="py-2 px-4 border border-gray-300">Salary</th>
            <th className="py-2 px-4 border border-gray-300">Location</th>
          </tr>
        </thead>
        <tbody>
          {careerData.length > 0 ? (
            careerData.map((career, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border border-gray-300 text-left">{career.jobTitle}</td>
                <td className="py-2 px-4 border border-gray-300 text-left">{career.jobDescription}</td>
                <td className="py-2 px-4 border border-gray-300 text-left">{career.responsibilities}</td>
                <td className="py-2 px-4 border border-gray-300 text-left">{career.skillsAndQualifications}</td>
                <td className="py-2 px-4 border border-gray-300 text-left">{career.employmentType}</td>
                <td className="py-2 px-4 border border-gray-300 text-left">{career.experience}</td>
                <td className="py-2 px-4 border border-gray-300 text-left">{career.salary}</td>
                <td className="py-2 px-4 border border-gray-300 text-left">{career.jobLocation}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center py-4">No careers available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Conditionally render the CareersForm as a popup/modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
       
            <CareersForm onSave={handleSave} onClose={handleCloseForm} />
            
          
        </div>
      )}
    </div>
  );
};


