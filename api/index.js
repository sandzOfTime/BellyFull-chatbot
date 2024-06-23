import 'dotenv/config'
import express from 'express';
import bodyParser from 'body-parser';

import MessagingResponse from 'twilio/lib/twiml/MessagingResponse.js';
import { talk } from '../chatbot.js';
import { generateChatSession } from "../prompt.js";


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT;

const chatSession = await generateChatSession();

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

app.post('/bellyfull-chat', async (req, res) => {
    //Grab user message
    const userMessage = req.body.Body;
    const twiml = new MessagingResponse();

    try {
        const chatbotResponse = await talk(chatSession,userMessage);
        //Send back chatbot response
        twiml.message(chatbotResponse);
        res.type('text/xml').send(twiml.toString());
    } catch (error) {
        console.log("We have an error");
        console.log(error);
        twiml.message("Sorry, I am having a bit of trouble at the moment. Can we please have this conversation later?");
        res.type('text/xml').send(twiml.toString());
    }
});


