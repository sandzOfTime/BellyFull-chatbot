import { createClient } from '@supabase/supabase-js'
  
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

export const getMeals = async () => {
    const { data: restaurantMeals, error } = await supabase
    .from('Restaurants')
    .select('name, address, openingHours, Meals (main, sides, price)')

    if (error) {
     console.log(error);
    }
    return restaurantMeals;
}

export const getChatHistory = async (phoneNumber) => {
    const { data: chatHistory, error } = await supabase
    .from('ChatHistory')
    .select('chat')
    .eq('phoneNumber', phoneNumber)

    if (error) {
     console.log(error);
    }
    return chatHistory;
}

export const saveChatHistory = async (phoneNumber, chat) => {

    const chatHistory = await getChatHistory(phoneNumber);

    if (chatHistory.length > 0) {
        const { data, error } = await supabase
        .from('ChatHistory')
        .update({ chat })
        .eq('phoneNumber', phoneNumber)

        if (error) {
         console.log(error);
        }
        console.log("Updating data", data);
        return data;
    }

    const { data, error } = await supabase
    .from('ChatHistory')
    .insert([{ phoneNumber, chat }])

    if (error) {
     console.log(error);
    }
    console.log("Inserting data", data);
    return data;
}
