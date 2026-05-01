import type { categoriesItemListType } from "@/types/taskCategory";
import type { ComponentProps } from "react";
import { useState, useRef, useEffect } from "react";

interface ModalSelectProps extends Omit<ComponentProps<"select">, "title"> {
  title: string;
  categories: categoriesItemListType[];
  hasLabel?: boolean;
  placeholder?: string;
}

const ModalSelect = ({
  title,
  id,
  className,
  categories,
  hasLabel = true,
  placeholder = "Select an option",
  value,
  onChange,
  ...rest
}: ModalSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedCategory = categories.find((cat) => cat.id === selectedValue);

  const handleSelect = (categoryId: string) => {
    setSelectedValue(categoryId);
    // Trigger the onChange event if it exists (for form compatibility)
    if (onChange) {
      const syntheticEvent = {
        target: { value: categoryId },
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(syntheticEvent);
    }
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col w-full">
      {hasLabel && (
        <label htmlFor={id} className="text-sm pb-2">
          {title} :
        </label>
      )}

      <div className="relative w-full" ref={containerRef}>
        {/* Hidden native select for form compatibility */}
        <select
          id={id}
          value={selectedValue}
          onChange={(e) => handleSelect(e.target.value)}
          className="hidden"
          {...rest}
        >
       
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>

        {/* Custom select trigger */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full p-2 rounded-sm border-2 text-left 
            dark:bg-neutral-900/40 border-gray-300 dark:border-neutral-700 
            duration-200 focus:border-indigo-600 
            flex justify-between items-center
            ${className}
          `}
        >
          <span className={`truncate ${!selectedValue ? "text-gray-500" : ""}`}>
            {selectedCategory?.title || placeholder}
          </span>
          <svg
            className={`w-4 h-4 transition-transform flex-shrink-0 ml-2 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown menu - positioned relative to trigger */}
        {isOpen && (
          <div className="absolute z-[60] w-full mt-1 bg-white dark:bg-neutral-800 border-2 border-gray-300 dark:border-neutral-700 rounded-sm shadow-lg max-h-60 overflow-auto">

            {categories.map((category) => (
              <div
                key={category.id}
                className={`
                  p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-700
                  break-words whitespace-normal
                  ${
                    selectedValue === category.id
                      ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                      : ""
                  }
                `}
                onClick={() => handleSelect(category.id)}
              >
                {category.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalSelect;