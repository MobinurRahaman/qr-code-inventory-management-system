import backIcon from "../../assets/arrow_back_ios_new.svg";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";
import { useAuth } from "../../context/AuthContext";
import Card from "../../components/Card/Card";
import IconButton from "../../components/IconButton/IconButton";
import Input from "../../components/Input/Input";

/**
 * Component for user registration.
 * @returns {JSX.Element} Register component.
 */
export default function Register() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  /**
   * Handler for input field changes.
   * @param {object} e - Event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    /**
     * Redirect to login page after successful registration.
     */
    const redirectTimeout = setTimeout(() => {
      if (success) {
        navigate("/login");
      }
    }, 3000);
    return () => clearTimeout(redirectTimeout);
  }, [success, navigate]);

  /**
   * Handler for form submission.
   * @param {object} e - Event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset form data
    setSuccess(false);
    setError("");

    if (formData.password !== formData.confirm_password) {
      alert("Passwords don't match");
      return;
    }

    setIsLoading(true);

    axiosInstance
      .post("/auth/register", formData)
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setError("This email id already exists");
        } else {
          setError(err.response?.data?.message || "Server error"); // Set error state based on server response
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <main>
      <Card>
        <Link to="/login">
          <IconButton className="backBtn" title="Go back" icon={backIcon} />
        </Link>

        <form onSubmit={handleSubmit}>
          <h1 className="card_heading">Create Account</h1>

          <Input
            type="text"
            id="name"
            name="name"
            label="Name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            type="email"
            id="email"
            name="email"
            label="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            type="password"
            id="password"
            name="password"
            label="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <Input
            type="password"
            id="confirm_password"
            name="confirm_password"
            label="Confirm password"
            required
            value={formData.confirm_password}
            onChange={handleChange}
          />

          {error && <p className="errorMessage">{error}</p>}

          <Input
            type="submit"
            value={isLoading ? "Registering..." : "Register"}
            disabled={isLoading}
          />
        </form>

        {success && <h4 className="successStatus">Success</h4>}
        {error && <h4 className="errorStatus">Error</h4>}

        <p className="authFormSwitchText">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Card>
    </main>
  );
}
