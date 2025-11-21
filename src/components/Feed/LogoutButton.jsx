import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import "./Feed.css";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout()); // Redux state reset
    navigate("/login"); // Redirect to login
  };
  return (
    <div className="logout-button" onClick={handleLogout}>
      Logout
    </div>
  );
};

export default LogoutButton;
