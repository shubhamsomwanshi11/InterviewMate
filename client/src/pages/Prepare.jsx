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
        experience: 'Fresher',
        focusArea: '',
        qualifications: '',
        skills: '',
    });

    const [loading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [questions, setQuestions] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const validateForm = () => {
        // Basic validation example
        if (!formData.jobTitle || !formData.companyInfo || !formData.jobDescription || !formData.experience || !formData.focusArea || !formData.qualifications || !formData.skills ) {
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
            const response = await axios.post('https://interviewmate-baxj.onrender.com/generate-questions', formData);
            setQuestions(response.data.text);

        } catch (error) {
            setError('Error generating questions. Please try again.');
            console.log(error);
        }
        finally {
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
        });
        setQuestions('');
        setError('');
        setFeedback('');
    };

    const getFeedback = async () => {
        const userAnswer = document.getElementById('userans').value;
        if (!userAnswer) {
            setError('Please provide an answer to get feedback.');
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post('https://interviewmate-baxj.onrender.com/generate-feedback', { answer: userAnswer });
            setFeedback(response.data.feedback);  // Assuming the API returns feedback in the `feedback` field
        } catch (error) {
            setError('Error generating feedback. Please try again.');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (loading) return <Loader />
    return (
        <div className="container mt-5">
            <div className="card border-0 shadow rounded">
                <div className="card-body p-5">
                    <p className='fs-4'>Fill all the required info to generate questions.</p>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="jobTitle" className="form-label fw-semibold">Job Title</label>
                                <input type="text" className="form-control" id="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Enter Job Title" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="companyInfo" className="form-label fw-semibold">Company Information</label>
                                <input type="text" className="form-control" id="companyInfo" value={formData.companyInfo} onChange={handleChange} placeholder="Company Name, Location" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="jobDescription" className="form-label fw-semibold">Job Description</label>
                            <textarea className="form-control" id="jobDescription" value={formData.jobDescription} onChange={handleChange} rows="3" placeholder="Describe the job responsibilities"></textarea>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="experience" className="form-label fw-semibold">Experience Needed</label>
                                <input type="text" className="form-control" id="experience" value={formData.experience} onChange={handleChange} placeholder="Years of experience required" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="focusArea" className="form-label fw-semibold">Focus Area (Department/Team)</label>
                                <input type="text" className="form-control" id="focusArea" value={formData.focusArea} onChange={handleChange} placeholder="Department or Team the role belongs to" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="qualifications" className="form-label fw-semibold">Qualifications</label>
                            <input type="text" className="form-control" id="qualifications" value={formData.qualifications} onChange={handleChange} placeholder="List required educational qualifications" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="skills" className="form-label fw-semibold">Skills</label>
                            <input type="text" className="form-control" id="skills" value={formData.skills} onChange={handleChange} placeholder="List required technical and soft skills" />
                        </div>
                        <hr />
                        <button type="submit" className="btn btn-primary mx-2">Generate <RiAiGenerate /></button>
                        <button type="button" className="btn btn-outline-danger" onClick={handleReset}>Reset <GrPowerReset /></button>
                    </form>
                    {questions && (
                        <div className="mt-4">
                            <h5>Generated Questions:</h5>
                            <ReactMarkdown className="bg-light p-3 rounded">{questions}</ReactMarkdown>

                            <div className="mt-4">
                                <h5>Answer Questions:</h5>

                                <textarea class="form-control" rows={5} name="" id="userans">

                                </textarea>
                                <div className='d-flex justify-content-end'>
                                    <button type="button" className="mt-3 btn btn-success" onClick={getFeedback}>Generate Feedback </button>
                                </div>

                                {feedback && (
                                    <ReactMarkdown className="bg-light p-3 rounded">{feedback}</ReactMarkdown>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Prepare;
