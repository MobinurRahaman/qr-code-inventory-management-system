import PropTypes from "prop-types";
import "./Card.css";

/**
 * Component representing a card container.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Child components.
 * @returns {JSX.Element} Card component.
 */
export default function Card({ children }) {
  return <div className="card">{children}</div>;
}

Card.propTypes = {
  children: PropTypes.node,
};
