import 'dotenv/config'
import express from 'express';

import { createClient } from '@supabase/supabase-js'
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse.js';

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();

const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

app.post('/bellyfull-chat', async (req, res) => {
    const twiml = new MessagingResponse();
    twiml.message("Hello! I'm BellyFull, your personal food finder bot. How may I assist?");
    res.type('text/xml').send(twiml.toString());
});

