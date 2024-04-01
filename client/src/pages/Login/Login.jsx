import "./Login.css";
import backIcon from "../../assets/arrow_back_ios_new.svg";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import { useAuth } from "../../context/AuthContext";
import Card from "../../components/Card/Card";
import IconButton from "../../components/IconButton/IconButton";
import Input from "../../components/Input/Input";

/**
 * Component for user login.
 * @returns {JSX.Element} Login component.
 */
export default function Login() {
  const navigate = useNavigate();
  const { isLoggedIn, setLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
     * Redirect to home page after successful login.
     */
    const redirectTimeout = setTimeout(() => {
      if (success) {
        navigate("/");
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
    setIsLoading(true);
    setSuccess(false);
    setError("");

    axiosInstance
      .post("/auth/login", formData)
      .then((res) => {
        setLogin(res.data);
        setSuccess(true);
      })
      .catch((err) => {
        // if (err.response.status === 400) {
        //   setError("Incorrect email or password");
        // } else {
        setError(err.response?.data?.message || "Server error"); // Set error state based on server response
        // }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <main>
      <Card>
        <Link to="/">
          <IconButton className="backBtn" title="Go back" icon={backIcon} />
        </Link>

        <form onSubmit={handleSubmit}>
          <h1 className="card_heading">Sign in</h1>

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

          {error && <p className="errorMessage">{error}</p>}

          <Input
            type="submit"
            name="login"
            value="Login"
            disabled={isLoading}
          />
        </form>

        {success && <p className="successStatus">Success</p>}
        {error && <p className="errorStatus">Error</p>}

        <p className="authFormSwitchText">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </Card>
    </main>
  );
}
