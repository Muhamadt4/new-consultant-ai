"use client";
import { useState, useRef, useEffect } from "react";

const FormField = ({ field, value, onChange, error }) => {
  const [selectedOptions, setSelectedOptions] = useState(
    value ? (Array.isArray(value) ? value : [value]) : []
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const dropdownRef = useRef(null);
  const tooltipRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update local state when value changes from parent
  useEffect(() => {
    if (field.type === "multiselect") {
      setSelectedOptions(value ? (Array.isArray(value) ? value : [value]) : []);
    }
  }, [value, field.type]);

  const handleChange = (e) => {
    onChange(field.id, e.target.value);
  };

  const handleMultiselectChange = (option) => {
    // Toggle selection
    let newSelectedOptions;
    if (selectedOptions.includes(option)) {
      newSelectedOptions = selectedOptions.filter((item) => item !== option);
    } else {
      newSelectedOptions = [...selectedOptions, option];
    }
    setSelectedOptions(newSelectedOptions);
    onChange(field.id, newSelectedOptions);
  };

  const handleSelectAll = () => {
    const allOptions = field.options.map((option) => option.value);
    setSelectedOptions(allOptions);
    onChange(field.id, allOptions);
  };

  const handleClearAll = () => {
    setSelectedOptions([]);
    onChange(field.id, []);
  };

  const handleRangeChange = (e) => {
    onChange(field.id, parseInt(e.target.value, 10));
  };

  // Check if the field is a monetary field based on its id or label
  const isMonetaryField = () => {
    const monetaryTerms = [
      "price",
      "revenue",
      "sales",
      "value",
      "budget",
      "cost",
      "income",
    ];
    const fieldText = (field.id + " " + field.label).toLowerCase();
    return (
      monetaryTerms.some((term) => fieldText.includes(term)) ||
      field.placeholder.includes("$")
    );
  };

  // Common styles
  const labelClass = "text-white text-xl fjalla-one mb-2";
  const inputClass = `bg-[#1e2229] text-white p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-dark-yellow transition duration-200 ${
    error
      ? "border border-red-500"
      : "border border-[#3a3f48] hover:border-dark-yellow"
  }`;
  const errorClass = "text-red-500 text-sm mt-1";

  // Tooltip component
  const Tooltip = ({ tooltipText }) => {
    if (!tooltipText) return null;

    return (
      <div className="relative inline-block ml-2">
        <div
          className="text-gray-400 hover:text-dark-yellow cursor-help"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          ref={tooltipRef}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-1.25rem h-1.25rem"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
        </div>
        {showTooltip && (
          <div className="absolute z-10 w-64 px-3 py-2 text-sm text-white bg-[#252932] rounded-lg shadow-lg border border-[#3a3e48] -left-2 bottom-full mb-2">
            {tooltipText}
            <div className="absolute w-0.75rem h-0.75rem bg-[#252932] border-r border-b border-[#3a3e48] transform rotate-45 left-3 -bottom-1.5"></div>
          </div>
        )}
      </div>
    );
  };

  // Label with tooltip
  const LabelWithTooltip = ({ htmlFor, label, tooltip, isTarget }) => (
    <div className="flex items-center">
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
        {isTarget && (
          <span className="ml-2 text-dark-yellow text-sm">(Target)</span>
        )}
      </label>
      <Tooltip tooltipText={tooltip} />
    </div>
  );

  switch (field.type) {
    case "select":
      return (
        <div className="flex flex-col gap-2 h-full" key={field.id}>
          <LabelWithTooltip
            htmlFor={field.id}
            label={field.label}
            tooltip={field.tooltip}
            isTarget={field.isTarget}
          />
          <div className="relative h-full">
            <select
              id={field.id}
              value={value || ""}
              onChange={handleChange}
              className={`${inputClass} appearance-none h-[3.25rem]`}
              style={{ color: "rgba(255, 255, 255, 0.8)" }}
            >
              <option
                value=""
                disabled
                style={{ color: "rgba(160, 174, 192, 0.5)" }}
              >
                {field.placeholder}
              </option>
              {field.options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  style={{ color: "rgba(255, 255, 255, 0.8)" }}
                >
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
              <svg
                className="fill-current h-1rem w-1rem"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
          {error && <p className={errorClass}>{error}</p>}
        </div>
      );

    case "multiselect":
      return (
        <div
          className="flex flex-col gap-2 h-full"
          key={field.id}
          ref={dropdownRef}
        >
          <LabelWithTooltip
            htmlFor={field.id}
            label={field.label}
            tooltip={field.tooltip}
            isTarget={field.isTarget}
          />
          <div className="relative h-full">
            <div
              className={`${inputClass} cursor-pointer flex items-center justify-between  h-[3.25rem] `}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="truncate">
                {selectedOptions.length === 0 ? (
                  <span className="text-gray-400">{field.placeholder}</span>
                ) : (
                  <span>
                    {selectedOptions.length === 1
                      ? field.options.find(
                          (o) => o.value === selectedOptions[0]
                        )?.label || selectedOptions[0]
                      : `${selectedOptions.length} items selected`}
                  </span>
                )}
              </div>
              <svg
                className={`h-5 w-5 transition-transform  ${
                  dropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {dropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-[#2a2f38] border border-[#3a3f48] rounded-lg shadow-lg max-h-60 overflow-auto">
                {/* Select All / Clear All */}
                <div className="flex items-center justify-between p-2 border-b border-[#3a3f48] ">
                  <button
                    type="button"
                    className="text-sm text-dark-yellow hover:text-yellow-500 px-2 py-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectAll();
                    }}
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    className="text-sm text-gray-400 hover:text-white px-2 py-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearAll();
                    }}
                  >
                    Clear All
                  </button>
                </div>

                {/* Options List */}
                <div className="py-1">
                  {field.options.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center p-3 hover:bg-[#353a45] text-[#e2e2e2] cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMultiselectChange(option.value);
                      }}
                    >
                      <div className="flex items-center w-full">
                        <input
                          type="checkbox"
                          checked={selectedOptions.includes(option.value)}
                          onChange={() => {}}
                          className="form-checkbox h-1.25rem w-1.25rem text-dark-yellow border-gray-500 rounded focus:ring-0 focus:ring-offset-0"
                        />
                        <span className="ml-3 truncate">{option.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {error && <p className={errorClass}>{error}</p>}
        </div>
      );

    case "range":
      return (
        <div className="flex flex-col gap-2 h-full" key={field.id}>
          <LabelWithTooltip
            htmlFor={field.id}
            label={field.label}
            tooltip={field.tooltip}
            isTarget={field.isTarget}
          />
          <div className="px-2 mb-2 h-full">
            <input
              type="range"
              id={field.id}
              value={value || field.min || 0}
              min={field.min || 0}
              max={field.max || 100}
              step={field.step || 1}
              onChange={handleRangeChange}
              className="w-full cursor-pointer accent-dark-yellow h-0.5rem bg-[#353a45] rounded-lg appearance-none"
            />
            {field.labels && (
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>{field.labels.min}</span>
                {field.labels.middle && <span>{field.labels.middle}</span>}
                <span>{field.labels.max}</span>
              </div>
            )}
          </div>
          <div className="text-center text-dark-yellow font-semibold">
            {value || field.min || 0}%
          </div>
          {error && <p className={errorClass}>{error}</p>}
        </div>
      );

    case "textarea":
      return (
        <div className="flex flex-col gap-2 h-full" key={field.id}>
          <LabelWithTooltip
            htmlFor={field.id}
            label={field.label}
            tooltip={field.tooltip}
            isTarget={field.isTarget}
          />
          <div className="flex-grow h-full">
            <textarea
              id={field.id}
              placeholder={field.placeholder}
              value={value || ""}
              onChange={handleChange}
              rows={3}
              className={`${inputClass} resize-none h-[7.5rem]`}
              style={{ color: "rgba(255, 255, 255, 0.8)" }}
            />
          </div>
          {error && <p className={errorClass}>{error}</p>}
        </div>
      );

    case "number":
      const showMoneySign = isMonetaryField();
      return (
        <div className="flex flex-col gap-2 h-full" key={field.id}>
          <LabelWithTooltip
            htmlFor={field.id}
            label={field.label}
            tooltip={field.tooltip}
            isTarget={field.isTarget}
          />
          <div className="relative h-full">
            {showMoneySign && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">$</span>
              </div>
            )}
            <input
              type="number"
              id={field.id}
              placeholder={field.placeholder}
              value={value || ""}
              onChange={handleChange}
              className={`${inputClass} ${
                showMoneySign ? "pl-8" : ""
              } h-[3.25rem] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              style={{ color: "rgba(255, 255, 255, 0.8)" }}
              min={0}
            />
          </div>
          {error && <p className={errorClass}>{error}</p>}
        </div>
      );

    default:
      return (
        <div className="flex flex-col gap-2 h-full" key={field.id}>
          <LabelWithTooltip
            htmlFor={field.id}
            label={field.label}
            tooltip={field.tooltip}
            isTarget={field.isTarget}
          />
          <div className="h-full">
            <input
              type={field.type || "text"}
              id={field.id}
              placeholder={field.placeholder}
              value={value || ""}
              onChange={handleChange}
              className={`${inputClass} h-[3.25rem]`}
              style={{ color: "rgba(255, 255, 255, 0.8)" }}
            />
          </div>
          {error && <p className={errorClass}>{error}</p>}
        </div>
      );
  }
};

export default FormField;
