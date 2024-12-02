import React, { useState } from 'react';
import { RiAiGenerate } from "react-icons/ri";
import { GrPowerReset } from "react-icons/gr";
import axios from 'axios';
import Loader from '../components/Loader';
import ReactMarkdown from 'react-markdown';
import '../index.css'

const Prepare = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        jobTitle: '',
        companyName: '',
        jobDescription: '',
        knownLanguages: '',
        technicalSkills: '',
        softSkills: '',
        hobbies: '',
        achievements: '',
    });

    const [loading, setIsLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState('');
    const [responses, setResponses] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.jobTitle || !formData.companyName || !formData.jobDescription || !formData.knownLanguages || !formData.technicalSkills || !formData.softSkills) {
            setError("Please fill out all required fields.");
            return false;
        }
        setError('');
        return true;
    };

    const extractQuestions = (data) => {
        return data
            .filter(line => {
                // Match lines that start with numbers followed by a period and space
                // Exclude empty lines, brackets, code blocks, and placeholders like "Type answer here"
                return (
                    /^\d+\.\s+/.test(line) && 
                    !/^[\[\]`]+$/.test(line.trim())
                );
            })
            .map(line => line.replace(/^\d+\.\s+/, '').trim()) // Remove numbering and trim spaces
            .filter(line => line) // Ensure non-empty lines
            .slice(2, -2); // Discard the first two and last two elements
    };
    
    



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post('https://interviewmate-baxj.onrender.com/generate-questions', formData);
            const allQuestions = response.data.questions;
            const filteredQuestions = extractQuestions(allQuestions);
            setQuestions(filteredQuestions);
            setResponses({});
        } catch (error) {
            setError('Error generating questions. Please try again.');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };


    const handleReset = () => {
        setFormData({
            name: '',
            email: '',
            jobTitle: '',
            companyName: '',
            jobDescription: '',
            knownLanguages: '',
            technicalSkills: '',
            softSkills: '',
            hobbies: '',
            achievements: '',
        });
        setQuestions([]);
        setError('');
    };

    const handleAnswerSubmit = async (question, index) => {
        const answer = responses[index]?.answer; // Get the answer from the state
        if (!answer) {
            setError('Please provide an answer before submitting.');
            return;
        }

        try {
            const response = await axios.post('https://interviewmate-baxj.onrender.com/generate-feedback', { question, answer });
            setResponses(prev => ({
                ...prev,
                [index]: {
                    feedback: response.data.feedback // Store feedback only
                }
            }));
        } catch (error) {
            setError('Error submitting answer. Please try again.');
            console.error(error);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="container mt-5">
            <div className="card border-0 shadow rounded">
                <div className="card-body p-5">
                    <p className='fs-4'>Fill all the required info to generate questions.</p>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="name" className="form-label fw-semibold">Name</label>
                                <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} placeholder="Enter Your Name" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="email" className="form-label fw-semibold">Email</label>
                                <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} placeholder="Enter Your Email" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="jobTitle" className="form-label fw-semibold">Job Title</label>
                                <input type="text" className="form-control" id="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Enter Job Title" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="companyName" className="form-label fw-semibold">Company Name</label>
                                <input type="text" className="form-control" id="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter Company Name" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="jobDescription" className="form-label fw-semibold">Job Description</label>
                            <textarea className="form-control" id="jobDescription" value={formData.jobDescription} onChange={handleChange} rows="3" placeholder="Describe the job responsibilities"></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="knownLanguages" className="form-label fw-semibold">Known Languages</label>
                            <input type="text" className="form-control" id="knownLanguages" value={formData.knownLanguages} onChange={handleChange} placeholder="List known languages" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="hobbies" className="form-label fw-semibold">Hobbies (Optional)</label>
                            <input type="text" className="form-control" id="hobbies" value={formData.hobbies} onChange={handleChange} placeholder="List your hobbies" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="technicalSkills" className="form-label fw-semibold">Technical Skills</label>
                            <input type="text" className="form-control" id="technicalSkills" value={formData.technicalSkills} onChange={handleChange} placeholder="List your technical skills" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="softSkills" className="form-label fw-semibold">Soft Skills</label>
                            <input type="text" className="form-control" id="softSkills" value={formData.softSkills} onChange={handleChange} placeholder="List your soft skills" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="achievements" className="form-label fw-semibold">Achievements (Optional)</label>
                            <input type="text" className="form-control" id="achievements" value={formData.achievements} onChange={handleChange} placeholder="List any achievements" />
                        </div>
                        <hr />
                        <button type="submit" className="btn btn-primary mx-2">Generate <RiAiGenerate /></button>
                        <button type="button" className="btn btn-outline-danger" onClick={handleReset}>Reset <GrPowerReset /></button>
                    </form>
                    <div className="print-container">
                        {questions.map((question, index) => (
                            <div className="card mt-3" key={index}>
                                <div className="card-body">
                                    <div className="row">
                                        <p className='fs-6 fw-bold'>{question}</p>
                                        <div className="col-10">
                                            <input
                                                placeholder='Type answer here.'
                                                className='form-control'
                                                type="text"
                                                onChange={(e) => setResponses(prev => ({
                                                    ...prev,
                                                    [index]: { answer: e.target.value } // Update the answer for the specific question index
                                                }))}
                                            />
                                        </div>
                                        <div className="col">
                                            <button
                                                className='btn btn-primary'
                                                onClick={() => handleAnswerSubmit(question, index)} // Pass only the index
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                    {responses[index]?.feedback && (
                                        <div className='mt-3'>
                                            <ReactMarkdown className="bg-light rounded p-3">{responses[index].feedback}</ReactMarkdown>
                                        </div>
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-end">
                        <button
                            className='btn mt-3 text-light btn-lg fw-bold btn-warning'
                            onClick={() => window.print()}
                        >
                            Print
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Prepare;