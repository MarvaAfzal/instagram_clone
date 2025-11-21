import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import "./Signup.css";
const Signup = ({ formData, handleChange, handleSubmit, error }) => {
  return (
    <div className="signup_page">
      <div className="signup_form">
        {/* Instagram Heading */}
        <div className="instagram_heading">
          <h1>Instagram</h1>
        </div>

        {/* Intro Text */}
        <p className="signup_text">
          Sign up to see photos and videos from your friends.
        </p>

        {/* Facebook Login */}
        <div className="facebook_login">
          <FontAwesomeIcon icon={faFacebook} size="1x" color="#1877F2" />
          <a href="#">Log in with Facebook</a>
        </div>

        {/* OR Section */}
        <div className="or_section">
          <div className="line"></div>
          <div>OR</div>
          <div className="line"></div>
        </div>

        {/* Signup Form */}
        <form
          className="form_section"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="new-username"
            required
          />
          <input
            type="text"
            name="fullname"
            placeholder="Fullname"
            value={formData.fullname}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {/* Error Message */}
          {error && <p className="error_text">{error}</p>}
          {/* Info Text */}
          <p className="info_text">
            People who use our services may have uploaded your contact
            information to Instagram. <a href="">Learn More</a>
          </p>

          {/* Terms Text */}
          <p className="terms_text">
            By signing up, you agree to our <a href="">Terms</a>,{" "}
            <a href="">Privacy Policy</a> and <a href="">Cookies Policy</a>.
          </p>

          <button type="submit">Sign up</button>
        </form>

        {/* Switch to Login */}
        <div className="register_section">
          <p>
            Have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
