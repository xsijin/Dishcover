import React, { useEffect, useState } from "react";
import StarRating from './StarRating'
import { Link } from "react-router-dom";
import "./ReviewPage.css";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [recipeId, setRecipeId] = useState("65a22d112404af18c1bcf97a");
  const [recipeName, setRecipeName] = useState("");

  useEffect(() => {
    const fetchRecipeDetails = async () => {
        try {
          const response = await fetch(`http://localhost:3000/recipes/show/${recipeId}`);
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
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options);
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

  return (
    <div>
      <h2 className="recipename">Reviews for Recipe: {recipeName}</h2>
      {reviews.length === 0 ? (
        <p>No reviews available for this recipe.</p>
      ) : (
        <div>
        <div><StarRating star={calculateAverageRating()} /> ({reviews.length} reviews) | <Link to="/users/show">View Recipe</Link></div>
        <ul>
          {reviews.map((review) => (
            <div key={review._id} className="card w-96 bg-base-100 shadow-xl bottommargin">
                    <div className="card-actions justify-end">
                    <button className="btn btn-square btn-sm btn-primary btn-outline" onClick={()=>document.getElementById('my_modal_3').showModal()}>Edit</button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click on ✕ button to close</p>
  </div>
</dialog>
      <button className="btn btn-square btn-sm btn-secondary btn-outline">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <button className="btn btn-square btn-sm btn-accent btn-outline">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
</button>
    </div>
            <li className="alignleft">
              <div>Username: {review.username}</div>
              <div><StarRating star={review.rating} /> <span className="badge badge-md">{formatDate(review.createdAt)}</span></div>
              <div className="card-title">{review.title}</div>
              <div>{review.content}</div>
              
              {review.createdAt !== review.updatedAt && (
        <div className="badge badge-ghost badge-sm">Last Updated: {formatDate(review.updatedAt)}</div>
      )}
              {/* Add image display logic if needed */}
              
            </li></div>
          ))}
        </ul></div>
      )}
    </div>
  );
};

export default ReviewPage;