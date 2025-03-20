"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getFieldsForBusinessType } from "../data/businessForms";
import { validateBusinessForm } from "./validation/businessFormValidation";
import { processBusinessData } from "./processors/businessDataProcessor";

// Create the context
const BusinessContext = createContext();

// Create a provider component
export function BusinessProvider({ children }) {
  const [businessType, setBusinessTypeState] = useState("Real Estate");
  const [formValues, setFormValues] = useState({});
  const [businessData, setBusinessData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Reset form values when business type changes
  useEffect(() => {
    setFormValues({});
    setValidationErrors({});
  }, [businessType]);

  // Function to update form values
  const handleChange = (fieldId, value) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    // Clear validation error for this field if it exists
    if (validationErrors[fieldId]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  // Function to set business type
  const setBusinessType = (type) => {
    setBusinessTypeState(type);
  };

  // Validate form data
  const validateFormData = () => {
    // Validate the form and get errors
    const errors = validateBusinessForm(businessType, formValues);

    // Set validation errors
    setValidationErrors(errors);

    // Return whether validation passed
    return Object.keys(errors).length === 0;
  };

  // Process form data into the required JSON structure
  const processFormData = async () => {
    try {
      setIsLoading(true);

      // Validate the form first
      if (!validateFormData()) {
        console.error("Form validation failed:", validationErrors);
        setIsLoading(false);
        throw new Error("Form validation failed");
      }

      // Process the form data
      const processedData = await processBusinessData(businessType, formValues);

      // Update the context state
      setBusinessData(processedData);

      // Log the data to the console
      console.log(
        "Final Business Data:",
        JSON.stringify(processedData, null, 2)
      );

      setIsLoading(false);
      return processedData;
    } catch (error) {
      console.error("Error processing form data:", error);
      setIsLoading(false);

      // Set a minimal business data object with error information
      setBusinessData({
        business_name: formValues.businessName || "Business Name",
        business_type: (formValues.businessSubtype || businessType).toString(),
        error: {
          message: error.message,
          occurred_at: new Date().toISOString(),
        },
      });

      // Still throw the error for external error handling
      throw error;
    }
  };

  return (
    <BusinessContext.Provider
      value={{
        businessType,
        businessData,
        formValues,
        validationErrors,
        isLoading,
        handleChange,
        setBusinessType,
        processFormData,
        validateFormData,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

// Custom hook to use the context
export function useBusinessContext() {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error(
      "useBusinessContext must be used within a BusinessProvider"
    );
  }
  return context;
}
