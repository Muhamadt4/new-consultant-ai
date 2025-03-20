export const safeParseInt = (value) => {
  // Optimized number parsing logic
  const numericValue = Number(String(value).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(numericValue) ? numericValue : 0;
};

export const formatCompetitors = (text) => {
  // Improved competitor formatting
  return (text || "")
    .split("\n")
    .slice(0, 3)
    .map((comp) => comp.trim())
    .filter((comp) => comp.length > 0)
    .concat(["No competitors specified"]); // Fallback
};

export const validateBusinessData = (formValues, businessType) => {
  // Centralized validation logic
  const errors = {};
  const requiredFields = getFieldsForBusinessType(businessType)
    .filter((f) => f.required)
    .map((f) => f.id);

  requiredFields.forEach((field) => {
    if (!formValues[field]?.toString().trim()) {
      errors[field] = "This field is required";
    }
  });

  // Add numeric validation
  Object.entries(formValues).forEach(([key, value]) => {
    if (typeof value === "number" && value < 0) {
      errors[key] = "Must be a positive number";
    }
  });

  return errors;
};

// Additional helper functions...
