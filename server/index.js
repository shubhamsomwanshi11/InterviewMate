const express = require('express');
const axios = require('axios');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.get('/getAns', async (req, res) => {
    try {
        const prompt = `
            Generate interview questions and sample answers for the following:
            Name: Shubham
            Qualification: Computer Engineer
            Skills: C, C++, Java, MERN
            Role: Web Developer
            Interview Level: Hard
            Experience: 1 Year
        `;

        const completion = await openai.chat.completions.create({
            model: "babbage-002",
            messages: [
                { role: "user", content: prompt }
            ]
        });

        res.status(200).json(completion.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
