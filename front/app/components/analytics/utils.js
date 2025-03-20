// Safe parsing of numeric values
export const safeParseInt = (value) => {
  if (value === undefined || value === null) return 0;

  try {
    // If it's already a number, return it
    if (typeof value === "number") return value;

    // If it's a string, clean it and parse
    if (typeof value === "string") {
      const cleanValue = value.replace(/[^\d.-]/g, "");
      const parsedValue = parseInt(cleanValue, 10);
      return isNaN(parsedValue) ? 0 : parsedValue;
    }

    // Try to convert other types
    const parsedValue = parseInt(value, 10);
    return isNaN(parsedValue) ? 0 : parsedValue;
  } catch (e) {
    console.error("Error parsing number:", e, value);
    return 0;
  }
};

// Currency formatting
export const formatCurrency = (value) => {
  // Safely format currency values
  if (value === undefined || value === null) return "$0";

  try {
    // Convert to number if it's a string or other type
    const numValue =
      typeof value === "string"
        ? parseFloat(value.replace(/[^\d.-]/g, ""))
        : Number(value);

    if (isNaN(numValue)) return "$0";

    return `$${numValue.toLocaleString()}`;
  } catch (e) {
    console.error("Error formatting currency:", e);
    return "$0";
  }
};

// Generate impact level data from improvement suggestions
export const generateImpactLevelData = (displayData) => {
  if (
    !displayData ||
    !displayData.improvement_suggestions ||
    !displayData.improvement_suggestions.length
  ) {
    return [
      { name: "Low", value: 0 },
      { name: "Medium", value: 0 },
      { name: "High", value: 0 },
    ];
  }

  // Count the impact levels
  const counts = {
    Low: 0,
    Medium: 0,
    High: 0,
  };

  displayData.improvement_suggestions.forEach((suggestion) => {
    if (
      suggestion &&
      suggestion.impact_level &&
      counts[suggestion.impact_level] !== undefined
    ) {
      counts[suggestion.impact_level]++;
    }
  });

  // Ensure we have at least a value of 1 for any non-zero count to make chart visible
  return [
    { name: "Low", value: counts["Low"] || 0 },
    { name: "Medium", value: counts["Medium"] || 0 },
    { name: "High", value: counts["High"] || 0 },
  ];
};
