const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config(); // Load environment variables from .env file

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

const app = express();
const port = process.env.PORT || 3000;

// Use only one JSON parsing middleware
app.use(express.json());
app.use(cors());

// API endpoint to handle user input and generate interview questions
app.post('/generate-questions', async (req, res) => {
  const { name, email, jobTitle, companyName, jobDescription, knownLanguages, technicalSkills, softSkills, hobbies, achievements } = req.body;

  // Double-check for missing required fields
  if (!name || !email || !jobTitle || !companyName || !jobDescription || !knownLanguages || !technicalSkills || !softSkills) {
    return res.status(400).json({ error: 'Missing required fields in request body' });
  }

  // Build the prompt based on the new data structure
  const prompt = `Generate interview questions for ${name}, applying for a ${jobTitle} position at ${companyName}. 
  The candidate's job description involves ${jobDescription}. They are proficient in ${knownLanguages} languages, have technical skills in ${technicalSkills}, and soft skills in ${softSkills}. 
  ${hobbies ? `Their hobbies include ${hobbies}.` : ''} 
  ${achievements ? `They have achieved the following: ${achievements}.` : ''} 
  Generate questions focusing on their technical and soft skills, and the job description provided. Format the questions in the form of an array.`;

  try {
    const result = await model.generateContent(prompt);
    // Assuming the result is a string of questions separated by newlines
    const text = result.response.candidates[0].content.parts[0].text;

    // Split the text by newlines or other delimiters to form an array
    const questionsArray = text.split('\n').filter(q => q.trim() !== '');

    res.json({ questions: questionsArray });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate questions' });
  }
});

app.post('/generate-feedback', async (req, res) => {
  const { question, answer } = req.body;

  // Double-check for missing fields
  if (!question) {
    return res.status(400).json({ error: 'Missing question field in request body' });
  }

  if (!answer) {
    return res.status(400).json({ error: 'Missing answer field in request body' });
  }

  // Build the prompt for feedback generation
  const prompt = `The candidate has given the following answer for the question "${question}". Provide constructive feedback for the following answer: "${answer}". Highlight strengths and areas of improvement, with specific examples.`;

  try {
    const result = await model.generateContent(prompt);
    const feedback = result.response.candidates[0].content.parts[0].text;
    res.json({ feedback });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate feedback' });
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
