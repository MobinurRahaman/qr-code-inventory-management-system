import PropTypes from "prop-types";
import "./Select.css";

/**
 * Select component for rendering a dropdown menu.
 * @param {object} props - Component props.
 * @param {string} props.id - The ID attribute of the select element.
 * @param {string} props.name - The name attribute of the select element.
 * @param {string} props.label - The label for the select element.
 * @param {React.ReactNode} props.children - The options to be rendered within the select element.
 * @param {boolean} props.required - Indicates whether the select element is required.
 * @param {string|number} props.value - The current value of the select element.
 * @param {Function} props.onChange - The function to be called when the select element value changes.
 * @param {string} props.className - Additional CSS classes to be applied to the select element.
 * @param {boolean} props.disabled - Indicates whether the select element is disabled.
 * @param {object} props.style - Additional inline styles to be applied to the select element.
 * @returns {JSX.Element} Select component.
 */
function Select({
  id,
  name,
  label,
  children,
  required,
  value,
  onChange,
  className,
  disabled,
  style = {},
}) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className={`select ${className}`}
        disabled={disabled}
        style={style}
      >
        {children}
      </select>
    </>
  );
}

Select.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.node,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

Select.defaultProps = {
  required: false,
  value: "",
  className: "",
  disabled: false,
  style: {},
};

export default Select;
