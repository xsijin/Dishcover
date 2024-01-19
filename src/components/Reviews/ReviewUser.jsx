import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { Link, useParams } from "react-router-dom";
import CreateReviewForm from "./CreateReviewForm";
import "./ReviewPage.css";

const ReviewUser = () => {
  const [reviews, setReviews] = useState([]);
  const [recipeId, setRecipeId] = useState("65a22d112404af18c1bcf97a");
  const [recipeName, setRecipeName] = useState("");
  const [editedReview, setEditedReview] = useState({
    // Initialize with empty values or default values
    _id: "",
    title: "",
    content: "",
    rating: 0,
  });
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/recipes/show/${recipeId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipe details");
        }
        const data = await response.json();
        setRecipeName(data.recipe.title);
      } catch (error) {
        console.error(error);
      }
    };

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

    fetchRecipeDetails();
    fetchReviews();
  }, [recipeId]);

  // re-format generated date/time
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-GB",
      options
    );
    return formattedDate;
  };

  // calculate the average rating of this recipe
  const calculateAverageRating = () => {
    if (reviews.length === 0) {
      return 0; // Default to 0 if there are no reviews
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const handleEditClick = (review) => {
    setEditedReview(review);
    setSelectedReviewId(review._id);
    document.getElementById("my_modal_3").showModal();
  };

  const handleInputChange = (e) => {
    // Update the editedReview state when the form inputs change
    setEditedReview({
      ...editedReview,
      [e.target.name]: e.target.value,
    });
  };

  const handleStarChange = (value) => {
    // Update the editedReview state for star rating changes
    setEditedReview((prevReview) => ({
      ...prevReview,
      rating: value,
    }));
  };

  const handlePatchSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/reviews/update/${selectedReviewId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editedReview.title,
            content: editedReview.content,
            rating: editedReview.rating,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update review");
      }

      // Close the modal after a successful update
      document.getElementById("my_modal_3").close();

      // Fetch the updated reviews again to reflect the changes immediately
      const updatedResponse = await fetch(
        `http://localhost:3000/reviews/show/${recipeId}`
      );
      if (!updatedResponse.ok) {
        throw new Error("Failed to fetch updated reviews");
      }
      const updatedData = await updatedResponse.json();
      setReviews(updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete feature

  const handleDeleteClick = async (reviewId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/reviews/delete/${reviewId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }

      // Update the state to reflect the changes immediately
      const updatedReviews = reviews.filter(
        (review) => review._id !== reviewId
      );
      setReviews(updatedReviews);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddReview = async (newReview) => {
    try {
      const response = await fetch(
        `http://localhost:3000/reviews/create/${recipeId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipeId,
            title: newReview.title,
            content: newReview.content,
            rating: newReview.rating,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add review");
      }

      // Fetch the updated reviews again to reflect the changes immediately
      const updatedResponse = await fetch(
        `http://localhost:3000/reviews/show/${recipeId}`
      );
      if (!updatedResponse.ok) {
        throw new Error("Failed to fetch updated reviews");
      }
      const updatedData = await updatedResponse.json();
      setReviews(updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="recipename">Reviews for Recipe: {recipeName}</h2>
      <div>
        <StarRating star={calculateAverageRating()} /> ({reviews.length}{" "}
        reviews) | <Link to={`/myrecipedetails/${recipeId}`}>View Recipe</Link>
      </div>
      <div className="flex-container">
        <div className="reviews-container">
          {reviews.length === 0 ? (
            <p>No reviews available for this recipe.</p>
          ) : (
            <div>
              <div>
                <StarRating star={calculateAverageRating()} /> ({reviews.length}{" "}
                reviews) | <Link to="/users/show">View Recipe</Link>
              </div>
              <ul>
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="card w-96 bg-base-100 shadow-xl bottommargin"
                  >
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-square btn-sm btn-primary btn-outline"
                        onClick={() => handleEditClick(review)}
                      >
                        Edit
                      </button>
                      <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                              ✕
                            </button>
                          </form>
                          <form onSubmit={handlePatchSubmit}>
                            <h3 className="font-bold text-lg">Edit Review</h3>
                            <div className="py-4">
                              <div className="rating">
                                {[1, 2, 3, 4, 5].map((value) => (
                                  <input
                                    key={value}
                                    type="radio"
                                    name="editRating"
                                    className="mask mask-star-2 bg-yellow-400"
                                    value={value}
                                    checked={
                                      parseInt(editedReview.rating) === value
                                    }
                                    onChange={() => handleStarChange(value)}
                                  />
                                ))}
                              </div>
                              <br />
                              <input
                                type="text"
                                id="editTitle"
                                name="title"
                                placeholder="Your review title"
                                className="input input-bordered w-full max-w-xs titlemargin"
                                value={editedReview.title}
                                onChange={handleInputChange}
                              />
                              <br />
                              <textarea
                                id="editContent"
                                name="content"
                                className="textarea textarea-bordered textarea-sm w-full max-w-xs titlemargin"
                                placeholder="Type your review here"
                                value={editedReview.content}
                                onChange={handleInputChange}
                                required
                              ></textarea>
                              <br />
                              <br />
                              <button
                                type="submit"
                                className="btn btn-outline btn-primary"
                              >
                                Save Changes
                              </button>
                            </div>
                          </form>
                        </div>
                      </dialog>
                      <button className="btn btn-square btn-sm btn-secondary btn-outline ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <li className="alignleft">
                      <span>Username: {review.username}</span>
                      <div>
                        <StarRating star={review.rating} />{" "}
                        <span className="badge badge-md">
                          {formatDate(review.createdAt)}
                        </span>
                        {review.createdAt !== review.updatedAt && (
                          <span className="badge badge-ghost badge-sm inline">
                            Updated: {formatDate(review.updatedAt)}
                          </span>
                        )}
                      </div>
                      <div className="card-title">{review.title}</div>
                      <div>{review.content}</div>

                      {/* Add image display logic if needed */}
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="form-container">
          <CreateReviewForm recipeId={recipeId} onAddReview={handleAddReview} />
        </div>
      </div>
    </div>
  );
};

export default ReviewUser;
