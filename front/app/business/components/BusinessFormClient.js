"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FormField from "./FormField";
import FormTabs from "./FormTabs";
import { useBusinessContext } from "../../context/BusinessContext";
import { getFieldsForBusinessType } from "../../data/businessForms";
import {
  getVisibleFields,
  formSubmissionText,
} from "../../data/businessFormConfig";

export default function BusinessFormClient({ businessType = "Real Estate" }) {
  const router = useRouter();

  // Use our business context
  const {
    formValues,
    handleChange,
    setBusinessType,
    processFormData,
    validateFormData,
    validationErrors,
  } = useBusinessContext();

  // Set the business type from URL parameter
  useEffect(() => {
    setBusinessType(businessType);
  }, [businessType, setBusinessType]);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState("all");

  // Get form fields based on business type
  const formFields = getFieldsForBusinessType(businessType);

  // Handle form field changes using context
  const onFieldChange = (fieldId, value) => {
    handleChange(fieldId, value);

    // If form has been submitted, we're actively validating
    if (submitted) {
      // Force immediate validation of this field
      validateFormData();
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set submitted to true right away to show validation errors immediately
    setSubmitted(true);
    setIsSubmitting(true);

    // Use our context validation function
    const isValid = validateFormData();

    // Delay slightly to ensure state updates are processed
    setTimeout(() => {
      if (isValid) {
        (async () => {
          try {
            // Process the form data into the required JSON format using our context
            await processFormData();

            // Navigate to analytics page
            router.push("/analytics");
          } catch (error) {
            console.error("Error submitting form:", error);
            setIsSubmitting(false);
          }
        })();
      } else {
        console.error("Form validation failed:", validationErrors);

        // Scroll to the first error
        const firstErrorField = document.querySelector(".border-red-500");
        if (firstErrorField) {
          firstErrorField.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }

        setIsSubmitting(false);
      }
    }, 100); // Small delay to allow React state updates to propagate
  };

  // Use the validation errors directly from the context
  useEffect(() => {
    if (submitted) {
      // This ensures we show errors from the context
      setErrors(validationErrors);
    }
  }, [validationErrors, submitted]);

  // Form fields should show errors directly from validationErrors, not our local errors
  const getFieldError = (fieldId) => {
    if (!submitted) return null;
    return validationErrors[fieldId] || null;
  };

  // Get visible fields using the function from the data file
  const visibleFields = getVisibleFields(activeSection, formFields);

  // Split visible fields into regular fields and textarea fields
  const textareaFields = visibleFields.filter(
    (field) => field.type === "textarea"
  );
  const regularFields = visibleFields.filter(
    (field) => field.type !== "textarea"
  );

  return (
    <section className="w-full min-h-screen p-4 sm:p-6 xl:p-8 pb-20">
      <h1 className="text-[2rem] text-center xl:text-left xl:text-[3.5rem] text-dark-yellow fjalla-one px-2 sm:px-4 xl:px-[3rem] pt-[3rem] pb-[2rem] xl:pt-[4rem] xl:pb-[3rem]">
        {businessType} Business
      </h1>

      <div className="max-w-[95%] mx-auto">
        {/* Form Sections Tabs */}
        <FormTabs
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <form
          onSubmit={handleSubmit}
          className="bg-[#1a1d24] rounded-xl p-6 shadow-xl"
        >
          {/* Regular Input Fields */}
          {regularFields.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
              {regularFields.map((field) => (
                <FormField
                  key={field.id}
                  field={field}
                  value={formValues[field.id]}
                  onChange={onFieldChange}
                  error={getFieldError(field.id)}
                />
              ))}
            </div>
          )}

          {/* Textarea Fields - These get their own row for better spacing */}
          {textareaFields.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {textareaFields.map((field) => (
                <FormField
                  key={field.id}
                  field={field}
                  value={formValues[field.id]}
                  onChange={onFieldChange}
                  error={getFieldError(field.id)}
                />
              ))}
            </div>
          )}

          {/* Errors Summary */}
          {submitted && Object.keys(validationErrors).length > 0 && (
            <div className="mt-8 p-4 bg-red-900/30 border border-red-500 rounded-lg">
              <h3 className="text-red-500 text-lg font-semibold mb-2">
                {formSubmissionText.errorTitle}
              </h3>
              <ul className="list-disc list-inside text-red-400">
                {Object.keys(validationErrors).map((fieldId) => {
                  const fieldLabel =
                    formFields.find((f) => f.id === fieldId)?.label || fieldId;
                  return (
                    <li key={fieldId}>
                      {fieldLabel}: {validationErrors[fieldId]}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Submit and Sample Data Buttons */}
          <div className="flex items-center justify-center w-full gap-5 mt-8">
            {/* Navigation Button */}
            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="bg-transparent border border-gray-500 text-white py-3 px-8 rounded-lg text-lg hover:bg-[#2a2f38] transition-all"
              >
                Back to Home
              </button>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 justify-center items-center mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`py-3 px-12 rounded-lg text-xl transition-all w-full lg:w-auto flex items-center justify-center gap-2 fjalla-one ${
                  isSubmitting
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : "bg-dark-yellow text-[#1e2229] hover:bg-yellow-500"
                }`}
              >
                {isSubmitting && (
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                )}
                {isSubmitting
                  ? formSubmissionText.analyzingButtonText
                  : formSubmissionText.submitButtonText}
              </button>
            </div>

            {isSubmitting && (
              <div className="mt-4 text-center text-gray-400 text-sm">
                {formSubmissionText.analyzing}
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
