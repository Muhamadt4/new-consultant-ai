import { realEstateFields } from "./realEstate";
import { automotiveFields } from "./automotive";
import { restaurantsFields } from "./restaurants";
import { ecommerceFields } from "./ecommerce";
import { technologyFields } from "./technology";
import { educationFields } from "./education";
import { healthcareFields } from "./healthcare";
import { financialFields } from "./financial";

// Map business types to their form fields
export const businessFormFields = {
  "Real Estate": realEstateFields,
  Automotive: automotiveFields,
  Restaurants: restaurantsFields,
  "E-commerce": ecommerceFields,
  "Technology & IT Services": technologyFields,
  "Education & Training": educationFields,
  Healthcare: healthcareFields,
  "Financial Services": financialFields,
};

// Helper function to get fields for a specific business type
export const getFieldsForBusinessType = (businessType) => {
  return businessFormFields[businessType] || realEstateFields; // Default to real estate if not found
};
