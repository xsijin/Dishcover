import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import StarRating from "./Reviews/StarRating";

function PublicWesternRecipes() {
  const [westernRecipes, setWesternRecipes] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Fetch reviews for a specific recipe
  const fetchRecipeReviews = async (recipeId) => {
    try {
      const response = await fetch(
        `https://ga-p3-backend.onrender.com/reviews/show/${recipeId}`
      );
      if (response.ok) {
        const reviewsData = await response.json();
        return reviewsData;
      } else {
        console.error(`Failed to fetch reviews for recipe ${recipeId}`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching reviews for recipe ${recipeId}:`, error);
      return null;
    }
  };

  // Calculate the average rating for a given set of reviews
  const calculateAverageRating = (reviewsData) => {
    if (!Array.isArray(reviewsData) || reviewsData.length === 0) {
      return 0; // Default to 0 if reviewsData is not an array or is empty
    }
    const totalRating = reviewsData.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return totalRating / reviewsData.length;
  };

  useEffect(() => {
    // Fetch Western recipes
    const getWesternRecipes = async () => {
      try {
        const response = await fetch(
          "https://ga-p3-backend.onrender.com/recipes/show?search=western"
        );
        if (response.ok) {
          const data = await response.json();
          setWesternRecipes(data.recipes);
          console.log(data.recipes);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    getWesternRecipes();
  }, []);

  useEffect(() => {
    // Fetch reviews for each recipe when westernRecipes changes
    const fetchReviewsForRecipes = async () => {
      const reviewsPromises = westernRecipes.map(async (recipe) => {
        const reviewsData = await fetchRecipeReviews(recipe._id);
        return { recipeId: recipe._id, reviewsData };
      });

      const reviewsResults = await Promise.all(reviewsPromises);
      setReviews(reviewsResults);
    };

    fetchReviewsForRecipes();
  }, [westernRecipes]);

  return (
    <div className="bg-secondary-content bg-opacity-70">
      <Wrapper>
        <h1 className="font-bold text-xl mb-4 ml-4">Western</h1>

        <h2 className="text-xl mb-4 ml-4">
          "Savor the essence of the West with our recipes, where traditional
          meets innovation, and every dish is a symphony of taste and culinary
          finesse!"
        </h2>

        <Splide
          options={{
            perPage: 4,
            drag: "free",
            pagination: false,
            gap: "3rem",
          }}
        >
          {westernRecipes.map((recipe) => {
            const review = reviews.find((r) => r.recipeId === recipe._id);

            if (!review || !review.reviewsData) {
              return null; // Skip rendering if review data is not available
            }

            // Calculate average rating for the current recipe
            const averageRating = calculateAverageRating(review.reviewsData);

            return (
              <SplideSlide key={recipe._id} className="ml-4">
                <Card>
                  <Link
                    to={`/publicrecipedetails/${recipe._id}`}
                    className="text-inherit no-underline block"
                  >
                    <h2>{recipe.title}</h2>
                    <img src={recipe.picture_url} alt="Picture Unavailable" />
                    <Gradient />
                  </Link>
                </Card>

                {/* Display the average rating */}
                <div className="flex justify-center">
                  <Link to={`/PublicRecipeDetails/${recipe._id}?tab=review`}>
                    <StarRating star={averageRating} />
                    &nbsp;
                    <span className="badge badge-lg">
                      {!Array.isArray(review.reviewsData) ||
                      review.reviewsData.length === 0
                        ? 0
                        : review.reviewsData.length}{" "}
                    </span>
                  </Link>
                </div>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 10rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  // all the images in the card div
  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h2 {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default PublicWesternRecipes;
