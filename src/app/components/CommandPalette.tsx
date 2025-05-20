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
      className="fixed flex-col backdrop-blur-xs inset-0 items-center justify-center "
      style={{ pointerEvents: "none" }}
    >
      <div id="container" className="flex-col flex w-96 items-center">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className={commandPaletteStyle}
          onKeyDown={handleKeyDown}
        />
        <div className="h-2"></div>
        {topSuggestions.map((item) => (
          <div className="bg-white w-full text-center" key={item}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommandPaletteInput;
