import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import BreadCrumb from "./components/BreadCrumb/BreadCrumb";
import UserProfile from "./components/UserProfile/UserProfile";
import ReviewPage from "./components/Reviews/ReviewPage";
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
        <a href="/">
          <h1>DISHCOVER</h1>
        </a>
        <BreadCrumb />
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<PublicLandingPage />} />
          <Route path="/users/show" element={<UserProfile />} />
          <Route path="/reviews/:recipeId" element={<ReviewPage />} />
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
