import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import UserProfile from "./components/UserProfile/UserProfile";
import ReviewLanding from './components/Reviews/ReviewLanding';
import MyRecipes from "./components/MyRecipes";
import MyRecipeDetails from "./components/MyRecipeDetails";
import MyRecipeEditing from "./components/MyRecipeEditing";
import PublicLandingPage from "./components/PublicLandingPage";
import PublicRecipeDetails from "./components/PublicRecipeDetails";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <nav>
      <NavBar />
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<PublicLandingPage />} />
          <Route path="/users/show" element={<UserProfile />} />
          <Route path="/reviews/:recipeId" element={<ReviewPage />} />
          <Route path="/ReviewLanding" element={<ReviewLanding />} />
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
