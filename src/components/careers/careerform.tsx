'use client';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { CareerItem } from '@/types'; // Import the CareerItem type
import { FaPlus, FaTrash } from 'react-icons/fa'; // Import icons for Add and Delete

// Define the validation schema using Yup
const schema = yup.object().shape({
  jobTitle: yup.string().required('Job title is required'),
  jobDescription: yup.string().required('Job description is required'),
  responsibilities: yup.array().of(yup.string().required('Responsibility is required')),
  skillsAndQualifications: yup.array().of(yup.string().required('Skill is required')),
  employmentType: yup.string().required('Employment type is required'),
  experience: yup.string().required('Experience is required'),
  salary: yup.string().required('Salary is required'),
  jobLocation: yup.string().required('Job location is required'),
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
    resolver: yupResolver(schema),
    defaultValues: {
      jobTitle: '',
      jobDescription: '',
      responsibilities: [],
      skillsAndQualifications: [], 
      employmentType: '', 
      experience: '',
      salary: '',
      jobLocation: '',
    },
  });

  // Use useFieldArray for responsibilities and skills
  const { fields: responsibilitiesFields, append: appendResponsibility, remove: removeResponsibility } = useFieldArray({
    control,
    name: 'responsibilities', // Ensure this matches the field in the form data
  });

  const { fields: skillsFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: 'skillsAndQualifications', // Ensure this matches the field in the form data
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
          &times; {/* Close button using × character */}
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
            <label className="block text-xs font-medium mb-1">Responsibilities</label>
            {responsibilitiesFields.map((item, index) => (
              <div key={item.id} className="flex items-center space-x-2 mb-1">
                <Controller
                  name={`responsibilities.${index}`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 text-xs"
                      placeholder="Enter responsibility"
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => removeResponsibility(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendResponsibility('')}
              className="text-blue-600 hover:text-blue-700 mt-2 flex items-center"
            >
              <FaPlus className="mr-1" />
            </button>
            {errors.responsibilities && <p className="text-red-500 text-xs mt-1">{errors.responsibilities.message}</p>}
          </div>

          {/* Skills and Qualifications */}
          <div>
            <label className="block text-xs font-medium mb-1">Skills and Qualifications</label>
            {skillsFields.map((item, index) => (
              <div key={item.id} className="flex items-center space-x-2 mb-1">
                <Controller
                  name={`skillsAndQualifications.${index}`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 text-xs"
                      placeholder="Enter skill or qualification"
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendSkill('')}
              className="text-blue-600 hover:text-blue-700 mt-2 flex items-center"
            >
              <FaPlus className="mr-1" />
            </button>
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
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
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
                    placeholder="Enter salary range"
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

          {/* Submit button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm transition duration-150 text-sm"
            >
              Save Career
            </button>
          </div>

          {/* Success and Error Messages */}
          {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default CareersForm;
