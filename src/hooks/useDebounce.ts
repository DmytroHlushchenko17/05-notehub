import { useState } from "react";
import { useDebounce } from "use-debounce";

export function useCustomDebounce<T>(defaultValue: T, delay?: number) {
  const [value, setValue] = useState<T>(defaultValue);
  const [debouncedValue] = useDebounce(value, delay || 500);
  return [debouncedValue, setValue];
}
