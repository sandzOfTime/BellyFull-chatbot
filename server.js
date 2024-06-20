import 'dotenv/config'
import express from 'express';
import bodyParser from 'body-parser';

import MessagingResponse from 'twilio/lib/twiml/MessagingResponse.js';
import { talk } from './chatbot.js';


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

app.post('/bellyfull-chat', async (req, res) => {
    //Grab user message
    const userMessage = req.body.Body;

    try {
        const chatbotResponse = await talk(userMessage);
        const twiml = new MessagingResponse();
        //Send back chatbot response
        twiml.message(chatbotResponse);
        res.type('text/xml').send(twiml.toString());
    } catch (error) {
        console.log(error);
        return res.type('text/xml').send("Sorry, I am having a bit of trouble at the moment. Can we please have this conversation later?");
    }
});

