import PropTypes from "prop-types";
import axiosInstance from "../../axiosConfig";
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
 * @param {boolean} props.isLoggedIn - Indicates whether the user is logged in.
 * @param {Function} props.handleEdit - Function to handle editing an item.
 * @param {Function} props.handleDelete - Function to handle deleting an item.
 * @returns {JSX.Element} Rendered table row component.
 */
function TableRow({ item, isLoggedIn, handleEdit, handleDelete }) {
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
            disabled={!isLoggedIn}
            onClick={() => handleEdit(item._id)}
          />
          <IconButton
            className="adminBtn"
            variant="contained"
            shape="square"
            title="Delete"
            aria-label="Delete"
            icon={deleteIcon}
            disabled={!isLoggedIn}
            onClick={() => handleDelete(item._id)}
          />
        </div>
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
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
 * @param {boolean} props.isLoggedIn - Indicates whether the user is logged in.
 * @returns {JSX.Element} Rendered table component.
 */
function TableComponent({ data, setData, isLoading, error, isLoggedIn }) {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    axiosInstance
      .delete(`/inventory/${id}`)
      .then(() => {
        setData(data.filter((item) => item._id !== id));
      })
      .catch(() => {
        alert("Failed to delete item");
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
              isLoggedIn={isLoggedIn}
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
  isLoggedIn: PropTypes.bool.isRequired,
};

export default TableComponent;
