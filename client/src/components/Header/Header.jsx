import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import menuIcon from "../../assets/menu.svg";
import useWindowWidth from "../../hooks/useWindowWidth.js";
import "./Header.css";

/**
 * Component for rendering the header of the application.
 * @param {object} props - Component props.
 * @param {Function} props.onSidebarToggle - Function to toggle the sidebar.
 * @returns {JSX.Element} Header component.
 */
export default function Header({ onSidebarToggle }) {
  const windowWidth = useWindowWidth();
  const { isLoggedIn, setLogout } = useAuth();

  return (
    <header>
      <nav className="header_nav">
        <h1 className="app_name">
          <Link to="/">Inventory Management System</Link>
        </h1>

        {windowWidth > 900 ? (
          <>
            <div className="qrCodeLinkWrapper">
              <Link to="/generateqrcode">Generate QR Code</Link>
              <Link to="/scanqrcode">Scan QR Code</Link>
            </div>

            <div className="auth_buttons">
              {isLoggedIn ? (
                <button className="auth_btn" onClick={setLogout}>
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login">
                    <button className="auth_btn">Login</button>
                  </Link>
                  <Link to="/register">
                    <button className="auth_btn">Register</button>
                  </Link>
                </>
              )}
            </div>
          </>
        ) : (
          <button
            className="iconBtn menu_btn"
            title="Menu"
            aria-label="Menu"
            aria-haspopup="true"
            onClick={onSidebarToggle}
          >
            <img src={menuIcon} alt="menu" />
          </button>
        )}
      </nav>
    </header>
  );
}

Header.propTypes = {
  onSidebarToggle: PropTypes.func.isRequired,
};
