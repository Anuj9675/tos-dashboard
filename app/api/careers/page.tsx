'use client'
import { Header, Sidebar } from '@/components';
import { NextPage } from 'next';
import { useState } from 'react';

const Careers: NextPage = () => {
    const [jobTitle, setJobTitle] = useState<string>('');
    const [jobDescription, setJobDescription] = useState<string>('');
    const [responsibilities, setResponsibilities] = useState<string>('');
    const [skillsAndQualifications, setSkillsAndQualifications] = useState<string>('');
    const [employmentType, setEmploymentType] = useState<string>('');
    const [experience, setExperience] = useState<string>('');
    const [salary, setSalary] = useState<string>('');
    const [jobLocation, setJobLocation] = useState<string>('');


    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/careers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jobTitle,
                    jobDescription,
                    responsibilities,
                    skillsAndQualifications,
                    employmentType,
                    experience,
                    salary,
                    jobLocation,
                
                }),
            });

            if (response.ok) {
                setJobTitle('');
                setJobDescription('');
                setResponsibilities('');
                setSkillsAndQualifications('');
                setEmploymentType('');
                setExperience('');
                setSalary('');
                setJobLocation('');
            
                setSuccessMessage('Career saved successfully.');
                setErrorMessage('');
            } else {
                setErrorMessage('Failed to save the career.');
            }
        } catch (error) {
            console.log(error)
            setErrorMessage('Error occurred while saving the career.');
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 bg-gray-100">
                <Header title="Edit Careers Page" />
                <div className="p-6">
                    <form onSubmit={handleSave} className="space-y-6">
                        <div>
                            <label className="block text-lg font-medium">Job Title</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="Enter job title"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium">Job Description</label>
                            <textarea
                                className="w-full p-2 border rounded"
                                rows={6}
                                placeholder="Enter job description"
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium">Responsibilities</label>
                            <textarea
                                className="w-full p-2 border rounded"
                                rows={6}
                                placeholder="Enter responsibilities"
                                value={responsibilities}
                                onChange={(e) => setResponsibilities(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium">Skills and Qualifications</label>
                            <textarea
                                className="w-full p-2 border rounded"
                                rows={6}
                                placeholder="Enter skills and qualifications"
                                value={skillsAndQualifications}
                                onChange={(e) => setSkillsAndQualifications(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium">Employment Type</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="Enter employment type (e.g., Full time)"
                                value={employmentType}
                                onChange={(e) => setEmploymentType(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium">Experience</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="Enter experience (e.g., 1-3 years)"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium">Salary</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="Enter salary range (e.g., 2.4-6 LPA)"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium">Job Location</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="Enter job location (e.g., Rajkot, Gujarat)"
                                value={jobLocation}
                                onChange={(e) => setJobLocation(e.target.value)}
                            />
                        </div>

                 

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </form>

                    {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
                    {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
}

export default Careers;
