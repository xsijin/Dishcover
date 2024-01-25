import React, { useState } from "react";
import "./ReviewPage.css";

const CreateReviewForm = ({ onAddReview, userId, username }) => {
  const [newReview, setNewReview] = useState({
    user: userId,
    title: "",
    content: "",
    rating: 5,
    images: "",
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
      images: "",
    });
  };

  return (
    <div className="add-review-form">
      <h2 className="bold">Share about your dishcoveries!</h2>
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
          className="textarea textarea-bordered textarea-sm w-full max-w-xs"
          placeholder="What did you love about this recipe? What improvements would you suggest?"
          value={newReview.content}
          onChange={handleInputChange}
          required
        ></textarea>
        <input
          type="text"
          title="Please include only 1 photo URL. We suggest using an image hosting site such as Imgur. Image will not appear if the link is broken."
          id="newImageURL"
          name="images"
          placeholder="Add photo URL (if any)"
          className="input input-bordered input-sm w-full max-w-xs"
          value={newReview.images}
          onChange={handleInputChange}
        />

        <br />
        <br />
        <button type="submit" className="btn btn-submit">
          Submit Review
        </button>
      </form>
      <br /><span className="text-secondary text-sm">Submitting as {username}</span>
    </div>
  );
};

export default CreateReviewForm;
