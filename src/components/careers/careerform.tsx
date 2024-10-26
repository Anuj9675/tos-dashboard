'use client';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { CareerItem } from '@/types'; // Import the CareerItem type

// Define the validation schema using Yup
const schema = yup.object().shape({
  jobTitle: yup.string().required('Job title is required'),
  jobDescription: yup.string().required('Job description is required'),
  responsibilities: yup.string().required('Responsibilities are required'), // Change to string
  skillsAndQualifications: yup.string().required('Skills are required'), // Change to string
  employmentType: yup.string().required('Employment type is required'),
  experience: yup.string().required('Experience is required'),
  salary: yup.string().required('Salary is required'),
  jobLocation: yup.string().required('Job location is required'),
  jobCategory: yup.string().required('Job category is required'), // Add jobCategory to schema
});

interface CareersFormProps {
  onSave: (data: CareerItem) => void; // Define onSave prop type
  onClose: () => void; // Define onClose prop type
}

const CareersForm: React.FC<CareersFormProps> = ({ onSave, onClose }) => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Initialize the form using react-hook-form
  const { control, handleSubmit, formState: { errors }, reset } = useForm<CareerItem>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      jobTitle: '',
      jobDescription: '',
      responsibilities: '', // Initialize as string
      skillsAndQualifications: '', // Initialize as string
      employmentType: '',
      experience: '',
      salary: '',
      jobLocation: '',
      jobCategory: '', 
    },
  });

  const onSubmit = async (data: CareerItem) => {
    try {
      onSave(data); // Call onSave with the form data
      reset(); // Reset the form after saving
      setSuccessMessage('Career saved successfully.');
      setErrorMessage('');
    } catch (error) {
      console.log(error);
      setErrorMessage('Error occurred while saving the career.');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-3xl text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4">Add Career</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Job Title */}
          <div>
            <label className="block text-xs font-medium mb-1">Job Title</label>
            <Controller
              name="jobTitle"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 text-xs"
                  placeholder="Enter job title"
                />
              )}
            />
            {errors.jobTitle && <p className="text-red-500 text-xs mt-1">{errors.jobTitle.message}</p>}
          </div>

          {/* Job Category */}
          <div>
            <label className="block text-xs font-medium mb-1">Job Category</label>
            <Controller
              name="jobCategory"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 text-xs"
                >
                  <option value="">Select job category</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Finance">Finance</option>
                </select>
              )}
            />
            {errors.jobCategory && <p className="text-red-500 text-xs mt-1">{errors.jobCategory.message}</p>}
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-xs font-medium mb-1">Job Description</label>
            <Controller
              name="jobDescription"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 text-xs"
                  rows={1} // Decrease the number of rows
                  placeholder="Enter job description"
                />
              )}
            />
            {errors.jobDescription && <p className="text-red-500 text-xs mt-1">{errors.jobDescription.message}</p>}
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-xs font-medium mb-1">Responsibilities (comma-separated)</label>
            <Controller
              name="responsibilities"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 text-xs"
                  placeholder="Enter responsibilities"
                />
              )}
            />
            {errors.responsibilities && <p className="text-red-500 text-xs mt-1">{errors.responsibilities.message}</p>}
          </div>

          {/* Skills and Qualifications */}
          <div>
            <label className="block text-xs font-medium mb-1">Skills and Qualifications (comma-separated)</label>
            <Controller
              name="skillsAndQualifications"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 text-xs"
                  placeholder="Enter skills and qualifications"
                />
              )}
            />
            {errors.skillsAndQualifications && <p className="text-red-500 text-xs mt-1">{errors.skillsAndQualifications.message}</p>}
          </div>

          {/* Experience and Employment Type */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-xs font-medium mb-1">Experience</label>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 text-xs"
                    placeholder="e.g., 1-3 years"
                  />
                )}
              />
              {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience.message}</p>}
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium mb-1">Employment Type</label>
              <Controller
                name="employmentType"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 text-xs"
                  >
                    <option value="">Select employment type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                )}
              />
              {errors.employmentType && <p className="text-red-500 text-xs mt-1">{errors.employmentType.message}</p>}
            </div>
          </div>

          {/* Salary and Job Location */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-xs font-medium mb-1">Salary</label>
              <Controller
                name="salary"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 text-xs"
                    placeholder="e.g., $50k-$70k"
                  />
                )}
              />
              {errors.salary && <p className="text-red-500 text-xs mt-1">{errors.salary.message}</p>}
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium mb-1">Job Location</label>
              <Controller
                name="jobLocation"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 text-xs"
                    placeholder="Enter job location"
                  />
                )}
              />
              {errors.jobLocation && <p className="text-red-500 text-xs mt-1">{errors.jobLocation.message}</p>}
            </div>
          </div>

          {/* Success and Error Messages */}
          {successMessage && <p className="text-green-500 text-xs mt-2">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 text-xs mt-2">{errorMessage}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-150"
          >
            Save Career
          </button>
        </form>
      </div>
    </div>
  );
};

export default CareersForm;
