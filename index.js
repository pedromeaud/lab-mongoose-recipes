const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data'); // Import of the data from './data.json'

const MONGODB_URI = 'mongodb://localhost/recipeApp';

// Connection to the database "recipeApp"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected to the database: "${x.connections[0].name}"`);
    // Run your code here, after you have insured that the connection was made
    return Recipe.create(myRecipe);
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

const myRecipe = {
  title: 'Pizza',
  level: 'Easy Peasy',
  ingredients: ['Tomato Souce', 'Mozzarela', 'Pepperoni', 'Basil', 'Mushrooms'],
  cusine: 'Italian',
  dishType: 'Dish',
  image: 'https://images.media-allrecipes.com/images/75131.jpg',
  duration: 30,
  creator: 'Pedro',
  created: ''
};
// insert recipe
Recipe.create({ myRecipe })
  .then(result => {
    console.log('Create my Recipe.');
  })
  .catch(err => {
    console.log(err);
  });

//multiple recipes

Recipe.insertMany(data)
  .then(createdRecipesArr => {
    //Update
    const promise = Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
    return promise;
  })
  .then(updatedRecipe => {
    //Delete
    const deletePromise = Recipe.deleteOne({ title: 'Carrot Cake' });
    return deletePromise;
  })
  .then(deletedRecipe => {
    //Close the connection
    mongoose.connection.close(() => console.log('Connection closed.'));
  })
  .catch(err => {
    console.log(err);
  });
