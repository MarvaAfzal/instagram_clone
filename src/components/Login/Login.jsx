import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import instagram_pro from "../../assets/instagram_pro.png";
import "./Login.css";

const Login = ({ credentials, handleChange, handleSubmit, error }) => {
  return (
    <div className="login_page">
      {/* Image Section */}
      <div className="instagram_pro_img">
        <img src={instagram_pro} alt="Instagram Preview" />
      </div>

      {/* Login Section */}
      <div className="login_form">
        <div className="instagram_heading">
          <h1>Instagram</h1>
        </div>

        {/* Login Form */}
        <form className="form_section" onSubmit={handleSubmit}>
          <input
            type="text"
            name="emailOrusername"
            placeholder="email or username"
            value={credentials.emailOrusername||""}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password || ""}
            onChange={handleChange}
          />
          {error && <p className="error_text">{error}</p>}
          <button type="submit">Log in</button>
        </form>

        {/* OR Section */}
        <div className="or_section">
          <div className="line"></div>
          <div>OR</div>
          <div className="line"></div>
        </div>

        {/* Facebook Login */}
        <div className="facebook_login">
          <FontAwesomeIcon icon={faFacebook} size="1x" color="#1877F2" />
          <a href="#">Log in with Facebook</a>
        </div>

        {/* Forgot Password */}
        <a href="#" className="forgot_password">
          Forgot password?
        </a>

        {/* Register Section */}
        <div className="register_section">
          <p>
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
