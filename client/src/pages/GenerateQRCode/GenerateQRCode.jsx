import { useState } from "react";
import axiosInstance from "../../config/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import IconButton from "../../components/IconButton/IconButton";
import backIcon from "../../assets/arrow_back_ios_new.svg";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";

/**
 * Component for generating QR code for inventory items.
 * @returns {JSX.Element} GenerateQRCode component.
 */
const GenerateQRCode = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    quantity: "",
  });

  const [isLoading, setIsLoading] = useState(false);
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
  };

  /**
   * Handler for form submission.
   * @param {object} e - Event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset form data
    setSuccess(false);
    setError("");
    setIsLoading(true);

    axiosInstance
      .post("/inventory", formData)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Server error"); // Set error state based on server response
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Card>
      <Link to="/">
        <IconButton className="backBtn" title="Go back" icon={backIcon} />
      </Link>
      <form onSubmit={handleSubmit}>
        <h1 className="card_heading">Generate QR Code</h1>
        <Select
          id="name"
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          required
        >
          <option value="C1">C1</option>
          <option value="C2">C2</option>
          <option value="C3">C3</option>
          <option value="C4">C4</option>
          <option value="C5">C5</option>
        </Select>

        <Input
          required
          type="date"
          id="date"
          name="date"
          label="Date"
          value={formData.date}
          onChange={handleChange}
          max={new Date().toISOString().split("T")[0]} // Set max date to current date
        />

        <Input
          required
          type="number"
          id="quantity"
          name="quantity"
          label="Quantity"
          value={formData.quantity}
          onChange={handleChange}
        />

        {error && <p className="errorMessage">{error}</p>}
        <Input type="submit" value="Generate" disabled={isLoading} />
      </form>

      {success && <h4 className="successSatatus">Success</h4>}
      {error && <h4 className="errorStatus">Error</h4>}
    </Card>
  );
};

export default GenerateQRCode;
