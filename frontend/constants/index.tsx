import Constants from "expo-constants";


export const appName = Constants.manifest?.name?.split("-").join(" ").toUpperCase() || "Cook Smart";
export const DIET_OPTIONS = [
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Keto",
  "Paleo",
  "None",
];

export const ALLERGY_OPTIONS = [
  "Dairy",
  "Eggs",
  "Fish",
  "Gluten",
  "Peanuts",
  "Shellfish",
  "Soy",
  "Tree nuts",
  "Wheat",
  "None"
];

export const CUISINE_OPTIONS = [
  "Italian",
  "Mexican",
  "Indian",
  "Chinese",
  "Thai",
  "Japanese",
  "Greek",
  "French",
  "Middle Eastern",
  "American",
];

export type PlanType = "free" | "trial" | "premium";

interface FeatureItem {
  label: string;
  availableIn: PlanType[]; // Feature access
}

export const features: FeatureItem[] = [
  { label: "Manual Ingredient Manager", availableIn: ["free", "trial", "premium"] },
  { label: "AI Recipe Generator", availableIn: ["trial", "premium"] },
  { label: "Smart Fridge Scanner", availableIn: ["trial", "premium"] },
  { label: "Grocery List Generator", availableIn: ["trial", "premium"] },
  { label: "Meal Planning Calendar", availableIn: ["trial", "premium"] },
  { label: "Nutrition Tracking", availableIn: ["premium"] },
  { label: "Recipe Creator Marketplace", availableIn: ["premium"] },
  { label: "Waste Reduction Analytics", availableIn: ["premium"] },
  { label: "Grocery API Integration", availableIn: ["premium"] },
  { label: "Social Features", availableIn: ["premium"] },
];

export const planDescriptions: Record<PlanType, string> = {
  free: "Basic access with limited features",
  trial: "Full access for 7 days",
  premium: "Unlimited access to all features",
};

export const planDisplayNames: Record<PlanType, string> = {
  free: "Free Plan",
  trial: "Free Trial",
  premium: "Premium Plan",
};

export const COMMON_INGREDIENTS = [
  { name: "Eggs", quantity: "12", unit: "pcs" },
  { name: "Milk", quantity: "1", unit: "L" },
  { name: "Butter", quantity: "1", unit: "block" },
  { name: "Olive Oil", quantity: "1", unit: "bottle" },
  { name: "Tomatoes", quantity: "5", unit: "pcs" },
  { name: "Chicken", quantity: "500", unit: "g" },
  { name: "Rice", quantity: "1", unit: "kg" },
  { name: "Onions", quantity: "3", unit: "pcs" },
  { name: "Garlic", quantity: "1", unit: "head" },
  { name: "Bread", quantity: "1", unit: "loaf" },
];