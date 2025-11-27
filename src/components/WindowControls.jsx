import React from 'react';
import useWindowStore from "#store/window.js";

export const WindowControls = ({ windowKey }) => {
    const { closeWindow, focusWindow } = useWindowStore();

    return (
        <div id="window-controls" className="flex gap-2">
            {/* Close Button */}
            <div
                onClick={() => closeWindow(windowKey)}
                className="close w-3 h-3 rounded-full bg-[#FF605C] cursor-pointer"
                title="Close"
            />

            {/* Minimize Button */}
            <div
                onClick={() => alert("Minimize not implemented yet")}
                className="minimize w-3 h-3 rounded-full bg-[#FFBD44] cursor-pointer"
                title="Minimize"
            />

            {/* Maximize Button */}
            <div
                onClick={() => alert("Maximize not implemented yet")}
                className="maximize w-3 h-3 rounded-full bg-[#00CA4E] cursor-pointer"
                title="Maximize"
            />
        </div>
    );
};
