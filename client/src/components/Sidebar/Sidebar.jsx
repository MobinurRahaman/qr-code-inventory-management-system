import "./Sidebar.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { useAuth } from "../../context/AuthContext";

/**
 * Sidebar component for rendering the sidebar navigation menu.
 * @param {object} props - Component props.
 * @param {boolean} props.isOpen - Indicates whether the sidebar is open.
 * @param {Function} props.handleClose - Function to handle closing the sidebar.
 * @returns {JSX.Element} Sidebar component.
 */
const Sidebar = ({ isOpen, handleClose }) => {
  const { isLoggedIn, setLogout } = useAuth();

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <div className="">
            <div className="qrCodeLinkWrapper column">
              <Link to="/generateqrcode" onClick={handleClose}>
                Generate QR Code
              </Link>
              <Link to="/scanqrcode" onClick={handleClose}>
                Scan QR Code
              </Link>
            </div>

            <div className="auth_buttons column">
              {isLoggedIn ? (
                <button
                  className="auth_btn fullWidth"
                  onClick={() => {
                    handleClose();
                    setLogout();
                  }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login">
                    <button
                      className="auth_btn fullWidth"
                      onClick={handleClose}
                    >
                      Login
                    </button>
                  </Link>
                  <Link to="/register">
                    <button
                      className="auth_btn fullWidth"
                      onClick={handleClose}
                    >
                      Register
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {isOpen && <div className="sidebar-backdrop" onClick={handleClose}></div>}
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Sidebar;
