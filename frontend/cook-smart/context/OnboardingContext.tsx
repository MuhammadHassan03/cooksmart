import { createContext, ReactNode, useContext, useState } from "react";

interface OnboardingSelections {
  diet: string[];
  allergies: string[];
  cuisines: string[];
}

const defaultState: OnboardingSelections = {
  diet: [],
  allergies: [],
  cuisines: [],
};

type SelectionCategory = keyof OnboardingSelections;

interface OnboardingContextType {
  selections: OnboardingSelections;
  setSelections: React.Dispatch<React.SetStateAction<OnboardingSelections>>;
  toggleSelection: (category: SelectionCategory, value: string) => void;
  isSelected: (category: SelectionCategory, value: string) => boolean;
  clearSelections: () => void;
}

const OnboardingContext = createContext<OnboardingContextType>({
  selections: defaultState,
  setSelections: () => {},
  toggleSelection: () => {},
  isSelected: () => false,
  clearSelections: () => {},
});

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [selections, setSelections] =
    useState<OnboardingSelections>(defaultState);

  const toggleSelection = (category: SelectionCategory, value: string) => {
    setSelections((prev) => {
      const current = prev[category];
      const valueLower = value.toLowerCase();
      const isNone = valueLower === "none";
      const hasValue = current.includes(value);

      // Case 1: Selecting "None"
      if (isNone) {
        return {
          ...prev,
          [category]: hasValue ? [] : ["None"],
        };
      }

      const updatedSet = new Set(
        current.filter((item) => item.toLowerCase() !== "none")
      );

      // Toggle value
      if (hasValue) {
        updatedSet.delete(value);
      } else {
        updatedSet.add(value);
      }

      return {
        ...prev,
        [category]: Array.from(updatedSet),
      };
    });
  };

  const isSelected = (category: SelectionCategory, value: string) => {
    return selections[category].includes(value);
  };

  const clearSelections = () => {
    setSelections(defaultState);
  };

  return (
    <OnboardingContext.Provider
      value={{
        selections,
        setSelections,
        toggleSelection,
        isSelected,
        clearSelections,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);
