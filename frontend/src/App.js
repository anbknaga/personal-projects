import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // States for form selections
  const [mealType, setMealType] = useState("");
  const [dietType, setDietType] = useState("veg"); // Default to veg
  const [timeRange, setTimeRange] = useState([]); // Multiple time ranges can be selected
  const [recommendations, setRecommendations] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [foodImages, setFoodImages] = useState({});

  // Recipe database
  const recipeDatabase = [
    // PRE-BREAKFAST - VEG - INDIAN
    {
      id: 1,
      name: "Masala Chai",
      description: "A traditional Indian spiced tea that's the perfect way to start your day.",
      mealType: "Pre-breakfast",
      dietType: "veg",
      cuisine: "Indian",
      timeToMake: "<10 mins",
      recipe: "1. Boil 1 cup water with 1 inch ginger, 2-3 cardamom pods, 1 cinnamon stick, and 2-3 cloves.\n2. Add 1 tbsp tea leaves and let it simmer for 2 minutes.\n3. Add 1 cup milk and boil until the chai reaches desired consistency.\n4. Strain and add sugar to taste. Serve hot."
    },
    {
      id: 2,
      name: "Soaked Almonds",
      description: "Nutrient-rich soaked almonds are excellent for brain health and digestion.",
      mealType: "Pre-breakfast",
      dietType: "veg",
      cuisine: "Indian",
      timeToMake: "<10 mins",
      recipe: "1. Soak 10-12 almonds in water overnight.\n2. Peel the skin off in the morning.\n3. Consume on an empty stomach for maximum benefits."
    },
    {
      id: 3, 
      name: "Lemon and Honey Water",
      description: "A detoxifying morning drink that aids digestion and boosts immunity.",
      mealType: "Pre-breakfast",
      dietType: "veg",
      cuisine: "Indian",
      timeToMake: "<10 mins",
      recipe: "1. Heat 1 cup of water until warm (not boiling).\n2. Squeeze half a lemon into it.\n3. Add 1 tbsp of honey and stir well.\n4. Drink while still warm."
    },
    {
      id: 4,
      name: "Fruit Smoothie",
      description: "A refreshing and nutritious blend of fruits to kickstart your day.",
      mealType: "Pre-breakfast",
      dietType: "veg",
      cuisine: "International",
      timeToMake: "<10 mins",
      recipe: "1. Add 1 banana, 1/2 cup strawberries, and 1/2 cup mango to a blender.\n2. Pour in 1 cup milk or yogurt.\n3. Add 1 tbsp honey (optional).\n4. Blend until smooth and serve immediately."
    },

    // BREAKFAST - VEG - INDIAN
    {
      id: 5,
      name: "Aloo Paratha",
      description: "Stuffed Indian flatbread with spiced potato filling, a hearty breakfast option.",
      mealType: "Breakfast",
      dietType: "veg",
      cuisine: "Indian",
      timeToMake: "20+ mins",
      recipe: "1. Boil 3 potatoes, peel and mash them.\n2. Add chopped green chilies, grated ginger, chopped coriander, cumin powder, garam masala, and salt to the mashed potatoes.\n3. Knead wheat flour with water to make a soft dough.\n4. Take a small portion of dough, roll it, stuff with potato mixture, and seal edges.\n5. Roll again gently to make a paratha.\n6. Cook on a hot tawa with ghee or oil until golden brown on both sides.\n7. Serve hot with yogurt or pickle."
    },
    {
      id: 6,
      name: "Idli Sambar",
      description: "Soft steamed rice cakes served with lentil soup, a South Indian breakfast staple.",
      mealType: "Breakfast",
      dietType: "veg",
      cuisine: "Indian",
      timeToMake: "20+ mins",
      recipe: "For Idli:\n1. Soak 2 cups rice and 1 cup urad dal separately for 4-5 hours.\n2. Grind them to a smooth batter and ferment overnight.\n3. Pour batter into idli molds and steam for 10-12 minutes.\n\nFor Sambar:\n1. Cook 1/2 cup toor dal until soft.\n2. In a pan, add 1 chopped onion, 1 tomato, and mixed vegetables.\n3. Add tamarind extract, sambar powder, turmeric, and salt.\n4. Temper with mustard seeds, curry leaves, and asafoetida.\n5. Serve idlis with hot sambar."
    },
    {
      id: 7,
      name: "Poha",
      description: "Flattened rice flakes cooked with spices and vegetables, a light and nutritious breakfast.",
      mealType: "Breakfast",
      dietType: "veg",
      cuisine: "Indian",
      timeToMake: "11-20mins",
      recipe: "1. Rinse 2 cups of poha (flattened rice) under water and drain. Keep aside for 5 minutes.\n2. Heat 2 tbsp oil in a pan, add 1 tsp mustard seeds and let them splutter.\n3. Add 1 chopped onion, 1-2 green chilies, and curry leaves.\n4. Add 1/2 cup peas, 1 boiled potato (cubed), turmeric powder, and salt.\n5. Add the soaked poha and mix well.\n6. Garnish with fresh coriander, grated coconut, and lemon juice.\n7. Serve hot."
    },
    {
      id: 8,
      name: "Masala Dosa",
      description: "Crispy rice and lentil crepe filled with spiced potato, served with chutney.",
      mealType: "Breakfast",
      dietType: "veg",
      cuisine: "Indian",
      timeToMake: "20+ mins",
      recipe: "For Dosa Batter:\n1. Soak 3 cups rice and 1 cup urad dal for 4-5 hours.\n2. Grind to a smooth batter and ferment overnight.\n\nFor Potato Filling:\n1. Boil 4 potatoes, peel and mash them.\n2. Sauté 1 onion, curry leaves, green chilies, turmeric, and mustard seeds.\n3. Add mashed potatoes and salt, mix well.\n\nFor Dosa:\n1. Heat a non-stick pan, pour a ladle of batter and spread in a circular motion.\n2. Drizzle oil around the edges, cook until golden brown.\n3. Place potato filling in the center, fold and serve with coconut chutney and sambar."
    },
    {
      id: 9,
      name: "Besan Chilla",
      description: "Savory gram flour pancakes with vegetables, a protein-rich breakfast option.",
      mealType: "Breakfast",
      dietType: "veg",
      cuisine: "Indian",
      timeToMake: "<10 mins",
      recipe: "1. Mix 1 cup besan (gram flour) with water to make a smooth batter.\n2. Add 1 chopped onion, 1 chopped tomato, 1-2 green chilies, grated ginger, cumin powder, turmeric, and salt.\n3. Heat a non-stick pan, pour a ladle of batter and spread in a circular motion.\n4. Drizzle oil around the edges, cook until golden brown on both sides.\n5. Serve hot with mint chutney."
    },

    // BREAKFAST - NON-VEG - INDIAN
    {
      id: 10,
      name: "Egg Bhurji with Paratha",
      description: "Indian-style scrambled eggs with spices, served with flatbread.",
      mealType: "Breakfast",
      dietType: "non-veg",
      cuisine: "Indian",
      timeToMake: "11-20mins",
      recipe: "For Egg Bhurji:\n1. Heat 2 tbsp oil in a pan, add 1 chopped onion and sauté until golden.\n2. Add 1 chopped tomato, 1-2 green chilies, grated ginger, turmeric, red chili powder, and salt.\n3. Beat 4 eggs and pour into the pan.\n4. Stir continuously until the eggs are scrambled and cooked.\n5. Garnish with fresh coriander.\n\nServe hot with paratha or bread."
    },
    {
      id: 11,
      name: "Keema Paratha",
      description: "Flatbread stuffed with spiced minced meat, a protein-packed breakfast.",
      mealType: "Breakfast",
      dietType: "non-veg",
      cuisine: "Indian",
      timeToMake: "20+ mins",
      recipe: "For Keema Filling:\n1. Heat oil, add 1 chopped onion and sauté until golden.\n2. Add 1 tbsp ginger-garlic paste, 1 chopped tomato, and green chilies.\n3. Add turmeric, red chili powder, coriander powder, garam masala, and salt.\n4. Add 250g minced meat (chicken/mutton) and cook until done.\n\nFor Paratha:\n1. Make a soft dough with wheat flour and water.\n2. Take a small portion, roll it, stuff with keema filling, and seal edges.\n3. Roll again and cook on a hot tawa with ghee until golden on both sides.\n4. Serve hot with yogurt or pickle."
    },

    // LUNCH - VEG - INDIAN
    {
      id: 12,
      name: "Dal Tadka with Jeera Rice",
      description: "Yellow lentils tempered with spices, served with cumin-flavored rice.",
      mealType: "Lunch",
      dietType: "veg",
      cuisine: "Indian",
      timeToMake: "20+ mins",
      recipe: "For Dal Tadka:\n1. Wash and pressure cook 1 cup toor dal with turmeric and salt.\n2. In a pan, heat 2 tbsp ghee, add cumin seeds, asafoetida, chopped garlic, dried red chilies.\n3. Add this tempering to the cooked dal along with lemon juice and coriander.\n\nFor Jeera Rice:\n1. Rinse 1 cup basmati rice and soak for 30 minutes.\n2. Heat 1 tbsp ghee, add cumin seeds, bay leaf, and soaked rice.\n3. Add 2 cups water and salt, cook until done.\n\nServe hot dal with jeera rice."
    },
    {
      id: 13,
      name: "Chole Bhature",
      description: "Spiced chickpea curry served with deep-fried bread, a North Indian specialty.",
      mealType: "Lunch",
      dietType: "veg",
      cuisine: "Indian",
      timeToMake: "20+ mins",
      recipe: "For Chole:\n1. Soak 2 cups chickpeas overnight and pressure cook with salt.\n2. In a pan, heat oil, add chopped onions and sauté until golden.\n3. Add ginger-garlic paste, chopped tomatoes, green chilies, and spices.\n4. Add cooked chickpeas and simmer for 15-20 minutes.\n\nFor Bhature:\n1. Make a soft dough with all-purpose flour, yogurt, oil, and a pinch of baking soda.\n2. Rest the dough for 2-3 hours.\n3. Roll into oval shapes and deep fry until puffed and golden.\n\nServe hot chole with bhature."
    },
    {
      id: 14,
      name: "Vegetable Biryani",
      description: "Fragrant rice cooked with mixed vegetables and aromatic spices.",
      mealType: "Lunch",
      dietType: "veg",
      cuisine: "Indian",
      timeToMake: "20+ mins",
      recipe: "1. Soak 2 cups basmati rice for 30 minutes.\n2. In a pot, heat 3 tbsp ghee, add whole spices (bay leaf, cinnamon, cardamom, cloves).\n3. Add 1 sliced onion and sauté until golden.\n4. Add 1 tbsp ginger-garlic paste, chopped vegetables (carrot, beans, peas, cauliflower).\n5. Add turmeric, red chili powder, coriander powder, garam masala, and salt.\n6. Add soaked rice, 4 cups water, and cook until done.\n7. Garnish with fresh coriander, mint, and fried onions.\n8. Serve hot with raita."
    },
    {
      id: 15,
      name: "Rajma Chawal",
      description: "Kidney bean curry served with steamed rice, a comfort food in North India.",
      mealType: "Lunch",
      dietType: "veg",
      cuisine: "Indian",
      timeToMake: "20+ mins",
      recipe: "For Rajma:\n1. Soak 2 cups kidney beans overnight and pressure cook with salt.\n2. In a pan, heat oil, add chopped onions and sauté until golden.\n3. Add ginger-garlic paste, chopped tomatoes, green chilies, and spices.\n4. Add cooked kidney beans and simmer for 15-20 minutes.\n\nFor Rice:\n1. Rinse 2 cups basmati rice and cook with 4 cups water and salt.\n\nServe hot rajma with steamed rice."
    },

    // LUNCH - NON-VEG - INDIAN
    {
      id: 16,
      name: "Butter Chicken",
      description: "Tender chicken cooked in a creamy tomato-based sauce, a popular North Indian dish.",
      mealType: "Lunch",
      dietType: "non-veg",
      cuisine: "Indian",
      timeToMake: "20+ mins",
      recipe: "1. Marinate 500g chicken pieces in yogurt, ginger-garlic paste, lemon juice, and spices for 2-3 hours.\n2. Grill or tandoor the chicken until partially cooked.\n3. In a pan, heat butter, add chopped onions and sauté until golden.\n4. Add tomato puree, red chili powder, garam masala, and salt.\n5. Add grilled chicken pieces and simmer for 15-20 minutes.\n6. Add fresh cream and kasuri methi, cook for another 5 minutes.\n7. Serve hot with naan or rice."
    },
    {
      id: 17,
      name: "Chicken Biryani",
      description: "Aromatic rice dish cooked with spiced chicken, a festive meal.",
      mealType: "Lunch",
      dietType: "non-veg",
      cuisine: "Indian",
      timeToMake: "20+ mins",
      recipe: "1. Marinate 500g chicken pieces in yogurt, ginger-garlic paste, lemon juice, and spices for 1 hour.\n2. Soak 2 cups basmati rice for 30 minutes.\n3. In a pot, heat ghee, add whole spices, sliced onions, and sauté until golden.\n4. Add marinated chicken and cook until partially done.\n5. Layer partially cooked rice over chicken, sprinkle saffron milk and fried onions.\n6. Cover with a tight lid and cook on low heat for 20-25 minutes.\n7. Gently mix and serve hot with raita."
    },

    // EVENING SNACKS - VEG - INDIAN
    {
      id: 18,
      name: "Samosa",
      description: "Crispy pastry filled with spiced potatoes and peas, a popular Indian snack.",
      mealType: "Evening Snacks",
      dietType: "veg",
      cuisine: "Indian",
      timeToMake: "20+ mins",
      recipe: "For Dough:\n1. Mix 2 cups all-purpose flour, 1/4 cup oil, salt, and water to make a stiff dough.\n2. Rest for 30 minutes.\n\nFor Filling:\n1. Heat oil, add cumin seeds, chopped ginger, green chilies, and sauté.\n2. Add boiled, mashed potatoes, peas, coriander powder, garam masala, amchur powder, and salt.\n3. Cool the filling.\n\nFor Samosa:\n1. Roll dough into circles, cut into halves.\n2. Form cones, fill with potato mixture, and seal edges.\n3. Deep fry until golden brown.\n4. Serve hot with mint chutney."
    },
    {
      id: 19,
      name: "Paneer Pakora",
      description: "Cottage cheese fritters dipped in spiced gram flour batter and deep-fried.",
      mealType: "Evening Snacks",
      dietType: "veg",
      cuisine: "Indian",
      timeToMake: "11-20mins",
      recipe: "1. Cut 200g paneer into triangles or rectangles.\n2. Make a batter with 1 cup besan (gram flour), turmeric, red chili powder, ajwain, and salt.\n3. Dip paneer pieces in the batter and deep fry until golden brown.\n4. Serve hot with mint chutney or ketchup."
    },
    {
      id: 20,
      name: "Masala Vada",
      description: "Spicy lentil fritters, a popular South Indian snack.",
      mealType: "Evening Snacks",
      dietType: "veg",
      cuisine: "Indian",
      timeToMake: "11-20mins",
      recipe: "1. Soak 1 cup chana dal for 2-3 hours.\n2. Grind coarsely with chopped onions, green chilies, ginger, curry leaves, and coriander leaves.\n3. Add cumin powder, fennel seeds, and salt.\n4. Shape into small patties and deep fry until golden brown.\n5. Serve hot with coconut chutney."
    },
    {
      id: 21,
      name: "Bhel Puri",
      description: "A savory, tangy snack made with puffed rice, vegetables, and chutneys.",
      mealType: "Evening Snacks",
      dietType: "veg",
      cuisine: "Indian",
      timeToMake: "<10 mins",
      recipe: "1. In a bowl, add 2 cups puffed rice, 1 chopped onion, 1 chopped tomato, boiled potatoes, chopped coriander, and sev.\n2. Add tamarind chutney, mint chutney, chaat masala, and salt.\n3. Mix well and serve immediately."
    },
    {
      id: 22,
      name: "Aloo Tikki",
      description: "Crispy potato patties spiced with herbs and spices, a popular street food.",
      mealType: "Evening Snacks",
      dietType: "veg",
      cuisine: "Indian",
      timeToMake: "11-20mins",
      recipe: "1. Boil 4 potatoes, peel and mash them.\n2. Add chopped green chilies, ginger, coriander leaves, cumin powder, garam masala, and salt.\n3. Shape into round patties.\n4. Shallow fry on a hot tawa until golden brown on both sides.\n5. Serve hot with yogurt, tamarind chutney, and mint chutney."
    },

    // EVENING SNACKS - NON-VEG - INDIAN
    {
      id: 23,
      name: "Chicken 65",
      description: "Spicy, deep-fried chicken nuggets, a popular South Indian appetizer.",
      mealType: "Evening Snacks",
      dietType: "non-veg",
      cuisine: "Indian",
      timeToMake: "11-20mins",
      recipe: "1. Marinate 500g boneless chicken pieces in yogurt, ginger-garlic paste, red chili powder, turmeric, garam masala, and salt for 1 hour.\n2. Deep fry until golden and crispy.\n3. In a pan, heat oil, add chopped garlic, curry leaves, and green chilies.\n4. Add fried chicken pieces and toss well.\n5. Garnish with coriander leaves and serve hot."
    },
    {
      id: 24,
      name: "Keema Pav",
      description: "Spiced minced meat served with soft bread rolls, a Mumbai street food.",
      mealType: "Evening Snacks",
      dietType: "non-veg",
      cuisine: "Indian",
      timeToMake: "20+ mins",
      recipe: "1. Heat oil in a pan, add chopped onions and sauté until golden.\n2. Add ginger-garlic paste, chopped tomatoes, green chilies, and spices.\n3. Add 500g minced meat (chicken/mutton) and cook until done.\n4. Garnish with coriander leaves.\n5. Serve hot with butter-toasted pav (bread rolls)."
    },

    // DINNER - VEG - INDIAN
    {
      id: 25,
      name: "Paneer Butter Masala",
      description: "Cottage cheese cubes in a rich, creamy tomato sauce, a restaurant favorite.",
      mealType: "Dinner",
      dietType: "veg",
      cuisine: "Indian",
      timeToMake: "20+ mins",
      recipe: "1. Heat 2 tbsp butter, add 1 chopped onion and sauté until golden.\n2. Add 1 tbsp ginger-garlic paste and cook for a minute.\n3. Add 2 chopped tomatoes and cook until soft.\n4. Cool and blend into a smooth paste.\n5. In the same pan, add the paste, red chili powder, coriander powder, garam masala, and salt.\n6. Add 250g paneer cubes and simmer for 5-7 minutes.\n7. Add fresh cream and kasuri methi, cook for another 2 minutes.\n8. Serve hot with naan or roti."
    },
    {
      id: 26,
      name: "Malai Kofta",
      description: "Deep-fried potato and cheese dumplings in a creamy sauce, a festive dish.",
      mealType: "Dinner",
      dietType: "veg",
      cuisine: "Indian",
      timeToMake: "20+ mins",
      recipe: "For Kofta:\n1. Mix 2 boiled, mashed potatoes, 1 cup grated paneer, chopped green chilies, ginger, coriander, cornflour, and salt.\n2. Shape into round balls and deep fry until golden.\n\nFor Gravy:\n1. Blend 2 onions, 3 tomatoes, cashews, and ginger-garlic paste.\n2. Heat butter, add the paste and cook until oil separates.\n3. Add red chili powder, coriander powder, garam masala, and salt.\n4. Add water to adjust consistency, then add fresh cream.\n5. Add fried koftas just before serving.\n\nServe hot with naan or rice."
    },
    {
      id: 27,
      name: "Baingan Bharta",
      description: "Smoky, mashed eggplant cooked with spices, a North Indian delicacy.",
      mealType: "Dinner",
      dietType: "veg",
      cuisine: "Indian",
      timeToMake: "20+ mins",
      recipe: "1. Roast 1 large eggplant directly on flame until skin is charred and flesh is soft.\n2. Peel off the skin and mash the flesh.\n3. Heat oil in a pan, add chopped onions and sauté until golden.\n4. Add ginger-garlic paste, chopped tomatoes, green chilies, and spices.\n5. Add mashed eggplant and cook for 10-15 minutes.\n6. Garnish with fresh coriander.\n7. Serve hot with roti or paratha."
    },
    {
      id: 28,
      name: "Vegetable Korma",
      description: "Mixed vegetables in a rich, creamy, nutty sauce, a Mughlai dish.",
      mealType: "Dinner",
      dietType: "veg",
      cuisine: "Indian",
      timeToMake: "20+ mins",
      recipe: "1. Boil mixed vegetables (carrot, beans, peas, potato, cauliflower) until partially cooked.\n2. Blend 1 onion, 1 tomato, 2 tbsp cashews, and ginger-garlic paste into a smooth paste.\n3. Heat oil in a pan, add the paste and cook until oil separates.\n4. Add red chili powder, coriander powder, garam masala, and salt.\n5. Add boiled vegetables and cook for 5-7 minutes.\n6. Add fresh cream and cook for another 2 minutes.\n7. Serve hot with naan or rice."
    },

    // DINNER - NON-VEG - INDIAN
    {
      id: 29,
      name: "Chicken Curry",
      description: "Chicken cooked in a flavorful onion-tomato gravy with spices.",
      mealType: "Dinner",
      dietType: "non-veg",
      cuisine: "Indian",
      timeToMake: "20+ mins",
      recipe: "1. Heat oil in a pan, add chopped onions and sauté until golden.\n2. Add ginger-garlic paste, chopped tomatoes, green chilies, and spices.\n3. Add 500g chicken pieces and cook until partially done.\n4. Add water and simmer until chicken is fully cooked and gravy thickens.\n5. Garnish with fresh coriander.\n6. Serve hot with rice or roti."
    },
    {
      id: 30,
      name: "Fish Curry",
      description: "Fish cooked in a tangy, spicy gravy, a coastal Indian specialty.",
      mealType: "Dinner",
      dietType: "non-veg",
      cuisine: "Indian",
      timeToMake: "20+ mins",
      recipe: "1. Marinate 500g fish pieces in turmeric and salt for 15 minutes.\n2. Heat oil in a pan, add mustard seeds, curry leaves, and chopped garlic.\n3. Add chopped onions and sauté until golden.\n4. Add chopped tomatoes, green chilies, and spices.\n5. Add water and bring to a boil.\n6. Add marinated fish pieces and simmer until cooked.\n7. Add tamarind pulp for tanginess.\n8. Garnish with fresh coriander.\n9. Serve hot with rice."
    },

    // Additional recipes to ensure variety
    // BREAKFAST - VEG - INTERNATIONAL
    {
      id: 31,
      name: "Avocado Toast",
      description: "A quick, nutritious breakfast with mashed avocado on toasted bread.",
      mealType: "Breakfast",
      dietType: "veg",
      cuisine: "International",
      timeToMake: "<10 mins",
      recipe: "1. Toast 2 slices of bread until crispy.\n2. Mash 1 ripe avocado with a fork.\n3. Add salt, pepper, and lemon juice to taste.\n4. Spread the mashed avocado on the toast.\n5. Top with cherry tomatoes, microgreens, or a poached egg (optional).\n6. Sprinkle with red pepper flakes or everything bagel seasoning."
    },

    // LUNCH - VEG - INTERNATIONAL
    {
      id: 32,
      name: "Pasta Primavera",
      description: "Pasta with fresh spring vegetables in a light sauce.",
      mealType: "Lunch",
      dietType: "veg",
      cuisine: "International",
      timeToMake: "11-20mins",
      recipe: "1. Cook 250g pasta according to package instructions.\n2. In a large pan, heat olive oil and sauté 1 chopped onion and 2 minced garlic cloves.\n3. Add chopped bell peppers, zucchini, broccoli, and cherry tomatoes.\n4. Season with salt, pepper, Italian herbs, and red pepper flakes.\n5. Add cooked pasta and a splash of pasta water.\n6. Add grated Parmesan cheese and fresh herbs.\n7. Serve hot."
    },

    // EVENING SNACKS - VEG - INTERNATIONAL
    {
      id: 33,
      name: "Hummus with Pita Chips",
      description: "Creamy chickpea dip served with crispy pita bread, a Middle Eastern appetizer.",
      mealType: "Evening Snacks",
      dietType: "veg",
      cuisine: "International",
      timeToMake: "11-20mins",
      recipe: "For Hummus:\n1. Blend 1 can of chickpeas, 2 tbsp tahini, 2 cloves garlic, 2 tbsp lemon juice, salt, and olive oil until smooth.\n2. Add water if needed to adjust consistency.\n\nFor Pita Chips:\n1. Cut pita bread into triangles.\n2. Brush with olive oil, sprinkle with salt and herbs.\n3. Bake at 375°F for 10 minutes until crispy.\n\nServe hummus with pita chips."
    },

    // DINNER - VEG - INTERNATIONAL
    {
      id: 34,
      name: "Vegetable Stir Fry",
      description: "Colorful vegetables stir-fried with soy sauce and served with rice.",
      mealType: "Dinner",
      dietType: "veg",
      cuisine: "International",
      timeToMake: "11-20mins",
      recipe: "1. Heat oil in a wok, add 2 minced garlic cloves and 1 inch grated ginger.\n2. Add chopped vegetables (bell peppers, carrots, broccoli, snap peas, mushrooms).\n3. Stir-fry on high heat for 5-7 minutes until crisp-tender.\n4. Add 2 tbsp soy sauce, 1 tbsp vinegar, 1 tsp honey, and red pepper flakes.\n5. Toss well and garnish with sesame seeds and green onions.\n6. Serve hot with steamed rice."
    },

    // PRE-BREAKFAST - NON-VEG - INTERNATIONAL
    {
      id: 35,
      name: "Protein Smoothie",
      description: "A protein-packed smoothie with Greek yogurt and berries, perfect to kickstart your day.",
      mealType: "Pre-breakfast",
      dietType: "non-veg",
      cuisine: "International",
      timeToMake: "<10 mins",
      recipe: "1. Add 1 cup Greek yogurt, 1 banana, 1/2 cup mixed berries, and 1 tbsp honey to a blender.\n2. Add 1 scoop protein powder (optional).\n3. Blend until smooth and serve immediately."
    },

    // LUNCH - NON-VEG - INTERNATIONAL
    {
      id: 36,
      name: "Grilled Chicken Salad",
      description: "Grilled chicken breast with mixed greens and vegetables, a healthy lunch option.",
      mealType: "Lunch",
      dietType: "non-veg",
      cuisine: "International",
      timeToMake: "11-20mins",
      recipe: "1. Season 1 chicken breast with salt, pepper, and Italian herbs.\n2. Grill until fully cooked and slice thinly.\n3. In a bowl, add mixed greens, cherry tomatoes, cucumber, bell peppers, and avocado.\n4. Top with grilled chicken slices.\n5. Drizzle with olive oil, balsamic vinegar, salt, and pepper.\n6. Toss and serve."
    },

    // EVENING SNACKS - NON-VEG - INTERNATIONAL
    {
      id: 37,
      name: "Chicken Wings",
      description: "Crispy, spicy chicken wings, perfect for snacking.",
      mealType: "Evening Snacks",
      dietType: "non-veg",
      cuisine: "International",
      timeToMake: "20+ mins",
      recipe: "1. Marinate 500g chicken wings in a mixture of hot sauce, garlic powder, salt, and pepper for 30 minutes.\n2. Preheat oven to 400°F.\n3. Place wings on a baking sheet lined with parchment paper.\n4. Bake for 45-50 minutes until crispy and cooked through.\n5. Toss in additional hot sauce if desired.\n6. Serve with blue cheese or ranch dressing and celery sticks."
    },

    // DINNER - NON-VEG - INTERNATIONAL
    {
      id: 38,
      name: "Beef Stroganoff",
      description: "Tender beef strips in a creamy mushroom sauce, served with pasta.",
      mealType: "Dinner",
      dietType: "non-veg",
      cuisine: "International",
      timeToMake: "20+ mins",
      recipe: "1. Season 500g beef strips with salt and pepper.\n2. Heat oil in a pan, sear beef until browned, then set aside.\n3. In the same pan, sauté 1 chopped onion and 2 cups sliced mushrooms until soft.\n4. Add 2 minced garlic cloves and cook for a minute.\n5. Add 1 tbsp flour and cook for 1-2 minutes.\n6. Add 1 cup beef broth and 1 tbsp Worcestershire sauce, simmer until thickened.\n7. Reduce heat, add 1/2 cup sour cream, then return beef to the pan.\n8. Serve hot over cooked egg noodles or rice."
    }
  ];

  // Fetch food images when the app loads
  useEffect(() => {
    const fetchFoodImages = async () => {
      const imageMapping = {};
      
      // Categories in Foodish API
      const categories = ['burger', 'pizza', 'pasta', 'rice', 'dessert', 'biryani', 'dosa', 'idly', 'samosa', 'paneer'];
      
      // Match some specific recipes with appropriate categories
      const recipeToCategory = {
        'Masala Chai': 'tea',
        'Aloo Paratha': 'paratha',
        'Idli Sambar': 'idly',
        'Poha': 'rice',
        'Masala Dosa': 'dosa',
        'Samosa': 'samosa',
        'Paneer Pakora': 'paneer',
        'Vegetable Biryani': 'biryani',
        'Chicken Biryani': 'biryani',
        'Butter Chicken': 'chicken',
        'Paneer Butter Masala': 'paneer',
        'Pasta Primavera': 'pasta',
        'Beef Stroganoff': 'rice',
        'Avocado Toast': 'toast',
      };
      
      // For each recipe in our database, fetch a matching image
      for (const recipe of recipeDatabase) {
        try {
          // Determine the category for this recipe
          let category = recipeToCategory[recipe.name];
          
          // If no specific mapping, choose a category based on keywords in name or description
          if (!category) {
            for (const cat of categories) {
              if (recipe.name.toLowerCase().includes(cat) || recipe.description.toLowerCase().includes(cat)) {
                category = cat;
                break;
              }
            }
          }
          
          // Default to 'rice' if no category matched
          category = category || (recipe.dietType === 'non-veg' ? 'chicken' : 'rice');
          
          // API URL based on category
          let apiUrl = 'https://foodish-api.com/api';
          if (category) {
            apiUrl = `https://foodish-api.com/api/images/${category}`;
          }
          
          // Fetch image
          const response = await fetch(apiUrl);
          const data = await response.json();
          
          // Store the image URL
          imageMapping[recipe.id] = data.image;
        } catch (error) {
          console.error(`Error fetching image for ${recipe.name}:`, error);
          // Use a placeholder image if fetch fails
          imageMapping[recipe.id] = `https://via.placeholder.com/300x200?text=${encodeURIComponent(recipe.name)}`;
        }
      }
      
      setFoodImages(imageMapping);
    };
    
    fetchFoodImages();
  }, []);

  // Filter recipes based on user selections and search query
  useEffect(() => {
    if (mealType || searchQuery) {
      setIsLoading(true);
      
      // Filter recipes based on selection
      let filtered = recipeDatabase.filter(recipe => {
        // If search query is provided, filter by it
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const matchesSearch = 
            recipe.name.toLowerCase().includes(query) || 
            recipe.description.toLowerCase().includes(query) ||
            recipe.cuisine.toLowerCase().includes(query) ||
            recipe.mealType.toLowerCase().includes(query);
          
          if (!matchesSearch) return false;
        }
        
        // If meal type is selected, filter by it
        if (mealType && recipe.mealType !== mealType) return false;
        
        // Match diet type
        if (dietType && recipe.dietType !== dietType) return false;
        
        // Match time range if selected
        if (timeRange.length > 0 && !timeRange.includes(recipe.timeToMake)) return false;
        
        return true;
      });

      // If we have results and using filters (not just search), limit to 5 and randomize
      if (filtered.length > 0 && mealType && !searchQuery) {
        // Shuffle array
        filtered = filtered.sort(() => 0.5 - Math.random());
        // Get sub-array of first 5 elements after shuffled
        filtered = filtered.slice(0, 5);
      }
      
      setRecommendations(filtered);
      setIsLoading(false);
    } else {
      setRecommendations([]);
    }
  }, [mealType, dietType, timeRange, searchQuery]);

  // Get a new surprise dish
  const getSurpriseDish = () => {
    setIsLoading(true);
    // Filter all recipes that match the current criteria but exclude the currently selected one
    let eligible = recipeDatabase.filter(recipe => 
      recipe.mealType === mealType && 
      recipe.dietType === dietType && 
      (timeRange.length === 0 || timeRange.includes(recipe.timeToMake)) &&
      recipe.id !== selectedRecipe.id
    );

    if (eligible.length > 0) {
      // Select a random recipe from eligible ones
      const randomIndex = Math.floor(Math.random() * eligible.length);
      setSelectedRecipe(eligible[randomIndex]);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-amber-50 text-gray-800">
      {/* Header */}
      <header className="bg-orange-500 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Meal Decider</h1>
          <p className="text-center mt-2 text-orange-100">Discover delicious recipes tailored to your preferences</p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mt-4">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search for recipes, cuisines, or ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 px-4 pr-10 rounded-full border-2 border-orange-300 focus:border-orange-400 focus:outline-none text-gray-700"
              />
              <div className="absolute right-3 text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Selection Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-orange-600">Find Your Perfect Recipe</h2>
          
          {/* Meal Type Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Meal Type</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {["Pre-breakfast", "Breakfast", "Lunch", "Evening Snacks", "Dinner"].map((meal) => (
                <button
                  key={meal}
                  className={`py-2 px-4 rounded-md border ${
                    mealType === meal 
                      ? "bg-orange-500 text-white border-orange-500" 
                      : "bg-white text-gray-700 border-gray-300 hover:bg-orange-100"
                  } transition-colors`}
                  onClick={() => setMealType(meal)}
                >
                  {meal}
                </button>
              ))}
            </div>
          </div>
          
          {/* Diet Type Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Diet Preference</label>
            <div className="flex space-x-4">
              <label className={`flex items-center p-3 border rounded-md cursor-pointer ${
                dietType === "veg" ? "bg-green-100 border-green-500" : "bg-white border-gray-300"
              }`}>
                <input
                  type="radio"
                  value="veg"
                  checked={dietType === "veg"}
                  onChange={() => setDietType("veg")}
                  className="mr-2"
                />
                Vegetarian
              </label>
              <label className={`flex items-center p-3 border rounded-md cursor-pointer ${
                dietType === "non-veg" ? "bg-red-100 border-red-500" : "bg-white border-gray-300"
              }`}>
                <input
                  type="radio"
                  value="non-veg"
                  checked={dietType === "non-veg"}
                  onChange={() => setDietType("non-veg")}
                  className="mr-2"
                />
                Non-Vegetarian
              </label>
            </div>
          </div>
          
          {/* Time Range Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Preparation Time</label>
            <div className="flex flex-wrap gap-3">
              {["<10 mins", "11-20mins", "20+ mins"].map((time) => (
                <label key={time} className={`flex items-center p-3 border rounded-md cursor-pointer ${
                  timeRange.includes(time) ? "bg-blue-100 border-blue-500" : "bg-white border-gray-300"
                }`}>
                  <input
                    type="checkbox"
                    value={time}
                    checked={timeRange.includes(time)}
                    onChange={() => {
                      if (timeRange.includes(time)) {
                        setTimeRange(timeRange.filter(t => t !== time));
                      } else {
                        setTimeRange([...timeRange, time]);
                      }
                    }}
                    className="mr-2"
                  />
                  {time}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        )}

        {/* Recipe Display */}
        {!isLoading && recommendations.length > 0 && !selectedRecipe && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-orange-600">Recommended Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((recipe) => (
                <div 
                  key={recipe.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  {foodImages[recipe.id] && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={foodImages[recipe.id]} 
                        alt={recipe.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(recipe.name)}`;
                        }}
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        recipe.dietType === 'veg' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {recipe.dietType === 'veg' ? 'Veg' : 'Non-Veg'}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                        {recipe.timeToMake}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.name}</h3>
                    <p className="text-gray-600 mb-2">{recipe.description}</p>
                    <p className="text-sm text-gray-500 italic">Cuisine: {recipe.cuisine}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!isLoading && mealType && recommendations.length === 0 && !selectedRecipe && (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">No recipes found for your selection. Try changing your filters.</p>
          </div>
        )}

        {/* Selected Recipe Detail */}
        {!isLoading && selectedRecipe && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-orange-600">{selectedRecipe.name}</h2>
              <button 
                onClick={() => setSelectedRecipe(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times; Close
              </button>
            </div>
            
            <div className="flex flex-wrap mb-4">
              <span className={`mr-2 mb-2 px-3 py-1 rounded-full text-sm font-semibold ${
                selectedRecipe.dietType === 'veg' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {selectedRecipe.dietType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
              </span>
              <span className="mr-2 mb-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold">
                {selectedRecipe.timeToMake}
              </span>
              <span className="mr-2 mb-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-semibold">
                {selectedRecipe.cuisine}
              </span>
              <span className="mr-2 mb-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-semibold">
                {selectedRecipe.mealType}
              </span>
            </div>
            
            <p className="text-gray-700 mb-6 text-lg">{selectedRecipe.description}</p>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-orange-600">Recipe</h3>
              <div className="bg-orange-50 p-4 rounded-md">
                {selectedRecipe.recipe.split('\n').map((step, index) => (
                  <p key={index} className="mb-2">{step}</p>
                ))}
              </div>
            </div>
            
            <button 
              onClick={getSurpriseDish}
              className="w-full py-3 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition-colors"
            >
              Changed my mind, surprise me with a new dish!
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-orange-600 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Meal Decider - Discover delicious recipes for any meal</p>
        </div>
      </footer>
    </div>
  );
}

export default App;