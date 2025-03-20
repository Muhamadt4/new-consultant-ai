/**
 * Utility functions for business data processing
 */

// Helper function to safely parse numeric values
export const safeParseInt = (value) => {
  if (!value && value !== 0) return 0;

  try {
    // If it's already a number, return it
    if (typeof value === "number") {
      // Check for reasonable limits
      if (value > 1000000000 || value < 0) return 0;
      return value;
    }

    // Remove all non-numeric characters except decimal point
    const cleanValue = value.toString().replace(/[^\d.]/g, "");
    const parsedValue = parseInt(cleanValue, 10);

    // Additional validation:
    // Check if the value is too large or negative (likely an error)
    if (parsedValue > 1000000000 || parsedValue < 0) return 0;

    // Ensure we return a valid number, not NaN
    return isNaN(parsedValue) ? 0 : parsedValue;
  } catch (e) {
    console.error("Error parsing numeric value:", e);
    return 0;
  }
};

// Helper function to format competitors from textarea
export const formatCompetitors = (competitorsText) => {
  if (!competitorsText) return ["No competitors specified"];
  return competitorsText
    .split("\n")
    .map((comp) => comp.trim())
    .filter((comp) => comp.length > 0)
    .slice(0, 3); // Take up to 3 competitors
};

// Constants
export const MAX_REASONABLE_VALUE = 100000000; // $100 million is a reasonable upper limit
