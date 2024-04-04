import PropTypes from "prop-types";
import axiosInstance from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import formatDate from "../../utils/formatDate";
import IconButton from "../IconButton/IconButton";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";

const QRCodeCell = lazy(() => import("../QRCodeCell/QRCodeCell"));

/**
 * Component for rendering a single row in the table.
 * @param {object} props - Component props.
 * @param {object} props.item - The item data for the row.
 * @param {Function} props.handleEdit - Function to handle editing an item.
 * @param {Function} props.handleDelete - Function to handle deleting an item.
 * @returns {JSX.Element} Rendered table row component.
 */
function TableRow({ item, handleEdit, handleDelete }) {
  return (
    <tr key={item._id}>
      <td>{item.name}</td>
      <td>{`${formatDate(item.date.received_date)}/${
        item.quantity.received_quantity
      }`}</td>
      <td>
        {item.date.dispatched_date && item.quantity.dispatched_quantity
          ? `${formatDate(item.date.dispatched_date)}/${
              item.quantity.dispatched_quantity
            }`
          : "-------"}
      </td>
      <td>
        {item.quantity.received_quantity - item.quantity.dispatched_quantity}
      </td>
      <td>
        {item.date.dispatched_date &&
        item.quantity.received_quantity - item.quantity.dispatched_quantity ===
          0
          ? "Delivered"
          : "Pending"}
      </td>
      <td>
        <Suspense fallback={<div>Loading QR Code...</div>}>
          <QRCodeCell item={item} />
        </Suspense>
      </td>
      <td>
        <div className="adminPanelBtnWrapper">
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
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

/**
 * Component for rendering the table component.
 * @param {object} props - Component props.
 * @param {Array} props.data - The array of items to render in the table.
 * @param {Function} props.setData - Function to update the data array.
 * @param {boolean} props.isLoading - Indicates whether the data is loading.
 * @param {string} props.error - The error message, if any.
 * @returns {JSX.Element} Rendered table component.
 */
function TableComponent({ data, setData, isLoading, error }) {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

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
    <div className="tableComponent">
      {isLoading && <h4 className="loadingMessage">Loading...</h4>}
      {error && <h4 className="errorMessage">{error}</h4>}
      <table className="invoiceTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date Received/Quantity</th>
            <th>Date Dispatched/Quantity</th>
            <th>Pending Items</th>
            <th>Status</th>
            <th>QR Code (Click to download)</th>
            <th>Admin Panel</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <TableRow
              key={item._id}
              item={item}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

TableComponent.propTypes = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default TableComponent;
