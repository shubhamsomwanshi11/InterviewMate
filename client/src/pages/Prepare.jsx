import React, { useState } from 'react';
import { RiAiGenerate } from "react-icons/ri";
import { GrPowerReset } from "react-icons/gr";
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import Loader from '../components/Loader'


const Prepare = () => {
    const [formData, setFormData] = useState({
        jobTitle: '',
        companyInfo: '',
        jobDescription: '',
        experience: '',
        focusArea: '',
        qualifications: '',
        skills: '',
        hobbies: '',
        competencies: ''
    });

    const [loading,setIsLoading] = useState(false);

    const [questions, setQuestions] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const validateForm = () => {
        // Basic validation example
        if (!formData.jobTitle || !formData.companyInfo || !formData.jobDescription || !formData.experience || !formData.focusArea || !formData.qualifications || !formData.skills || !formData.competencies) {
            setError("Please fill out all required fields.");
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:9860/generate-questions', formData);
            setQuestions(response.data.text);
        } catch (error) {
            setError('Error generating questions. Please try again.');
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            jobTitle: '',
            companyInfo: '',
            jobDescription: '',
            experience: '',
            focusArea: '',
            qualifications: '',
            skills: '',
            hobbies: '',
            competencies: ''
        });
        setQuestions('');
        setError('');
    };
    if(loading)return <Loader/>
    return (
        <div className="container mt-5">
            <div className="card border-0 shadow rounded">
                <div className="card-body p-5">
                    <p className='fs-4'>Fill all the required info to generate questions.</p>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="jobTitle" className="form-label">Job Title</label>
                                <input type="text" className="form-control" id="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Enter Job Title" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="companyInfo" className="form-label">Company Information</label>
                                <input type="text" className="form-control" id="companyInfo" value={formData.companyInfo} onChange={handleChange} placeholder="Company Name, Location" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="jobDescription" className="form-label">Job Description</label>
                            <textarea className="form-control" id="jobDescription" value={formData.jobDescription} onChange={handleChange} rows="3" placeholder="Describe the job responsibilities"></textarea>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="experience" className="form-label">Experience Needed</label>
                                <input type="text" className="form-control" id="experience" value={formData.experience} onChange={handleChange} placeholder="Years of experience required" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="focusArea" className="form-label">Focus Area (Department/Team)</label>
                                <input type="text" className="form-control" id="focusArea" value={formData.focusArea} onChange={handleChange} placeholder="Department or Team the role belongs to" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="qualifications" className="form-label">Qualifications</label>
                            <input type="text" className="form-control" id="qualifications" value={formData.qualifications} onChange={handleChange} placeholder="List required educational qualifications" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="skills" className="form-label">Skills</label>
                            <input type="text" className="form-control" id="skills" value={formData.skills} onChange={handleChange} placeholder="List required technical and soft skills" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="hobbies" className="form-label">Hobbies (Optional)</label>
                            <input type="text" className="form-control" id="hobbies" value={formData.hobbies} onChange={handleChange} placeholder="List relevant hobbies (may indicate personality traits)" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="competencies" className="form-label">Competencies</label>
                            <input type="text" className="form-control" id="competencies" value={formData.competencies} onChange={handleChange} placeholder="List required technical and behavioral competencies" />
                        </div>
                        <hr />
                        <button type="submit" className="btn btn-primary mx-2">Generate <RiAiGenerate /></button>
                        <button type="button" className="btn btn-outline-danger" onClick={handleReset}>Reset <GrPowerReset /></button>
                    </form>
                    {questions && (
                        <div className="mt-4">
                            <h5>Generated Questions:</h5>
                            <ReactMarkdown className="bg-light p-3 rounded">{questions}</ReactMarkdown>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Prepare;
