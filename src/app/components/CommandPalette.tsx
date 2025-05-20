import React, { useEffect, useRef, useState } from "react";
import { commandPaletteStyle } from "./commandPalette.style";

interface CommandPaletteInputProps {
  showTextInput: boolean;
  onSubmit: (input: string) => Promise<void>;
  placeholder: string;
  suggestions: string[];
}

function CommandPaletteInput({
  showTextInput,
  onSubmit,
  placeholder,
  suggestions,
}: CommandPaletteInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [topSuggestions, setTopSuggestions] = useState<string[]>([]);
  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const inputValue = inputRef.current?.value || "";
    setTopSuggestions(
      suggestions
        .filter((suggestion) => suggestion.includes(inputValue))
        .slice(0, 3),
    );
    if (inputValue.length < 2) setTopSuggestions([]);
    if (event.key === "Enter") {
      console.log("Enter key pressed. Input value:", inputValue);
      await onSubmit(inputValue);
    }
  };

  useEffect(() => {
    if (showTextInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showTextInput]);

  return (
    <div
      id="background"
      className="fixed inset-0 flex items-center justify-center backdrop-blur-xs"
      style={{ pointerEvents: "none" }}
    >
      <div
        id="paletteContainer"
        className="relative w-96" // Width defined here, relative for positioning children
        style={{ pointerEvents: "auto" }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className={`${commandPaletteStyle} w-full`} // Input takes full width
          onKeyDown={handleKeyDown}
        />

        {/* Suggestions are positioned absolutely, appearing below the input */}
        {topSuggestions.length > 0 && (
          <div
            id="suggestionsList"
            className="absolute top-full left-0 z-10 mt-2 w-full overflow-hidden rounded-md bg-white shadow-lg"
          >
            {topSuggestions.map((item) => (
              <div
                className="w-full cursor-pointer p-2 text-center hover:bg-gray-100"
                key={item}
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef!.current!.value = item;
                  inputRef!.current!.focus();
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommandPaletteInput;
