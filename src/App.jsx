import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import UserProfileList from "./components/UserProfile/UserProfileList";
import ReviewLanding from "./components/Reviews/ReviewLanding";
import ReviewUser from "./components/Reviews/ReviewUser";
import SignUpForm from './components/UserProfile/SignUpForm';
import MyRecipes from "./components/MyRecipes";
import MyRecipeDetails from "./components/MyRecipeDetails";
import MyRecipeEditing from "./components/MyRecipeEditing";
import PublicLandingPage from "./components/PublicLandingPage";
import PublicRecipeDetails from "./components/PublicRecipeDetails";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
  const [user, setUser] = useState({
    "_id": "65ab37f4dea55121c55888a3",
    "firstName": "Chloe",
    "lastName": "René",
    "email": "chloerenne@postman.com",
    "password": "iamchloerenne",
    "recipes": [],
    "bio": "Chloe takes inspiration from her diverse upbringing to create recipes and dishes influenced from cultures around the world. Despite her classical training, Chloe's philosophy in the kitchen revolves around simplicity and home-cooking. She firmly believes that the essence of a great meal lies in the quality of ingredients and the care put into their preparation. Instead of relying on complex and technical processes, Chloe prizes the art of letting ingredients shine through, enhancing their natural flavours with a delicate touch.",
    "reviews": [],
    "favourites": [],
    "createdAt": "2024-01-20T03:03:16.686Z",
    "updatedAt": "2024-01-20T03:03:16.686Z",
    "__v": 0
  })

  return (
    <>
      <nav>
      <NavBar />
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<PublicLandingPage />} />
          <Route path="/users" element={<UserProfileList />} />
          <Route path="/my-profile" element={<UserProfile user={user}/>} />
          <Route path="/ReviewLanding" element={<ReviewLanding />} />
          <Route path="/reviews/:recipeId" element={<ReviewLanding />} />
          <Route path="/ReviewUser" element={<ReviewUser />} />
          <Route path="/login-signup" element={<SignUpForm />} />
          <Route path="/MyRecipes" element={<MyRecipes />} />
          <Route path="/MyRecipeDetails/:id" element={<MyRecipeDetails />} />
          <Route path="/MyRecipeEditing/:id" element={<MyRecipeEditing />} />
          <Route
            path="/PublicRecipeDetails/:id"
            element={<PublicRecipeDetails />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
