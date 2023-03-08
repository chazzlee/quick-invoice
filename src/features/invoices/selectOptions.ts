export type SelectOption = {
  label: string;
  value: string;
};

export const selectTerms: SelectOption[] = [
  { value: "0_days", label: "On receipt" },
  { value: "1_day", label: "Next day" },
  { value: "custom", label: "Custom" },
  { value: "2_days", label: "2 days" },
  { value: "3_days", label: "3 days" },
  { value: "4_days", label: "4 days" },
  { value: "5_days", label: "5 days" },
  { value: "6_days", label: "6 days" },
  { value: "7_days", label: "7 days" },
  { value: "14_days", label: "14 days" },
  { value: "21_days", label: "21 days" },
  { value: "30_days", label: "30 days" },
  { value: "45_days", label: "45 days" },
  { value: "60_days", label: "60 days" },
  { value: "90_days", label: "90 days" },
  { value: "120_days", label: "120 days" },
  { value: "180_days", label: "180 days" },
  { value: "365_days", label: "365 days" },
];

export const selectTaxTypes: SelectOption[] = [
  { label: "On total", value: "on_total" },
  { label: "Deducted", value: "deducted" },
  { label: "Per item", value: "per_item" },
  { label: "None", value: "no_tax" },
];

export const selectDiscountTypes: SelectOption[] = [
  { label: "None", value: "no_discount" },
  { label: "Percent", value: "percent" },
  { label: "Flat amount", value: "flat_amount" },
];

export const selectShippingTypes: SelectOption[] = [
  { label: "None", value: "no_shipping" },
  { label: "Free", value: "free" },
  { label: "Flat amount", value: "flat_amount" },
  { label: "Percent", value: "percent" },
];

export const selectStates = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
];
