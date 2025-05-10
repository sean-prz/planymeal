import React, {useEffect, useRef} from 'react';

interface CommandPaletteInputProps {
    showTextInput: boolean;
}



function CommandPaletteInput({showTextInput}: CommandPaletteInputProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (showTextInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showTextInput]);


    return (
        <div id="background" className="fixed backdrop-blur-xs inset-0 flex items-center justify-center "  style={{ pointerEvents: 'none' }}>
            <input
                ref={inputRef}
                type="text"
                placeholder="Type an Ingredient..."
                className="
  w-96
  px-4
  py-2
  text-lg
  bg-white
  rounded-md
  shadow-lg
  focus:outline-none focus:ring-2 focus:ring-blue-500
  "
            />
        </div>
    );
}


export default CommandPaletteInput;
