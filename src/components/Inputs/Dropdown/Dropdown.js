import styles from './Dropdown.module.css'

const Dropdown = ({ initialValue, options=[], onChange = () => {}, disabled=false }) => {
  const handleChange = (e) => {
    let selected_option = options.find((option) => {
      return option.value.toString() === e.target.value.toString();
    });
    onChange(selected_option);
  };

  return (
    <select data-testid="component_inputs_dropdown" disabled={disabled} className={styles.Dropdown} value={initialValue?.value} onChange={handleChange}>
      {options.map(({ value, label }) => {
        return (
          <option data-testid="component_inputs_dropdown_option" key={value} value={value}>
            {label}
          </option>
        );
      })}
    </select>
  );
};

export default Dropdown;
