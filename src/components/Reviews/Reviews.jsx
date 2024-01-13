import React, { useState, useEffect } from 'react';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [recipeId, setRecipeId] = useState('65a22d032404af18c1bcf978');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:3000/reviews/show/${recipeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
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
              <p>Rating: {review.rating}</p>
              <p>Content: {review.content}</p>
              {/* Add image display logic if needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewPage;