import React, { useState, useEffect } from "react";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const review = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(review);

    const rating = JSON.parse(localStorage.getItem("ratings")) || [];
    setRatings(rating);
  }, []);

  const reviewRatingObjectArray = [];
  var totalRating = 0;
  var avgRating;
  var totalRatingGiven = reviews.length;

  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    const rating = ratings[i];

    totalRating += rating;
    avgRating = (totalRating / reviews.length).toFixed(2);

    const reviewRatingObject = {
      review,
      rating,
    };

    reviewRatingObjectArray.push(reviewRatingObject);
  }

  return (
    <div className="Cart">    
      <h2>Reviews</h2>
      {reviewRatingObjectArray.map((item, index) => (
        <li key={index}>
          {item.review}  _____ Rating given: {item.rating}
        </li>
      ))}

      <h2>Average Rating: {avgRating}</h2>
      <h2>Total Rating given: {totalRatingGiven}</h2>
    </div>
  );
}

export default Reviews;
