import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import UserProfileList from "./components/UserProfile/UserProfileList";
import ReviewLanding from "./components/Reviews/ReviewLanding";
import ReviewUser from "./components/Reviews/ReviewUser";
import MyRecipes from "./components/MyRecipes";
import MyRecipeDetails from "./components/MyRecipeDetails";
import MyRecipeEditing from "./components/MyRecipeEditing";
import PublicLandingPage from "./components/PublicLandingPage";
import PublicRecipeDetails from "./components/PublicRecipeDetails";
import UserProfileIndiv from "./components/UserProfile/UserProfileIndiv";
import SearchResult from "./components/SearchResult";
import LoginSignUp from "./components/UserProfile/LoginSignUp";
import ReviewAdmin from "./components/Reviews/ReviewAdmin";
import ModRecipesControl from "./components/ModRecipesControl";
import ModRecipeDetails from "./components/ModRecipeDetails";

function App() {
  // const [user, setUser] = useState({
  //   "_id": "65ab37f4dea55121c55888a3",
  //   "firstName": "Chloe",
  //   "lastName": "René",
  //   "email": "chloerenne@postman.com",
  //   "password": "iamchloerenne",
  //   "recipes": [],
  //   "bio": "Chloe takes inspiration from her diverse upbringing to create recipes and dishes influenced from cultures around the world. Despite her classical training, Chloe's philosophy in the kitchen revolves around simplicity and home-cooking. She firmly believes that the essence of a great meal lies in the quality of ingredients and the care put into their preparation. Instead of relying on complex and technical processes, Chloe prizes the art of letting ingredients shine through, enhancing their natural flavours with a delicate touch.",
  //   "reviews": [],
  //   "favourites": [],
  //   "createdAt": "2024-01-20T03:03:16.686Z",
  //   "updatedAt": "2024-01-20T03:03:16.686Z",
  //   "__v": 0
  // })
  const [user, setUser] = useState({
    firstName: "TestChloe",
    lastName: "TestRenne",
    email: "chloerennetest@postman.com",
    password: "iamchloerennetest",
    recipes: [],
    bio: "Chloe takes inspiration from her diverse upbringing to create recipes and dishes influenced from cultures around the world. Despite her classical training, Chloe's philosophy in the kitchen revolves around simplicity and home-cooking. She firmly believes that the essence of a great meal lies in the quality of ingredients and the care put into their preparation. Instead of relying on complex and technical processes, Chloe prizes the art of letting ingredients shine through, enhancing their natural flavours with a delicate touch.",
    reviews: [],
    favourites: [],
    _id: "65ab84878eaa3f01afdfcc2e",
    createdAt: "2024-01-20T08:29:59.390Z",
    updatedAt: "2024-01-20T08:29:59.390Z",
    __v: 0,
  });

  return (
    <>
      <nav>
        <NavBar user={user} />
      </nav>
      <main className="navspace">
        <Routes>
          <Route path="/" element={<PublicLandingPage />} />
          <Route path="/searchresult/:searchTerm" element={<SearchResult />} />
          {/* User Routing */}
          <Route path="/users" element={<UserProfileList />} />
          <Route path="/users/:userId" element={<UserProfileIndiv />} />
          <Route path="/login-signup" element={<LoginSignUp />} />
          {/* Recipe Routing */}
          <Route path="/MyRecipes" element={<MyRecipes />} />
          <Route path="/MyRecipeDetails/:id" element={<MyRecipeDetails />} />
          <Route path="/MyRecipeEditing/:id" element={<MyRecipeEditing />} />
          <Route path="/PublicRecipeDetails/:id" element={<PublicRecipeDetails />} />
          <Route path="/modrecipescontrol" element={<ModRecipesControl />} />
          <Route path="/modrecipedetails/:id" element={<ModRecipeDetails />} />
          {/* Review Routing */}
          <Route path="/reviews/:recipeId" element={<ReviewLanding />} />
          <Route path="/ReviewUser" element={<ReviewUser />} />
          <Route path="/ReviewAdmin" element={<ReviewAdmin />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
