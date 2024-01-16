import React, { useEffect, useState } from "react";
import StarRating from './StarRating'

// re-format generated date/time
const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options);
    return formattedDate;
  };

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [recipeId, setRecipeId] = useState("65a22d112404af18c1bcf97a");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/reviews/show/${recipeId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [recipeId]);

  return (
    <div>
      <h1>Reviews for Recipe ID: {recipeId}</h1>
      {reviews.length === 0 ? (
        <p>No reviews available for this recipe.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              <p>Username: {review.username}</p>
              <p>Title: {review.title}</p>
              <p>Rating: <StarRating star={review.rating} /></p>
              <p>Content: {review.content}</p>
              <br />
              Review Date: {formatDate(review.createdAt)}
              <br />
              Last Updated: {formatDate(review.updatedAt)}
              {/* Add image display logic if needed */}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewPage;