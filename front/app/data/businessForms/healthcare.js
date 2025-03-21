export const healthcareFields = [
  {
    id: "businessName",
    label: "Business Name",
    type: "text",
    placeholder: "Enter business name",
    required: true,
  },
  {
    id: "businessType",
    label: "Business Type",
    type: "select",
    placeholder: "Select business type",
    required: true,
    options: [
      { value: "Private Clinic", label: "Private Clinic" },
      { value: "Hospital", label: "Hospital" },
      { value: "Online Consultation", label: "Online Consultation" },
      { value: "Pharmacy", label: "Pharmacy" },
    ],
  },
  {
    id: "monthlyRevenue",
    label: "Average Monthly Revenue ($)",
    type: "number",
    placeholder: "Enter amount",
    required: true,
  },
  {
    id: "monthlyRevenueTarget",
    label: "Average Monthly Revenue ($) ",
    type: "number",
    placeholder: "Enter target amount",
    required: true,
    isTarget: true,
  },
  {
    id: "patientsPerMonth",
    label: "Number of Patients per Month",
    type: "number",
    placeholder: "Enter number",
    required: true,
  },
  {
    id: "patientsPerMonthTarget",
    label: "Number of Patients per Month ",
    type: "number",
    placeholder: "Enter target number",
    required: true,
    isTarget: true,
  },
  {
    id: "primaryServices",
    label: "Primary Services Offered",
    type: "multiselect",
    placeholder: "Select primary services",
    required: true,
    options: [
      { value: "General Medicine", label: "General Medicine" },
      {
        value: "Specialized Treatments",
        label: "Specialized Treatments (e.g., Dermatology, Orthopedics)",
      },
      { value: "Surgery", label: "Surgery" },
      { value: "Mental Health Services", label: "Mental Health Services" },
    ],
  },
  {
    id: "customerDemographics",
    label: "Customer Demographics",
    type: "textarea",
    placeholder: "Describe your patient demographics",
    required: true,
  },
  {
    id: "marketingStrategies",
    label: "Marketing Strategies Used",
    type: "multiselect",
    placeholder: "Select marketing strategies",
    required: true,
    options: [
      { value: "Google Ads", label: "Google Ads" },
      { value: "SEO", label: "SEO" },
      { value: "Doctor Referrals", label: "Referrals from Other Doctors" },
      {
        value: "Social Media Campaigns",
        label: "Social Media Awareness Campaigns",
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
    id: "challengesFaced",
    label: "Challenges Faced",
    type: "multiselect",
    placeholder: "Select challenges",
    required: true,
    options: [
      { value: "High Costs", label: "High Costs" },
      { value: "Insurance Issues", label: "Insurance Processing Issues" },
      { value: "Customer Retention", label: "Customer Retention Problems" },
      { value: "Regulatory Compliance", label: "Regulatory Compliance" },
    ],
  },
];
