// Subscription page data
import { FaCheck } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
// FAQ items
export const faqItems = [
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will be effective immediately and your billing will be adjusted accordingly.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 14-day money-back guarantee for all paid plans. If you&apos;re not satisfied with our service, you can request a full refund within 14 days of your purchase.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
  },
  {
    question: "Can I try the Pro or Enterprise features before subscribing?",
    answer:
      "We offer a 7-day trial of our Pro plan for new users. For Enterprise features, please contact our sales team for a personalized demo.",
  },
];

// Table comparison data
export const tableData = {
  headers: ["Plan", "Free", "Basic", "Pro", "Enterprise"],
  rows: [
    {
      feature: "Price",
      values: [
        "$0",
        "$10/month or $100/year",
        "$25/month or $250/year",
        "$50/month or $500/year",
      ],
    },
    {
      feature: "Monthly Reports",
      values: ["2 reports", "5 reports", "20 reports", "Unlimited"],
    },
    {
      feature: "Custom Reports",
      values: [
        { text: "Not available", available: false },
        { text: "Not available", available: false },
        { text: "Partial customization", available: true },
        { text: "Full customization", available: true },
      ],
    },
    {
      feature: "AI-Powered Recommendations",
      values: [
        { text: "Not included", available: false },
        { text: "Not included", available: false },
        { text: "Available", available: true },
        { text: "Advanced analysis", available: true },
      ],
    },
    {
      feature: "Customer Support",
      values: [
        { text: "Not included", available: false },
        { text: "Email support", available: true },
        { text: "Live chat support", available: true },
        { text: "Dedicated account manager", available: true },
      ],
    },
    {
      feature: "Integration with Other Tools",
      values: [
        { text: "Not available", available: false },
        { text: "Not available", available: false },
        { text: "Excel, Google Sheets", available: true },
        { text: "Advanced API integration", available: true },
      ],
    },
    {
      feature: "Early Access to New Features",
      values: [
        { text: "Not available", available: false },
        { text: "Not available", available: false },
        { text: "Partial", available: true },
        { text: "Full", available: true },
      ],
    },
  ],
};

// Pricing plans data
export const plans = [
  {
    name: "Free",
    icon: "",
    price: {
      monthly: "$0",
      yearly: "$0",
    },
    features: [
      { text: "2 reports", available: true },
      { text: "Custom Reports", available: false },
      { text: "AI-Powered Recommendations (Gemini API)", available: false },
      { text: "Customer Support", available: false },
      { text: "Integration with Other Tools", available: false },
      { text: "Early Access to New Features", available: false },
    ],
    popular: false,
    buttonText: "Get Started",
  },
  {
    name: "Basic",
    icon: "",
    price: {
      monthly: "$10/month",
      yearly: "$100/year",
    },
    features: [
      { text: "5 reports", available: true },
      { text: "Custom Reports", available: false },
      { text: "AI-Powered Recommendations (Gemini API)", available: false },
      { text: "Email support", available: true },
      { text: "Integration with Other Tools", available: false },
      { text: "Early Access to New Features", available: false },
    ],
    popular: false,
    buttonText: "Subscribe",
  },
  {
    name: "Pro",
    icon: "",
    price: {
      monthly: "$25/month",
      yearly: "$250/year",
    },
    features: [
      { text: "20 reports", available: true },
      { text: "Partial customization", available: true },
      { text: "AI-Powered Recommendations (Gemini API)", available: true },
      { text: "Live chat support", available: true },
      { text: "Excel, Google Sheets", available: true },
      { text: "Partial Early Access", available: true },
    ],
    popular: true,
    buttonText: "Subscribe",
  },
  {
    name: "Enterprise",
    icon: "",
    price: {
      monthly: "$50/month",
      yearly: "$500/year",
    },
    features: [
      { text: "Unlimited", available: true },
      { text: "Full customization", available: true },
      { text: "Advanced analysis", available: true },
      { text: "Dedicated account manager", available: true },
      { text: "Advanced API integration", available: true },
      { text: "Full Early Access", available: true },
    ],
    popular: false,
    buttonText: "Contact Sales",
  },
];
