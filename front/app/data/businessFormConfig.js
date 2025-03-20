// Configuration data for the business form

// Form tabs configuration
export const formTabs = [
  { id: "all", label: "All Fields" },
  { id: "basic", label: "Basic Info" },
  { id: "financial", label: "Financial" },
  { id: "marketing", label: "Marketing" },
  { id: "operational", label: "Operational" },
];

// Field grouping logic for different sections
export const fieldGroupingRules = {
  // Fields that belong to the basic info section
  basicInfo: (field) =>
    ["businessName", "city", "country"].includes(field.id) ||
    field.id.includes("Type") ||
    field.id.includes("Subtype"),

  // Fields that belong to the financial section
  financial: (field) =>
    field.id.includes("revenue") ||
    field.id.includes("sales") ||
    field.id.includes("price") ||
    field.id.includes("value") ||
    field.id.includes("budget") ||
    field.id.includes("cost") ||
    field.id.includes("income") ||
    field.id.includes("rate"),

  // Fields that belong to the marketing section
  marketing: (field) =>
    field.id.includes("marketing") ||
    field.id.includes("customer") ||
    field.id.includes("demographic"),

  // Fields that don't belong to any of the above sections
  operational: (field, basicInfoFields, financialFields, marketingFields) =>
    !basicInfoFields.includes(field) &&
    !financialFields.includes(field) &&
    !marketingFields.includes(field),
};

// Get visible fields based on active section and all form fields
export function getVisibleFields(activeSection, formFields) {
  // Group fields by section
  const basicInfoFields = formFields.filter(fieldGroupingRules.basicInfo);
  const financialFields = formFields.filter(fieldGroupingRules.financial);
  const marketingFields = formFields.filter(fieldGroupingRules.marketing);
  const operationalFields = formFields.filter((field) =>
    fieldGroupingRules.operational(
      field,
      basicInfoFields,
      financialFields,
      marketingFields
    )
  );

  // Return appropriate fields based on active section
  switch (activeSection) {
    case "basic":
      return basicInfoFields;
    case "financial":
      return financialFields;
    case "marketing":
      return marketingFields;
    case "operational":
      return operationalFields;
    default:
      return formFields;
  }
}

// Form submission helper text
export const formSubmissionText = {
  analyzing:
    "Generating insights , please wait...",
  submitButtonText: "Analyze Now",
  analyzingButtonText: "Analyzing...",
  errorTitle: "Please fix the following errors:",
};
