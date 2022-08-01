import './form-input.styles.scss'

const FormInput = ({ label, error, touched, labelText, ...otherProps }) => {
  return (
    <div className="form-input-container">
      {labelText && <p>{labelText}</p>}
      {error && touched && <span className='error-msg'>{error}</span>}
      <input
        className={`form-input ${error && touched ? 'has-error' : ''}`}
        {...otherProps}
        placeholder={label}
        autoComplete="on"
      />
    </div>
  )
}

export default FormInput
