import { useState } from "react";

export function useToggleSelection<T>() {
  const [selected, setSelected] = useState<T[]>([]);

  const toggle = (item: T) => {
    setSelected((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  return {
    selected,
    toggle,
    setSelected,
    isSelected: (item: T) => selected.includes(item),
  };
}
