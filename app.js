const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();
const port = 5500;

// Set your OpenAI GPT-3 API key
const  openai = new OpenAI( { apiKey: "sk-PDCcEDIK1d1uGqfDEH6CT3BlbkFJQoYrfybH7HCf2gG6jgb"});
app.use(bodyParser.json());

app.post('/get-user-feelings', async (req, res) => {
    const user_input = req.body.userInput;

    // Set up the prompt for GPT-3
    const prompt = `User is feeling: ${user_input}. AI, how should I respond?`;

    try {
        // Call OpenAI API to generate a response
        const response = await openai.complete({
            engine: 'text-davinci-003',
            prompt,
            max_tokens: 50,
        });

        // Extract and send the AI-generated response
        const aiResponse = response.choices[0].text.trim();
        res.json({ aiResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
