import React, { useState } from "react";
import StarRating from "./StarRating";
import "./ReviewPage.css";

const CreateReviewForm = ({ recipeId, onAddReview }) => {
  const [newReview, setNewReview] = useState({
    title: "",
    content: "",
    rating: 5,
  });

  const handleInputChange = (e) => {
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value,
    });
  };

  const handleStarChange = (value) => {
    setNewReview({
      ...newReview,
      rating: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add validation or other necessary checks here before proceeding

    // Pass the new review to the parent component
    onAddReview(newReview);

    // Clear the form after submitting
    setNewReview({
      title: "",
      content: "",
      rating: 5,
    });
  };

  return (
    <div className="add-review-form">
      <h2>We'd love for your to add your reviews!</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <input
              key={value}
              type="radio"
              name="newRating"
              className="mask mask-star-2 bg-yellow-400"
              value={value}
              checked={parseInt(newReview.rating) === value}
              onChange={() => handleStarChange(value)}
            />
          ))}
        </div>
        <br />
        <input
          type="text"
          id="newTitle"
          name="title"
          placeholder="Your review title"
          className="input input-bordered w-full max-w-xs titlemargin"
          value={newReview.title}
          onChange={handleInputChange}
        />
        <br />
        <textarea
          id="newContent"
          name="content"
          className="textarea textarea-bordered textarea-sm w-full max-w-xs titlemargin"
          placeholder="Type your review here"
          value={newReview.content}
          onChange={handleInputChange}
          required
        ></textarea>

        <br />
        <button type="submit" className="btn btn-outline btn-primary">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default CreateReviewForm;
