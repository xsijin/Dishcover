import { useState, useEffect } from "react";
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
import { getToken } from './util/security';

function App() {

  const [user, setUser] = useState({});
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const token = getToken();
    const payload = token ? JSON.parse(atob(token.split(".")[1])).payload : null;
    console.log("payload", payload);
    if (payload && payload.email) {
        console.log("payload set");
        setUser(payload);
    }
  }, [login]);

  return (
    <>
      <nav>
        <NavBar username={user.user} userId={user.userId} user={user} />
      </nav>
      <main className="navspace">
        {
          // ADMIN: All routes available
          user.is_admin ? (
            <>
              <Routes>
                <Route path="/" element={<PublicLandingPage />} />
                <Route path="/searchresult/:searchTerm" element={<SearchResult />} />
                {/* User Routing */}
                <Route path="/users" element={<UserProfileList />} />
                <Route path="/users/:userId" element={<UserProfileIndiv />} />
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
            </>
          )
          // LOGGED-IN USER: All public routes + editing routes available 
          : user.email ? (
            <>
              <Routes>
                <Route path="/" element={<PublicLandingPage />} />
                <Route path="/searchresult/:searchTerm" element={<SearchResult />} />
                {/* User Routing */}
                <Route path="/users" element={<UserProfileList />} />
                <Route path="/users/:userId" element={<UserProfileIndiv />} />
                {/* Recipe Routing */}
                <Route path="/MyRecipes" element={<MyRecipes />} />
                <Route path="/MyRecipeDetails/:id" element={<MyRecipeDetails />} />
                <Route path="/MyRecipeEditing/:id" element={<MyRecipeEditing />} />
                <Route path="/PublicRecipeDetails/:id" element={<PublicRecipeDetails />} />
                {/* Review Routing */}
                <Route path="/reviews/:recipeId" element={<ReviewLanding />} />
                <Route path="/ReviewUser" element={<ReviewUser />} />
              </Routes>
            </>
          ) 
          // NON-LOGGED-IN USERS: Only public routes available
          : (
            <>
              <Routes>
                <Route path="/" element={<PublicLandingPage />} />
                <Route path="/searchresult/:searchTerm" element={<SearchResult />} />
                {/* User Routing */}
                <Route path="/users" element={<UserProfileList />} />
                <Route path="/users/:userId" element={<UserProfileIndiv />} />
                <Route path="/login-signup" element={<LoginSignUp setLogin={setLogin} />} />
                {/* Recipe Routing */}
                <Route path="/PublicRecipeDetails/:id" element={<PublicRecipeDetails />} />
                {/* Review Routing */}
                <Route path="/reviews/:recipeId" element={<ReviewLanding />} />
              </Routes>
            </>
          )
        } 
      </main>
    </>
  );
}

export default App;
