const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config(); // Load environment variables from .env file

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const app = express();
const port = process.env.PORT || 3000;

// Use only one JSON parsing middleware
app.use(express.json());  
app.use(cors());

// API endpoint to handle user input and generate interview questions
app.post('/generate-questions', async (req, res) => {
  const { jobTitle, companyInfo, jobDescription, experience, focusArea, qualifications, skills, hobbies, competencies } = req.body;

  // Double-check for missing fields
  if (!jobTitle || !jobDescription || !experience || !qualifications || !skills) {
    return res.status(400).json({ error: 'Missing required fields in request body' });
  }

  // Build the prompt based on the new data structure
  const prompt = `Generate interview questions for a ${jobTitle} candidate at ${companyInfo} with ${qualifications} and ${skills}. The candidate has ${experience} years of experience and their focus area is ${focusArea}. They mentioned ${hobbies} as hobbies and ${competencies} as competencies. Generate questions at a moderate difficulty level.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.candidates[0].content.parts[0].text;
    res.json({ text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate questions' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
