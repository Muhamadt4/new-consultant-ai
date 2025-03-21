export const automotiveFields = [
  {
    id: "businessName",
    label: "Business Name",
    type: "text",
    placeholder: "Enter business name",
    required: true,
  },
  {
    id: "city",
    label: "City",
    type: "text",
    placeholder: "Enter city",
    required: true,
  },
  {
    id: "country",
    label: "Country",
    type: "text",
    placeholder: "Enter country",
    required: true,
  },
  {
    id: "businessSubtype",
    label: "Type of Business",
    type: "select",
    placeholder: "Select business type",
    required: true,
    options: [
      { value: "Car Dealership", label: "Car Dealership" },
      { value: "Auto Repair Shop", label: "Auto Repair Shop" },
      { value: "Car Rental Service", label: "Car Rental Service" },
      { value: "Spare Parts Sales", label: "Spare Parts Sales" },
    ],
  },
  {
    id: "monthlySales",
    label: "Average Monthly Sales or Rentals ($)",
    type: "number",
    placeholder: "Enter amount",
    required: true,
  },
  {
    id: "monthlySalesTarget",
    label: "Average Monthly Sales or Rentals ($) ",
    type: "number",
    placeholder: "Enter target amount",
    required: true,
    isTarget: true,
  },
  {
    id: "vehicleTypes",
    label: "Types of Vehicles Sold or Rented",
    type: "multiselect",
    placeholder: "Select vehicle types",
    required: true,
    options: [
      { value: "Luxury Cars", label: "Luxury Cars" },
      { value: "Economy Cars", label: "Economy Cars" },
      { value: "Used Cars", label: "Used Cars" },
      { value: "New Cars", label: "New Cars" },
      { value: "Electric Vehicles", label: "Electric Vehicles" },
    ],
  },
  {
    id: "serviceTypes",
    label: "Service Types Provided",
    type: "multiselect",
    placeholder: "Select service types",
    required: true,
    options: [
      { value: "Oil Change", label: "Oil Change" },
      { value: "Engine Repair", label: "Engine Repair" },
      { value: "Car Customization", label: "Car Customization" },
      { value: "Tire Replacement", label: "Tire Replacement" },
      { value: "Car Washing & Detailing", label: "Car Washing & Detailing" },
    ],
  },
  {
    id: "marketingStrategies",
    label: "Marketing Strategies Used",
    type: "multiselect",
    placeholder: "Select marketing strategies",
    required: true,
    options: [
      { value: "Website SEO", label: "Website SEO" },
      { value: "Social Media Marketing", label: "Social Media Marketing" },
      { value: "Google/Facebook Ads", label: "Google/Facebook Ads" },
      {
        value: "Partnerships with Insurance Companies",
        label: "Partnerships with Insurance Companies",
      },
    ],
  },
  {
    id: "competitors",
    label: "Competitor Analysis",
    type: "textarea",
    placeholder: "List top 3 competitors (one per line)",
    required: true,
  },
  {
    id: "customerBase",
    label: "Customer Base",
    type: "multiselect",
    placeholder: "Select customer base",
    required: true,
    options: [
      { value: "Private Car Owners", label: "Private Car Owners" },
      {
        value: "Businesses (Fleet Services)",
        label: "Businesses (Fleet Services)",
      },
      { value: "Government Contracts", label: "Government Contracts" },
    ],
  },
  {
    id: "keyChallenges",
    label: "Key Challenges Faced",
    type: "multiselect",
    placeholder: "Select challenges",
    required: true,
    options: [
      { value: "Low Sales", label: "Low Sales" },
      { value: "High Competition", label: "High Competition" },
      {
        value: "Expensive Maintenance Costs",
        label: "Expensive Maintenance Costs",
      },
      { value: "Shortage of Spare Parts", label: "Shortage of Spare Parts" },
    ],
  },
];
