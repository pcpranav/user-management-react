import React from "react";

import { reset, Field, reduxForm } from "redux-form";

//empty field validation
const required = (value) => (value ? undefined : "Required");

//email validation
const emailVerification = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

//phone validation
const phoneVerification = (value) =>
  value && value.length !== 10 ? "Invalid phone number" : undefined;

//pincode validation
const pincodeVerification = (value) =>
  value && value.length !== 6 ? "Invalid Pincode" : undefined;

//input field handler
const renderInputField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div className="mb-3">
    <label className="control-label">{label}</label>
    <div>
      <input {...input} type={type} className="form-control mb-1" />
      {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

//select field handler
const renderSelectField = ({
  input,
  label,
  meta: { touched, error, warning },
  children,
}) => (
  <div className="mb-3">
    <label className="control-label">{label}</label>
    <div>
      <select {...input} className="form-control mb-1">
        {children}
      </select>
      {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

//reset fields
const afterSubmit = (values, dispatch) => dispatch(reset("Details"));

//form logic
let FormScreen = (props) => {
  const { handleSubmit, pristine, submitting, reset } = props;
  return (
    <div>
      <center>
        <h1 className="display-3 p-1">Add User Details</h1>
      </center>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Field
              name="fullName"
              component={renderInputField}
              type="text"
              label="Name"
              validate={[required]}
            />
          </div>

          <div className="form-group">
            <Field
              name="gender"
              component={renderSelectField}
              label="Gender"
              validate={[required]}
            >
              <option></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unspecified">Prefer not to speak</option>
            </Field>
          </div>

          <div className="form-group">
            <Field
              name="email"
              component={renderInputField}
              type="email"
              label="Email"
              validate={[required, emailVerification]}
            />
          </div>

          <div className="form-group">
            <Field
              name="phone"
              component={renderInputField}
              type="tel"
              label="Phone"
              validate={[required, phoneVerification]}
            />
          </div>

          <div className="form-group">
            <Field
              name="pincode"
              component={renderInputField}
              type="number"
              label="Pincode"
              validate={[required, pincodeVerification]}
            />
          </div>

          <button
            className="btn btn-primary"
            type="submit"
            disabled={pristine || submitting}
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary m-3"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear Values
          </button>
        </form>
      </div>
    </div>
  );
};

//export form
export default reduxForm({
  form: "Details",
  enableReinitialize: true,
  onSubmitSuccess: afterSubmit,
})(FormScreen);
