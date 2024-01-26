import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { Link, useParams } from "react-router-dom";
import CreateReviewForm from "./CreateReviewForm";
import { getToken } from "../../util/security";
import "./ReviewPage.css";

const ReviewLanding = ({ recipeId: propRecipeId }) => {
  const params = useParams();
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [recipeId, setRecipeId] = useState(propRecipeId || params.recipeId);
  const [recipeName, setRecipeName] = useState("");
  const [editedReview, setEditedReview] = useState({
    // Initialize with empty values or default values
    _id: "",
    title: "",
    content: "",
    rating: 5,
    images: "",
  });
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  useEffect(() => {
    const token = getToken();
    const payload = token
      ? JSON.parse(atob(token.split(".")[1])).payload
      : null;
    console.log("payload", payload);
    if (payload && payload.userId) {
      setUserId(payload.userId);
      setUser(payload);

      // Combine user and userLastName into a single string
      const combinedUsername = `${payload.user} ${payload.userLastName}`;
      setUsername(combinedUsername);
    }
  }, []);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `https://ga-p3-backend.onrender.com/recipes/showone/${recipeId}`
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
          `https://ga-p3-backend.onrender.com/reviews/show/${recipeId}`
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
    if (!Array.isArray(reviewsArray) || reviews.length === 0) {
      return 0; // Default to 0 if reviews is not an array or is empty
    }
    const totalRating = reviewsArray.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return totalRating / reviews.length;
  };

  // Convert object values to an array (reason: backend returns an object, but map/reduce functions require an array)
  const reviewsArray = Object.values(reviews);

  // Edit button - opens the modal
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

  // calls the patch function to edit review
  const handlePatchSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (!token) throw new Error("Token not found");

      const response = await fetch(
        `https://ga-p3-backend.onrender.com/reviews/update/${selectedReviewId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the authorization header
          },
          body: JSON.stringify({
            title: editedReview.title,
            content: editedReview.content,
            rating: editedReview.rating,
            images: editedReview.images,
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
        `https://ga-p3-backend.onrender.com/reviews/show/${recipeId}`
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

  // Delete feature - opens modal
  const handleDeleteClick = async (reviewId) => {
    setReviewToDelete(reviewId);
    document.getElementById("deleteConfirmationModal").showModal();
  };

  // calls the delete function to delete review
  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (!token) throw new Error("Token not found");

      const response = await fetch(
        `https://ga-p3-backend.onrender.com/reviews/delete/${reviewToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Include the authorization header
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }

      // Update the state to reflect the changes immediately
      const updatedReviews = reviews.filter(
        (review) => review._id !== reviewToDelete
      );
      setReviews(updatedReviews);

      // Close the confirmation modal upon confirmation to delete
      document.getElementById("deleteConfirmationModal").close();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelDelete = () => {
    // Reset the reviewToDelete state
    setReviewToDelete(null);
    // Close the confirmation modal
    document.getElementById("deleteConfirmationModal").close();
  };

  // create review function
  const handleAddReview = async (newReview) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (!token) throw new Error("Token not found");

      const response = await fetch(
        `https://ga-p3-backend.onrender.com/reviews/create/${recipeId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the authorization header
          },
          body: JSON.stringify({
            user: userId,
            title: newReview.title,
            content: newReview.content,
            rating: newReview.rating,
            images: newReview.images,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add review");
      }

      // Fetch the updated reviews again to reflect the changes immediately
      const updatedResponse = await fetch(
        `https://ga-p3-backend.onrender.com/reviews/show/${recipeId}`
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
      <h2 className="recipename">
        Reviews for{" "}
        <Link to={`/PublicRecipeDetails/${recipeId}`}>{recipeName}</Link>
      </h2>
      <div>
        <StarRating star={calculateAverageRating()} />{" "}
        {reviewsArray.every((review) => !review._id) ? 0 : reviews.length}{" "}
        reviews
      </div>
      <div className="flex-container">
        <div className="reviews-container">
          {reviewsArray.every((review) => !review._id) ? (
            <div key="no-reviews-message">
              No reviews available for this recipe.
            </div>
          ) : (
            <ul>
              {reviewsArray.map((review) => (
                <li
                  key={review._id}
                  className="card max-w-xl mx-auto bg-base-100 shadow-xl bottommargin"
                >
                  {/* only admin or owner of review have access to edit/delete review */}

                  <div className="card-actions justify-end">
                    {String(userId) === String(review.user) ||
                    (user && user.is_admin) ? (
                      <div className="dropdown dropdown-bottom dropdown-end">
                        <div tabIndex={0} role="button" className="btn m-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="rgba(61, 120, 101, 1)"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                            />
                          </svg>
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          <li onClick={() => handleEditClick(review)}>
                            <a>Edit Review</a>
                          </li>
                          <li onClick={() => handleDeleteClick(review._id)}>
                            <a>Delete Review</a>
                          </li>
                        </ul>
                      </div>
                    ) : null}

                    {/* start of edit modal */}
                    <dialog id="my_modal_3" className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          {/* button to close modal without any changes */}
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

                            <textarea
                              id="editContent"
                              name="content"
                              className="textarea textarea-bordered textarea-sm w-full max-w-xs"
                              placeholder="Share your review here"
                              value={editedReview.content}
                              onChange={handleInputChange}
                              required
                            ></textarea>

                            <input
                              type="text"
                              title="Please include only 1 photo URL. We suggest using an image hosting site such as Imgur. Image will not appear if the link is broken."
                              id="editImage"
                              name="images"
                              placeholder="Add photo URL (if any)"
                              className="input input-bordered input-sm w-full max-w-xs"
                              value={editedReview.images}
                              onChange={handleInputChange}
                            />

                            <br />
                            <br />
                            <br />
                            <button type="submit" className="btn btn-submit">
                              Save Changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </dialog>
                    {/* end of edit modal*/}

                    {/* start of delete modal */}
                    <dialog id="deleteConfirmationModal" className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          {/* button to close modal without any changes */}
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <h3 className="font-bold text-lg">Confirm Deletion</h3>
                        <p>
                          Are you sure you want to delete this review?
                          <br />
                          This action cannot be undone.
                        </p>
                        <div className="py-4">
                          <button
                            className="btn btn-outline btn-error"
                            onClick={() => handleConfirmDelete()}
                          >
                            Yes, Delete
                          </button>
                          &nbsp;
                          <button
                            className="btn btn-ghost"
                            onClick={() => handleCancelDelete()}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </dialog>
                  </div>
                  {/* end of delete modal */}

                  {/* display review */}
                  <div className="aligncenter">
                    <span>
                      <Link to={`/users/${review.user}`}>
                        {review.userFirstName} {review.userLastName}
                      </Link>
                    </span>
                    <div>
                      <StarRating star={review.rating} />
                      <br />
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
                    <div>
                      <span className="quotation">&ldquo;</span>
                      {review.content}
                      <span className="quotation">&rdquo;</span>
                    </div>
                    <br />
                    {/* Add image display logic if needed */}
                    <div>
                      {review.images &&
                        review.images.length > 0 &&
                        review.images[0] !== "" && (
                          <img
                            src={review.images}
                            alt="Photo unavailable, please review broken photo URL."
                          />
                        )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* add review form if user is logged in*/}
        {userId ? (
          <div className="form-container">
            <CreateReviewForm
              onAddReview={handleAddReview}
              userId={userId}
              username={username}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ReviewLanding;
