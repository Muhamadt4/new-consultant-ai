/**
 * Business form validation utilities
 */
import { getFieldsForBusinessType } from "../../data/businessForms";

/**
 * Validate form data based on business type
 *
 * @param {string} businessType - Type of business
 * @param {object} formValues - Current form values
 * @returns {object} Validation errors object
 */
export const validateBusinessForm = (businessType, formValues) => {
  const errors = {};
  const formFields = getFieldsForBusinessType(businessType);

  // Validate required fields
  formFields.forEach((field) => {
    if (field.required) {
      const value = formValues[field.id];

      if (
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        errors[field.id] = "This field is required";
      }
    }
  });

  // Validate number fields
  formFields.forEach((field) => {
    if (field.type === "number" && formValues[field.id]) {
      const value = formValues[field.id];
      if (isNaN(Number(value))) {
        errors[field.id] = "Must be a valid number";
      } else if (Number(value) < 0) {
        errors[field.id] = "Must be a positive number";
      }
    }
  });

  return errors;
};
