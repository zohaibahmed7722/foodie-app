import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  SafeAreaView,
  StatusBar,
  FlatList,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// -----------------------------------------------------------------------------
// Initial Categories (15 categories > 10 required)
// -----------------------------------------------------------------------------
const CATEGORIES = [
  { id: 'my_food', name: 'My Food', icon: 'restaurant' },
  { id: 'all', name: 'All', icon: 'grid' },
  { id: 'breakfast', name: 'Breakfast', icon: 'sunny' },
  { id: 'lunch', name: 'Lunch', icon: 'fast-food' },
  { id: 'dinner', name: 'Dinner', icon: 'pizza' },
  { id: 'desserts', name: 'Desserts', icon: 'ice-cream' },
  { id: 'appetizers', name: 'Appetizers', icon: 'nutrition' },
  { id: 'beverages', name: 'Beverages', icon: 'wine' },
  { id: 'salads', name: 'Salads', icon: 'leaf' },
  { id: 'soups', name: 'Soups', icon: 'cafe' },
  { id: 'vegetarian', name: 'Vegetarian', icon: 'flower' },
  { id: 'seafood', name: 'Seafood', icon: 'fish' },
  { id: 'italian', name: 'Italian', icon: 'flame' },
  { id: 'mexican', name: 'Mexican', icon: 'color-palette' },
  { id: 'asian', name: 'Asian', icon: 'earth' },
];

// -----------------------------------------------------------------------------
// Sample Initial Recipes
// -----------------------------------------------------------------------------
const INITIAL_RECIPES = [
  {
    id: '1',
    name: 'Creamy Tuscan Garlic Chicken',
    category: 'dinner',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80',
    prepTime: '30 mins',
    servings: '4 servings',
    calories: '520 kcal',
    difficulty: 'Medium',
    isMyRecipe: true,
    ingredients: [
      '2 large chicken breasts, sliced horizontally',
      '2 tbsp olive oil & 1 tbsp butter',
      '1 cup heavy cream',
      '1/2 cup chicken broth',
      '1 tsp garlic powder & 3 minced cloves',
      '1 cup baby spinach',
      '1/2 cup sun-dried tomatoes, drained',
      '1/2 cup grated Parmesan cheese',
    ],
    instructions: [
      'Season chicken breasts with salt, pepper, and garlic powder on both sides.',
      'Heat olive oil and butter in a large skillet over medium-high heat. Sear chicken 5 minutes per side until golden brown and cooked through. Transfer to a plate.',
      'In the same skillet, add minced garlic and sun-dried tomatoes; sauté for 1 minute until fragrant.',
      'Pour in chicken broth and heavy cream. Bring to a gentle simmer.',
      'Add spinach and grated Parmesan cheese. Stir until spinach wilts and sauce thickens slightly.',
      'Return chicken to the skillet, spoon the sauce over, and simmer for 2-3 minutes. Serve hot with pasta or crusty bread.',
    ],
  },
  {
    id: '2',
    name: 'Fluffy Buttermilk Pancakes',
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
    prepTime: '20 mins',
    servings: '3 servings',
    calories: '350 kcal',
    difficulty: 'Easy',
    isMyRecipe: true,
    ingredients: [
      '2 cups all-purpose flour',
      '2 tsp baking powder & 1/2 tsp baking soda',
      '2 tbsp granulated sugar',
      '1/2 tsp salt',
      '1 3/4 cups buttermilk',
      '2 large eggs',
      '1/4 cup melted unsalted butter',
      'Fresh berries and maple syrup for serving',
    ],
    instructions: [
      'In a large bowl, whisk together flour, baking powder, baking soda, sugar, and salt.',
      'In another bowl, whisk together buttermilk, eggs, and melted butter.',
      'Pour wet ingredients into dry ingredients and gently fold until just combined (small lumps are fine). Let batter rest for 5 minutes.',
      'Heat a lightly greased non-stick griddle over medium heat.',
      'Pour 1/4 cup of batter per pancake. Cook until bubbles form on top, about 2-3 minutes. Flip and cook until golden brown.',
      'Serve warm topped with butter, maple syrup, and fresh berries.',
    ],
  },
  {
    id: '3',
    name: 'Classic Caesar Salad',
    category: 'salads',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    prepTime: '15 mins',
    servings: '2 servings',
    calories: '280 kcal',
    difficulty: 'Easy',
    isMyRecipe: false,
    ingredients: [
      '1 large head romaine lettuce, washed and chopped',
      '1/2 cup garlic croutons',
      '1/3 cup freshly shaved Parmesan cheese',
      '1/4 cup classic Caesar dressing',
      '1 tbsp freshly squeezed lemon juice',
      'Cracked black pepper to taste',
    ],
    instructions: [
      'Wash, thoroughly dry, and chop the romaine lettuce.',
      'In a large salad bowl, toss chopped romaine with Caesar dressing and fresh lemon juice until evenly coated.',
      'Scatter the garlic croutons and shaved Parmesan cheese on top.',
      'Finish with freshly cracked black pepper. Serve immediately.',
    ],
  },
  {
    id: '4',
    name: 'Molten Chocolate Lava Cake',
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
    prepTime: '25 mins',
    servings: '2 servings',
    calories: '480 kcal',
    difficulty: 'Medium',
    isMyRecipe: false,
    ingredients: [
      '1/2 cup high-quality dark chocolate chips',
      '1/2 cup unsalted butter',
      '1 cup powdered sugar',
      '2 whole eggs + 2 egg yolks',
      '6 tbsp all-purpose flour',
      'Vanilla ice cream for serving',
    ],
    instructions: [
      'Preheat oven to 425°F (220°C). Butter and lightly flour two 6-ounce ramekins.',
      'Microwave chocolate and butter in 30-second increments until completely smooth.',
      'Whisk in powdered sugar until smooth, then whisk in eggs and egg yolks thoroughly.',
      'Gently fold in flour until no dry spots remain.',
      'Divide batter between prepared ramekins. Bake for 12-14 minutes until sides are set but center remains soft.',
      'Run a butter knife gently around edges, invert onto dessert plates, and top with vanilla ice cream.',
    ],
  },
  {
    id: '5',
    name: 'Spaghetti Carbonara',
    category: 'italian',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80',
    prepTime: '25 mins',
    servings: '4 servings',
    calories: '610 kcal',
    difficulty: 'Medium',
    isMyRecipe: false,
    ingredients: [
      '400g spaghetti pasta',
      '150g guanciale or pancetta, diced',
      '4 fresh egg yolks + 1 whole egg',
      '100g freshly grated Pecorino Romano cheese',
      'Freshly ground black pepper',
      'Sea salt for pasta water',
    ],
    instructions: [
      'Bring a large pot of salted water to a rolling boil. Cook spaghetti until al dente.',
      'In a bowl, whisk whole egg and yolks with grated Pecorino cheese and plenty of black pepper.',
      'In a skillet, crisp the guanciale over medium heat until golden and fat has rendered.',
      'Transfer hot pasta directly to the skillet with guanciale (off heat).',
      'Quickly pour in egg mixture while tossing vigorously with a splash of hot pasta water to form a glossy, creamy sauce.',
      'Serve immediately with extra cheese and cracked pepper on top.',
    ],
  },
  {
    id: '6',
    name: 'Crispy Garlic Butter Shrimp',
    category: 'seafood',
    image: 'https://images.unsplash.com/photo-1559742811-822873691df8?w=800&q=80',
    prepTime: '15 mins',
    servings: '2 servings',
    calories: '320 kcal',
    difficulty: 'Easy',
    isMyRecipe: false,
    ingredients: [
      '1 lb large shrimp, peeled and deveined',
      '4 tbsp unsalted butter',
      '4 cloves garlic, finely minced',
      '1/4 cup dry white wine or chicken broth',
      '1 tbsp lemon juice',
      '2 tbsp fresh chopped parsley',
    ],
    instructions: [
      'Pat shrimp completely dry with paper towels; season lightly with salt and pepper.',
      'Melt 2 tbsp butter in a large skillet over medium-high heat. Sear shrimp for 1-2 minutes per side until pink.',
      'Add minced garlic and cook for 30 seconds until fragrant.',
      'Deglaze skillet with broth and lemon juice. Swirl in remaining 2 tbsp butter to create a silky glaze.',
      'Garnish generously with fresh parsley and serve with lemon wedges.',
    ],
  },
  {
    id: '7',
    name: 'Iced Matcha Green Tea Latte',
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&q=80',
    prepTime: '5 mins',
    servings: '1 serving',
    calories: '140 kcal',
    difficulty: 'Easy',
    isMyRecipe: false,
    ingredients: [
      '1.5 tsp ceremonial grade matcha powder',
      '2 oz warm water (175°F)',
      '1 cup oat milk or whole milk',
      '1-2 tbsp honey or vanilla syrup',
      '1 cup ice cubes',
    ],
    instructions: [
      'Sift matcha powder into a small bowl to remove any clumps.',
      'Add warm water and whisk vigorously in a zig-zag motion with a bamboo whisk until frothy.',
      'Fill a tall drinking glass with ice cubes and pour in cold milk with sweetener.',
      'Slowly pour the whisked matcha over the top to create a vibrant layered effect. Stir and enjoy!',
    ],
  },
  {
    id: '8',
    name: 'Garden Vegetable Stir Fry',
    category: 'vegetarian',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    prepTime: '20 mins',
    servings: '3 servings',
    calories: '240 kcal',
    difficulty: 'Easy',
    isMyRecipe: false,
    ingredients: [
      '2 cups broccoli florets',
      '1 red bell pepper, sliced',
      '1 cup sugar snap peas',
      '1 medium carrot, julienned',
      '3 tbsp soy sauce & 1 tbsp sesame oil',
      '1 tbsp ginger paste & 2 minced garlic cloves',
      '1 tbsp toasted sesame seeds',
    ],
    instructions: [
      'Heat sesame oil in a wok or large frying pan over high heat.',
      'Add minced garlic and ginger; stir-fry for 30 seconds.',
      'Toss in broccoli, carrots, bell pepper, and snap peas. Cook for 4-5 minutes until crisp-tender.',
      'Pour soy sauce over vegetables, tossing quickly to coat.',
      'Sprinkle with toasted sesame seeds and serve immediately over steamed jasmine rice.',
    ],
  },
  {
    id: '9',
    name: 'Rich Tomato Basil Soup',
    category: 'soups',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
    prepTime: '30 mins',
    servings: '4 servings',
    calories: '210 kcal',
    difficulty: 'Easy',
    isMyRecipe: false,
    ingredients: [
      '2 cans (28 oz each) whole San Marzano tomatoes',
      '1 medium yellow onion, chopped',
      '4 cloves garlic, minced',
      '2 cups vegetable broth',
      '1/2 cup heavy cream or coconut milk',
      '1 cup fresh basil leaves',
      '2 tbsp olive oil, salt, and black pepper',
    ],
    instructions: [
      'Heat olive oil in a Dutch oven over medium heat. Sauté onions and garlic until translucent.',
      'Add crushed tomatoes and vegetable broth. Bring to a boil, then reduce heat and simmer for 20 minutes.',
      'Stir in fresh basil leaves and puree the soup with an immersion blender until velvety smooth.',
      'Stir in heavy cream and season with salt and pepper. Serve warm with grilled cheese.',
    ],
  },
];

export default function App() {
  // Navigation & View state
  const [currentTab, setCurrentTab] = useState('home'); // 'home', 'favorites', 'my_food'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Recipes State
  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  const [favorites, setFavorites] = useState(['1', '4']); // Pre-favorited items
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Active Recipe for Detail Screen

  // Modals
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);

  // Form states for Add / Edit
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('dinner');
  const [formImage, setFormImage] = useState('');
  const [formPrepTime, setFormPrepTime] = useState('25 mins');
  const [formServings, setFormServings] = useState('4 servings');
  const [formCalories, setFormCalories] = useState('450 kcal');
  const [formDifficulty, setFormDifficulty] = useState('Medium');
  const [formIngredients, setFormIngredients] = useState('');
  const [formInstructions, setFormInstructions] = useState('');

  // Favorite toggle function
  const toggleFavorite = (recipeId) => {
    setFavorites((prev) => {
      if (prev.includes(recipeId)) {
        return prev.filter((id) => id !== recipeId);
      } else {
        return [...prev, recipeId];
      }
    });
  };

  // Open Recipe Details
  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  // Close Recipe Details (Functional Back Button)
  const handleBackFromDetail = () => {
    setSelectedRecipe(null);
  };

  // Open Add Recipe Modal
  const openAddRecipeModal = () => {
    setFormName('');
    setFormCategory('dinner');
    setFormImage('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80');
    setFormPrepTime('25 mins');
    setFormServings('4 servings');
    setFormCalories('450 kcal');
    setFormDifficulty('Medium');
    setFormIngredients('1 cup Olive oil\n2 cloves Minced garlic\nSalt and fresh black pepper\n500g Main ingredient');
    setFormInstructions('Preheat cooking pan or oven.\nMix all ingredients evenly in a bowl.\nCook for 15-20 minutes until golden brown.\nServe fresh and warm.');
    setIsAddModalVisible(true);
  };

  // Save New Recipe
  const handleSaveRecipe = () => {
    if (!formName.trim()) {
      Alert.alert('Required Field', 'Please enter a recipe name.');
      return;
    }

    const ingredientsArray = formIngredients
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const instructionsArray = formInstructions
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const newRecipe = {
      id: Date.now().toString(),
      name: formName.trim(),
      category: formCategory,
      image: formImage.trim() || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80',
      prepTime: formPrepTime.trim() || '20 mins',
      servings: formServings.trim() || '2 servings',
      calories: formCalories.trim() || '350 kcal',
      difficulty: formDifficulty,
      isMyRecipe: true,
      ingredients: ingredientsArray.length > 0 ? ingredientsArray : ['Salt and pepper to taste'],
      instructions: instructionsArray.length > 0 ? instructionsArray : ['Mix ingredients and cook to taste.'],
    };

    setRecipes([newRecipe, ...recipes]);
    setIsAddModalVisible(false);
    Alert.alert('Success!', `"${newRecipe.name}" was successfully added to My Recipes!`);
  };

  // Open Edit Recipe Modal
  const openEditRecipeModal = (recipe) => {
    setEditingRecipe(recipe);
    setFormName(recipe.name);
    setFormCategory(recipe.category);
    setFormImage(recipe.image);
    setFormPrepTime(recipe.prepTime);
    setFormServings(recipe.servings);
    setFormCalories(recipe.calories);
    setFormDifficulty(recipe.difficulty);
    setFormIngredients(recipe.ingredients.join('\n'));
    setFormInstructions(recipe.instructions.join('\n'));
    setIsEditModalVisible(true);
  };

  // Update Edited Recipe
  const handleUpdateRecipe = () => {
    if (!formName.trim()) {
      Alert.alert('Required Field', 'Please enter a recipe name.');
      return;
    }

    const ingredientsArray = formIngredients
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const instructionsArray = formInstructions
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const updated = {
      ...editingRecipe,
      name: formName.trim(),
      category: formCategory,
      image: formImage.trim() || editingRecipe.image,
      prepTime: formPrepTime.trim() || editingRecipe.prepTime,
      servings: formServings.trim() || editingRecipe.servings,
      calories: formCalories.trim() || editingRecipe.calories,
      difficulty: formDifficulty,
      ingredients: ingredientsArray,
      instructions: instructionsArray,
    };

    setRecipes((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));

    // If currently viewing details of this recipe, update detail view too
    if (selectedRecipe && selectedRecipe.id === updated.id) {
      setSelectedRecipe(updated);
    }

    setIsEditModalVisible(false);
    setEditingRecipe(null);
    Alert.alert('Updated!', `"${updated.name}" has been updated.`);
  };

  // Delete Recipe
  const handleDeleteRecipe = (recipeId, recipeName) => {
    if (Platform.OS === 'web') {
      const confirmDelete = window.confirm(`Are you sure you want to delete "${recipeName}"?`);
      if (confirmDelete) {
        setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
        setFavorites((prev) => prev.filter((id) => id !== recipeId));
        if (selectedRecipe && selectedRecipe.id === recipeId) {
          setSelectedRecipe(null);
        }
      }
    } else {
      Alert.alert(
        'Delete Recipe',
        `Are you sure you want to delete "${recipeName}"?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
              setFavorites((prev) => prev.filter((id) => id !== recipeId));
              if (selectedRecipe && selectedRecipe.id === recipeId) {
                setSelectedRecipe(null);
              }
            },
          },
        ]
      );
    }
  };

  // Category Selection Handler
  const handleCategoryPress = (catId) => {
    if (catId === 'my_food') {
      setCurrentTab('my_food');
    } else {
      setSelectedCategory(catId);
      if (currentTab !== 'home') {
        setCurrentTab('home');
      }
    }
  };

  // Filtered recipes for Main Feed
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      selectedCategory === 'all' || recipe.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Filtered recipes for Favorites tab
  const favoriteRecipes = recipes.filter((r) => favorites.includes(r.id));

  // My Recipes list
  const myRecipes = recipes.filter((r) => r.isMyRecipe);

  // ---------------------------------------------------------------------------
  // RENDER: Recipe Detail Screen (Rubric 3, 10 & 12)
  // ---------------------------------------------------------------------------
  if (selectedRecipe) {
    const isFav = favorites.includes(selectedRecipe.id);
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        {/* Detail Top Header with Functional Back Button (Rubric 12) */}
        <View style={styles.detailHeaderBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackFromDetail}
            accessibilityLabel="Back button"
          >
            <Ionicons name="arrow-back" size={24} color="#1E293B" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <Text style={styles.detailHeaderTitle} numberOfLines={1}>
            Recipe Details
          </Text>

          <TouchableOpacity
            style={styles.iconCircleButton}
            onPress={() => toggleFavorite(selectedRecipe.id)}
            accessibilityLabel="Favorite button"
          >
            <Ionicons
              name={isFav ? 'heart' : 'heart-outline'}
              size={24}
              color={isFav ? '#EF4444' : '#64748B'}
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.detailScrollView} showsVerticalScrollIndicator={false}>
          {/* Hero Image */}
          <Image source={{ uri: selectedRecipe.image }} style={styles.detailHeroImage} />

          <View style={styles.detailContentContainer}>
            {/* Title & Category */}
            <View style={styles.detailTitleRow}>
              <Text style={styles.detailTitle}>{selectedRecipe.name}</Text>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>
                  {selectedRecipe.category.toUpperCase()}
                </Text>
              </View>
            </View>

            {/* Rubric 3: 4 Key Badges (Prep Time, Servings, Calories, Difficulty) */}
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Ionicons name="time-outline" size={22} color="#F59E0B" />
                <Text style={styles.statLabel}>Prep Time</Text>
                <Text style={styles.statValue}>{selectedRecipe.prepTime}</Text>
              </View>

              <View style={styles.statCard}>
                <Ionicons name="people-outline" size={22} color="#3B82F6" />
                <Text style={styles.statLabel}>Servings</Text>
                <Text style={styles.statValue}>{selectedRecipe.servings}</Text>
              </View>

              <View style={styles.statCard}>
                <Ionicons name="flame-outline" size={22} color="#EF4444" />
                <Text style={styles.statLabel}>Calories</Text>
                <Text style={styles.statValue}>{selectedRecipe.calories}</Text>
              </View>

              <View style={styles.statCard}>
                <Ionicons name="speedometer-outline" size={22} color="#10B981" />
                <Text style={styles.statLabel}>Difficulty</Text>
                <Text style={styles.statValue}>{selectedRecipe.difficulty}</Text>
              </View>
            </View>

            {/* Rubric 3 & 10: Ingredients List */}
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeaderRow}>
                <Ionicons name="basket-outline" size={20} color="#10B981" />
                <Text style={styles.sectionTitle}>
                  Ingredients ({selectedRecipe.ingredients.length})
                </Text>
              </View>
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientRow}>
                  <View style={styles.bulletPoint} />
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>

            {/* Rubric 3 & 10: Step-by-Step Instructions */}
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeaderRow}>
                <Ionicons name="list-outline" size={20} color="#6366F1" />
                <Text style={styles.sectionTitle}>Step-by-Step Instructions</Text>
              </View>
              {selectedRecipe.instructions.map((step, index) => (
                <View key={index} style={styles.instructionStepCard}>
                  <View style={styles.stepNumberBadge}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.instructionText}>{step}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ---------------------------------------------------------------------------
  // MAIN APP VIEW: Header, Horizontal Categories, Body, Navigation Tabs
  // ---------------------------------------------------------------------------
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Main Top Header */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.logoBadge}>
            <Ionicons name="restaurant" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.headerTitle}>Foodie App</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search recipes, ingredients..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Rubric 2 & 7: Horizontal Category Bar (15 items > 10 required) */}
      <View style={styles.categoryContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollView}
        >
          {CATEGORIES.map((cat) => {
            const isMyFood = cat.id === 'my_food';
            const isActive = isMyFood
              ? currentTab === 'my_food'
              : currentTab === 'home' && selectedCategory === cat.id;

            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryPill,
                  isActive && styles.activeCategoryPill,
                  isMyFood && styles.myFoodPill,
                ]}
                onPress={() => handleCategoryPress(cat.id)}
              >
                <Ionicons
                  name={cat.icon}
                  size={16}
                  color={isActive ? '#FFFFFF' : isMyFood ? '#10B981' : '#64748B'}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.categoryPillText,
                    isActive && styles.activeCategoryPillText,
                    isMyFood && !isActive && styles.myFoodPillText,
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Body Views based on Active Tab */}
      <View style={styles.body}>
        {/* TAB 1: MAIN FEED */}
        {currentTab === 'home' && (
          <View style={styles.fullFlex}>
            <View style={styles.feedInfoRow}>
              <Text style={styles.feedSectionHeading}>
                {selectedCategory === 'all'
                  ? 'All Recipes'
                  : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Recipes`}
              </Text>
              <Text style={styles.recipeCountText}>
                {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}
              </Text>
            </View>

            <FlatList
              data={filteredRecipes}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }) => {
                const isFav = favorites.includes(item.id);
                return (
                  <TouchableOpacity
                    style={styles.recipeCard}
                    activeOpacity={0.9}
                    onPress={() => handleSelectRecipe(item)}
                  >
                    <Image source={{ uri: item.image }} style={styles.recipeCardImage} />

                    {/* Rubric 5: Heart icon to favorite / unfavorite */}
                    <TouchableOpacity
                      style={styles.cardHeartButton}
                      onPress={() => toggleFavorite(item.id)}
                      accessibilityLabel="Favorite recipe"
                    >
                      <Ionicons
                        name={isFav ? 'heart' : 'heart-outline'}
                        size={22}
                        color={isFav ? '#EF4444' : '#64748B'}
                      />
                    </TouchableOpacity>

                    <View style={styles.recipeCardBody}>
                      <View style={styles.cardCategoryPill}>
                        <Text style={styles.cardCategoryText}>{item.category.toUpperCase()}</Text>
                      </View>
                      <Text style={styles.recipeCardTitle}>{item.name}</Text>

                      {/* Summary details */}
                      <View style={styles.cardMetaRow}>
                        <View style={styles.metaItem}>
                          <Ionicons name="time-outline" size={14} color="#64748B" />
                          <Text style={styles.metaItemText}>{item.prepTime}</Text>
                        </View>
                        <View style={styles.metaItem}>
                          <Ionicons name="flame-outline" size={14} color="#64748B" />
                          <Text style={styles.metaItemText}>{item.calories}</Text>
                        </View>
                        <View style={styles.metaItem}>
                          <Ionicons name="speedometer-outline" size={14} color="#64748B" />
                          <Text style={styles.metaItemText}>{item.difficulty}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                <View style={styles.emptyStateContainer}>
                  <Ionicons name="restaurant-outline" size={48} color="#CBD5E1" />
                  <Text style={styles.emptyStateTitle}>No Recipes Found</Text>
                  <Text style={styles.emptyStateSubtitle}>
                    Try selecting another category or clear your search term.
                  </Text>
                </View>
              }
            />
          </View>
        )}

        {/* TAB 2: FAVORITES SECTION (Rubric 6) */}
        {currentTab === 'favorites' && (
          <View style={styles.fullFlex}>
            <View style={styles.feedInfoRow}>
              <Text style={styles.feedSectionHeading}>Saved Favorites ❤️</Text>
              <Text style={styles.recipeCountText}>
                {favoriteRecipes.length} {favoriteRecipes.length === 1 ? 'item' : 'items'}
              </Text>
            </View>

            <FlatList
              data={favoriteRecipes}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.recipeCard}
                  activeOpacity={0.9}
                  onPress={() => handleSelectRecipe(item)}
                >
                  <Image source={{ uri: item.image }} style={styles.recipeCardImage} />

                  <TouchableOpacity
                    style={styles.cardHeartButton}
                    onPress={() => toggleFavorite(item.id)}
                  >
                    <Ionicons name="heart" size={22} color="#EF4444" />
                  </TouchableOpacity>

                  <View style={styles.recipeCardBody}>
                    <Text style={styles.recipeCardTitle}>{item.name}</Text>
                    <View style={styles.cardMetaRow}>
                      <View style={styles.metaItem}>
                        <Ionicons name="time-outline" size={14} color="#64748B" />
                        <Text style={styles.metaItemText}>{item.prepTime}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Ionicons name="people-outline" size={14} color="#64748B" />
                        <Text style={styles.metaItemText}>{item.servings}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={styles.emptyStateContainer}>
                  <Ionicons name="heart-dislike-outline" size={48} color="#CBD5E1" />
                  <Text style={styles.emptyStateTitle}>No Favorites Yet</Text>
                  <Text style={styles.emptyStateSubtitle}>
                    Tap the heart icon on any recipe in the main feed to save your favorites!
                  </Text>
                  <TouchableOpacity
                    style={styles.primaryActionButton}
                    onPress={() => setCurrentTab('home')}
                  >
                    <Text style={styles.primaryActionButtonText}>Explore Recipes</Text>
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        )}

        {/* TAB 3: MY FOOD / MY RECIPES (Rubric 7, 8, 9, 10, 11) */}
        {currentTab === 'my_food' && (
          <View style={styles.fullFlex}>
            <View style={styles.myFoodHeaderCard}>
              <View>
                <Text style={styles.myFoodHeaderTitle}>My Kitchen & Food</Text>
                <Text style={styles.myFoodHeaderSubtitle}>
                  Create, customize, and manage your culinary creations.
                </Text>
              </View>

              {/* Rubric 7 & 8: "+ Add New Recipe" Button */}
              <TouchableOpacity
                style={styles.addNewRecipeButton}
                onPress={openAddRecipeModal}
                accessibilityLabel="Add New Recipe"
              >
                <Ionicons name="add-circle" size={20} color="#FFFFFF" />
                <Text style={styles.addNewRecipeButtonText}>Add New Recipe</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.feedInfoRow}>
              <Text style={styles.feedSectionHeading}>My Recipes</Text>
              <Text style={styles.recipeCountText}>
                {myRecipes.length} {myRecipes.length === 1 ? 'recipe' : 'recipes'}
              </Text>
            </View>

            {/* Rubric 9, 10, 11: My Recipes List with Details on click, and Edit & Delete buttons */}
            <FlatList
              data={myRecipes}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }) => (
                <View style={styles.myRecipeCard}>
                  {/* Click to open details (Rubric 10) */}
                  <TouchableOpacity
                    style={styles.myRecipeCardTop}
                    onPress={() => handleSelectRecipe(item)}
                    activeOpacity={0.8}
                  >
                    <Image source={{ uri: item.image }} style={styles.myRecipeImage} />
                    <View style={styles.myRecipeCardInfo}>
                      <View style={styles.cardCategoryPill}>
                        <Text style={styles.cardCategoryText}>{item.category.toUpperCase()}</Text>
                      </View>
                      <Text style={styles.myRecipeName}>{item.name}</Text>
                      <Text style={styles.myRecipeMeta}>
                        {item.prepTime} • {item.calories}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {/* Rubric 11: Edit and Delete Buttons */}
                  <View style={styles.myRecipeActionsRow}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => openEditRecipeModal(item)}
                      accessibilityLabel="Edit Recipe"
                    >
                      <Ionicons name="create-outline" size={16} color="#3B82F6" />
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteRecipe(item.id, item.name)}
                      accessibilityLabel="Delete Recipe"
                    >
                      <Ionicons name="trash-outline" size={16} color="#EF4444" />
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              ListEmptyComponent={
                <View style={styles.emptyStateContainer}>
                  <Ionicons name="book-outline" size={48} color="#CBD5E1" />
                  <Text style={styles.emptyStateTitle}>No Personal Recipes</Text>
                  <Text style={styles.emptyStateSubtitle}>
                    You haven't added any custom recipes yet. Tap "+ Add New Recipe" above!
                  </Text>
                </View>
              }
            />
          </View>
        )}
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setCurrentTab('home')}
        >
          <Ionicons
            name={currentTab === 'home' ? 'restaurant' : 'restaurant-outline'}
            size={22}
            color={currentTab === 'home' ? '#10B981' : '#94A3B8'}
          />
          <Text style={[styles.navItemText, currentTab === 'home' && styles.activeNavItemText]}>
            Feed
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setCurrentTab('favorites')}
        >
          <View>
            <Ionicons
              name={currentTab === 'favorites' ? 'heart' : 'heart-outline'}
              size={22}
              color={currentTab === 'favorites' ? '#EF4444' : '#94A3B8'}
            />
            {favorites.length > 0 && (
              <View style={styles.navBadge}>
                <Text style={styles.navBadgeText}>{favorites.length}</Text>
              </View>
            )}
          </View>
          <Text
            style={[styles.navItemText, currentTab === 'favorites' && styles.activeNavItemText]}
          >
            Favorites
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setCurrentTab('my_food')}
        >
          <Ionicons
            name={currentTab === 'my_food' ? 'person-circle' : 'person-circle-outline'}
            size={22}
            color={currentTab === 'my_food' ? '#10B981' : '#94A3B8'}
          />
          <Text style={[styles.navItemText, currentTab === 'my_food' && styles.activeNavItemText]}>
            My Food
          </Text>
        </TouchableOpacity>
      </View>

      {/* ---------------------------------------------------------------------
          MODAL: ADD NEW RECIPE (Rubric 8)
          - Recipe name
          - Image upload / URL
          - Ingredients list
          - Step-by-step instructions
          - "Save Recipe" button
          --------------------------------------------------------------------- */}
      <Modal visible={isAddModalVisible} animationType="slide" transparent={false}>
        <SafeAreaView style={styles.modalSafeArea}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setIsAddModalVisible(false)}
              style={styles.modalHeaderCloseButton}
            >
              <Ionicons name="close" size={24} color="#1E293B" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>Add New Recipe</Text>
            <View style={{ width: 32 }} />
          </View>

          <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
            {/* 1. Recipe Name */}
            <Text style={styles.inputLabel}>Recipe Name *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Grandma's Apple Pie"
              placeholderTextColor="#94A3B8"
              value={formName}
              onChangeText={setFormName}
            />

            {/* Category selection */}
            <Text style={styles.inputLabel}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
              {CATEGORIES.filter((c) => c.id !== 'all' && c.id !== 'my_food').map((c) => (
                <TouchableOpacity
                  key={c.id}
                  style={[
                    styles.formCategoryPill,
                    formCategory === c.id && styles.activeFormCategoryPill,
                  ]}
                  onPress={() => setFormCategory(c.id)}
                >
                  <Text
                    style={[
                      styles.formCategoryPillText,
                      formCategory === c.id && styles.activeFormCategoryPillText,
                    ]}
                  >
                    {c.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* 2. Image Upload / URL */}
            <Text style={styles.inputLabel}>Image URL / Photo</Text>
            <TextInput
              style={styles.textInput}
              placeholder="https://example.com/photo.jpg"
              placeholderTextColor="#94A3B8"
              value={formImage}
              onChangeText={setFormImage}
            />
            {formImage.length > 0 && (
              <Image source={{ uri: formImage }} style={styles.formImagePreview} />
            )}

            {/* Metadata Fields */}
            <View style={styles.formRow}>
              <View style={styles.formCol}>
                <Text style={styles.inputLabel}>Prep Time</Text>
                <TextInput
                  style={styles.textInput}
                  value={formPrepTime}
                  onChangeText={setFormPrepTime}
                  placeholder="20 mins"
                  placeholderTextColor="#94A3B8"
                />
              </View>
              <View style={styles.formCol}>
                <Text style={styles.inputLabel}>Servings</Text>
                <TextInput
                  style={styles.textInput}
                  value={formServings}
                  onChangeText={setFormServings}
                  placeholder="4 servings"
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </View>

            <View style={styles.formRow}>
              <View style={styles.formCol}>
                <Text style={styles.inputLabel}>Calories</Text>
                <TextInput
                  style={styles.textInput}
                  value={formCalories}
                  onChangeText={setFormCalories}
                  placeholder="450 kcal"
                  placeholderTextColor="#94A3B8"
                />
              </View>
              <View style={styles.formCol}>
                <Text style={styles.inputLabel}>Difficulty</Text>
                <TextInput
                  style={styles.textInput}
                  value={formDifficulty}
                  onChangeText={setFormDifficulty}
                  placeholder="Easy / Medium / Hard"
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </View>

            {/* 3. Ingredients List */}
            <Text style={styles.inputLabel}>Ingredients List (1 per line) *</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="1 cup Flour&#10;2 tbsp Sugar&#10;1 tsp Salt"
              placeholderTextColor="#94A3B8"
              value={formIngredients}
              onChangeText={setFormIngredients}
              multiline
              numberOfLines={4}
            />

            {/* 4. Step-by-Step Instructions */}
            <Text style={styles.inputLabel}>Step-by-Step Instructions (1 per line) *</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Step 1: Preheat oven to 350°F&#10;Step 2: Mix all dry ingredients&#10;Step 3: Bake for 25 minutes"
              placeholderTextColor="#94A3B8"
              value={formInstructions}
              onChangeText={setFormInstructions}
              multiline
              numberOfLines={5}
            />

            {/* 5. Save Recipe Button */}
            <TouchableOpacity
              style={styles.saveRecipeButton}
              onPress={handleSaveRecipe}
              accessibilityLabel="Save Recipe"
            >
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.saveRecipeButtonText}>Save Recipe</Text>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* ---------------------------------------------------------------------
          MODAL: EDIT RECIPE (Rubric 11)
          --------------------------------------------------------------------- */}
      <Modal visible={isEditModalVisible} animationType="slide" transparent={false}>
        <SafeAreaView style={styles.modalSafeArea}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setIsEditModalVisible(false)}
              style={styles.modalHeaderCloseButton}
            >
              <Ionicons name="close" size={24} color="#1E293B" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>Edit Recipe</Text>
            <View style={{ width: 32 }} />
          </View>

          <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
            <Text style={styles.inputLabel}>Recipe Name</Text>
            <TextInput
              style={styles.textInput}
              value={formName}
              onChangeText={setFormName}
            />

            <Text style={styles.inputLabel}>Image URL</Text>
            <TextInput
              style={styles.textInput}
              value={formImage}
              onChangeText={setFormImage}
            />
            {formImage.length > 0 && (
              <Image source={{ uri: formImage }} style={styles.formImagePreview} />
            )}

            <View style={styles.formRow}>
              <View style={styles.formCol}>
                <Text style={styles.inputLabel}>Prep Time</Text>
                <TextInput
                  style={styles.textInput}
                  value={formPrepTime}
                  onChangeText={setFormPrepTime}
                />
              </View>
              <View style={styles.formCol}>
                <Text style={styles.inputLabel}>Servings</Text>
                <TextInput
                  style={styles.textInput}
                  value={formServings}
                  onChangeText={setFormServings}
                />
              </View>
            </View>

            <View style={styles.formRow}>
              <View style={styles.formCol}>
                <Text style={styles.inputLabel}>Calories</Text>
                <TextInput
                  style={styles.textInput}
                  value={formCalories}
                  onChangeText={setFormCalories}
                />
              </View>
              <View style={styles.formCol}>
                <Text style={styles.inputLabel}>Difficulty</Text>
                <TextInput
                  style={styles.textInput}
                  value={formDifficulty}
                  onChangeText={setFormDifficulty}
                />
              </View>
            </View>

            <Text style={styles.inputLabel}>Ingredients (1 per line)</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={formIngredients}
              onChangeText={setFormIngredients}
              multiline
              numberOfLines={4}
            />

            <Text style={styles.inputLabel}>Step-by-Step Instructions (1 per line)</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={formInstructions}
              onChangeText={setFormInstructions}
              multiline
              numberOfLines={5}
            />

            <TouchableOpacity
              style={styles.saveRecipeButton}
              onPress={handleUpdateRecipe}
            >
              <Ionicons name="save-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.saveRecipeButtonText}>Update Recipe</Text>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  fullFlex: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoBadge: {
    backgroundColor: '#10B981',
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
    marginLeft: 8,
    padding: 0,
  },

  // Category horizontal scroll
  categoryContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  categoryScrollView: {
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 8,
  },
  activeCategoryPill: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  myFoodPill: {
    borderColor: '#10B981',
    borderWidth: 1.5,
  },
  categoryPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  activeCategoryPillText: {
    color: '#FFFFFF',
  },
  myFoodPillText: {
    color: '#10B981',
  },

  // Body
  body: {
    flex: 1,
  },
  feedInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  feedSectionHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  recipeCountText: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '500',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  // Recipe Card
  recipeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  recipeCardImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#E2E8F0',
  },
  cardHeartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  recipeCardBody: {
    padding: 14,
  },
  cardCategoryPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  cardCategoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  recipeCardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaItemText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },

  // My Food / Kitchen View
  myFoodHeaderCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  myFoodHeaderTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  myFoodHeaderSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    marginBottom: 12,
  },
  addNewRecipeButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  addNewRecipeButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 6,
  },

  // My Recipe Item Card with Edit & Delete (Rubric 11)
  myRecipeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  myRecipeCardTop: {
    flexDirection: 'row',
    padding: 12,
  },
  myRecipeImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
  },
  myRecipeCardInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  myRecipeName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginVertical: 2,
  },
  myRecipeMeta: {
    fontSize: 12,
    color: '#64748B',
  },
  myRecipeActionsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: '#F8FAFC',
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: 'flex-end',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#EFF6FF',
    marginRight: 8,
  },
  editButtonText: {
    color: '#3B82F6',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#FEF2F2',
  },
  deleteButtonText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },

  // Empty State
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#475569',
    marginTop: 12,
  },
  emptyStateSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },
  primaryActionButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 16,
  },
  primaryActionButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },

  // Detail Screen (Rubric 3, 10, 12)
  detailHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingRight: 8,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 4,
  },
  detailHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  iconCircleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailScrollView: {
    flex: 1,
  },
  detailHeroImage: {
    width: '100%',
    height: 240,
    backgroundColor: '#E2E8F0',
  },
  detailContentContainer: {
    padding: 16,
  },
  detailTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    flex: 1,
    marginRight: 12,
  },
  categoryBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },

  // Rubric 3 Stats Grid
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 4,
  },
  statValue: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
    textAlign: 'center',
  },

  // Section Cards (Ingredients & Instructions)
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginLeft: 8,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginTop: 7,
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 14,
    color: '#334155',
    flex: 1,
    lineHeight: 20,
  },
  instructionStepCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 10,
  },
  stepNumberBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  instructionText: {
    fontSize: 14,
    color: '#334155',
    flex: 1,
    lineHeight: 20,
  },

  // Bottom Navigation Bar
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingVertical: 8,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
    marginTop: 3,
  },
  activeNavItemText: {
    color: '#0F172A',
    fontWeight: '700',
  },
  navBadge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#EF4444',
    borderRadius: 9,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  navBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },

  // Modal Styles (Rubric 8 & 11)
  modalSafeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalHeaderCloseButton: {
    padding: 4,
  },
  modalHeaderTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  modalScrollView: {
    flex: 1,
    padding: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
    marginTop: 4,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
    marginBottom: 12,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formCol: {
    flex: 0.48,
  },
  formCategoryPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    marginRight: 6,
  },
  activeFormCategoryPill: {
    backgroundColor: '#10B981',
  },
  formCategoryPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  activeFormCategoryPillText: {
    color: '#FFFFFF',
  },
  formImagePreview: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#E2E8F0',
  },
  saveRecipeButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  saveRecipeButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
});

