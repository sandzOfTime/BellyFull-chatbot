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
