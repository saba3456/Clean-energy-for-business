import { useState } from "react";
import { Link } from "react-router-dom";
// import "../CSSContents/Footer.css";


function Footer() {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewArray = JSON.parse(localStorage.getItem('reviews')) || [];
    const ratingArray = JSON.parse(localStorage.getItem('ratings')) || [];

    reviewArray.push(review);
    ratingArray.push(rating);

    localStorage.setItem('reviews', JSON.stringify(reviewArray));
    localStorage.setItem('ratings', JSON.stringify(ratingArray));

    window.location.reload();
    // setReview("");
    // setRating(0);
  };

  return (
    <footer className="footer">
      <p className="footer-message">
        Join the Adventure to save the world by going clean!
      </p>
      <div className="footer-links">
        <div className="footer-titles">
          <a style={{ textDecoration: "none" }} href="/AboutUs">
            <h2 className="footer-links-title">About Us</h2>
          </a>
          <a style={{ textDecoration: "none" }} href="/ContactUs">
            <h2 className="footer-links-title">Contact Us</h2>
          </a>
          <a style={{ textDecoration: "none" }} href="/Faq">
            <h2 className="footer-links-title">FAQ</h2>
          </a>
        </div>
        <form onSubmit={handleSubmit}>
        <h2>Add Review</h2>
        <label htmlFor="review">Review:</label>
        <textarea id="review" value={review} onChange={handleReviewChange} />

        <br></br>
        <select id="rating" value={rating} onChange={handleRatingChange}>
          <option value={0}>-- Select Rating --</option>
          <option value={1}>★</option>
          <option value={2}>★★</option>
          <option value={3}>★★★</option>
          <option value={4}>★★★★</option>
          <option value={5}>★★★★★</option>
        </select>
        <br></br>
        <button type="submit">Submit</button>
        </form>
        <div className="footer-link-section">
          <h2 className="footer-link-header">Social Media</h2>
          <div className="social-icons-wrap">
            <a className="footer-social-atag" href="https://facebook.com">
              <img
                src="images/facebookLogo.png"
                height={30}
                width={30}
                alt="Facebook logo"
              />
            </a>
            <a className="footer-social-atag" href="https://instagram.com">
              <img
                src="images/IgLogo.png"
                height={30}
                width={30}
                alt="Instagram logo"
              />
            </a>
            <a className="footer-social-atag" href="https://twitter.com/">
              <img
                src="images/TwitterLogo.png"
                height={30}
                width={30}
                alt="Twitter logo"
              />
            </a>
          </div>
        </div>
      </div>
      
      <Link ></Link>
      <small className="website-rights">Group26 © 2023</small>
    </footer>
  );
}

export default Footer;
