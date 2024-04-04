import React, { Suspense } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import IconButton from "../IconButton/IconButton";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";

const LazyQRCodeCell = React.lazy(() => import("../QRCodeCell/QRCodeCell"));

/**
 * Component representing the mobile view of invoice items.
 * @param {object} props - Component props.
 * @param {array} props.data - Array of invoice items data.
 * @param {Function} props.setData - Function to update invoice items data.
 * @param {boolean} props.isLoading - Flag indicating if data is being loaded.
 * @param {string} props.error - Error message, if any.
 * @returns {JSX.Element} MobileComponent.
 */
function MobileComponent({ data, setData, isLoading, error }) {
  const navigate = useNavigate();

  /**
   * Navigates to the edit page for a specific invoice item.
   * @param {string} id - ID of the invoice item to edit.
   */
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  /**
   * Deletes an invoice item.
   * @param {string} id - ID of the invoice item to delete.
   */

  const handleDelete = (id) => {
    // Get token from local storage
    const token = localStorage.getItem("token");

    axiosInstance
      .delete(`/inventory/${id}`, { token })
      .then(() => {
        setData(data.filter((item) => item._id !== id));
      })
      .catch((err) => {
        // If the token is expired or invalid
        if (err.response.status === 401) {
          navigate("/login");
        } else {
          alert(err.response.data.message);
        }
      });
  };

  return (
    <div className="mobileComponent">
      {isLoading && <h4 className="loadingMessage">Loading...</h4>}
      {error && <h4 className="errorMessage">{error}</h4>}
      <div className="invoiceItems">
        {data?.map((item) => (
          <div key={item._id} className="invoiceItem">
            <div className="invoiceItemHeader">
              <Row title="Name" value={item.name} />
              <Row
                title="Date Received/Quantity"
                value={`${formatDate(item.date.received_date)}/${
                  item.quantity.received_quantity
                }`}
              />
              <Row
                title="Date Dispatched/Quantity"
                value={
                  item.date.dispatched_date && item.quantity.dispatched_quantity
                    ? `${formatDate(item.date.dispatched_date)}/${
                        item.quantity.dispatched_quantity
                      }`
                    : "-------"
                }
              />
              <Row
                title="Pending Items"
                value={
                  item.quantity.received_quantity -
                  item.quantity.dispatched_quantity
                }
              />
              <Row
                title="Status"
                value={
                  item.date.dispatched_date &&
                  item.quantity.received_quantity -
                    item.quantity.dispatched_quantity ===
                    0
                    ? "Delivered"
                    : "Pending"
                }
              />
            </div>
            <Suspense fallback={<div>Loading QR Code...</div>}>
              <Row
                title="QR Code (Click to download)"
                value={<LazyQRCodeCell item={item} />}
              />
            </Suspense>
            <div className="row">
              <div>Admin panel</div>
              <div className="mobile_admin_panel_btn_wrapper">
                <IconButton
                  className="adminBtn"
                  variant="contained"
                  shape="square"
                  title="Edit"
                  aria-label="Edit"
                  icon={editIcon}
                  onClick={() => handleEdit(item._id)}
                />
                <IconButton
                  className="adminBtn"
                  variant="contained"
                  shape="square"
                  title="Delete"
                  aria-label="Delete"
                  icon={deleteIcon}
                  onClick={() => handleDelete(item._id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

MobileComponent.propTypes = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

/**
 * Component representing a row in the mobile invoice item view.
 * @param {object} props - Component props.
 * @param {string} props.title - Title of the row.
 * @param {string|JSX.Element} props.value - Value of the row.
 * @returns {JSX.Element} Row component.
 */
const Row = ({ title, value }) => (
  <div className="row">
    <div>{title}</div>
    <div>{value}</div>
  </div>
);

Row.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default MobileComponent;
