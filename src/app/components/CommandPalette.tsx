import React, {useEffect, useRef} from 'react';
import { commandPaletteStyle } from './commandPalette.style';

interface CommandPaletteInputProps {
    showTextInput: boolean,
    onSubmit:  (input: string) => Promise<void>,
    placeholder: string;
}



function CommandPaletteInput({showTextInput, onSubmit, placeholder}: CommandPaletteInputProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const inputValue = inputRef.current?.value || '';
            console.log('Enter key pressed. Input value:', inputValue);
            await onSubmit(inputValue)
        }
    };

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
                placeholder={placeholder}
                className={commandPaletteStyle}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}


export default CommandPaletteInput;
