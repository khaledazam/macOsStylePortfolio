import React from "react";
import WindowWrapper from "#hoc/windowWrapper.jsx";
import { techStack } from "#constants/index.js";
import { Check } from "lucide-react";
import { WindowControls } from "#components/WindowControls.jsx";

export const Terminal = () => {
    return (
        <div className="terminal-window">
            {/* شريط العنوان */}
            <div
                id="window-header"
                className="flex items-center justify-between bg-[#2C2C2C] px-4 py-2"
            >
                <WindowControls target="terminal" />
                <h2 className="font-bold text-sm text-center flex-1 text-white">
                    Tech Stack
                </h2>
            </div>

            {/* محتوى التيرمنال */}
            <div className="techstack text-sm p-4 space-y-3 bg-[#1E1E1E] text-white font-mono">
                <div>
                    <span className="font-bold text-[#00A154]">@Sir.duckld % </span>
                    show tech stack
                </div>

                {/* العناوين */}
                <div className="label flex items-center gap-4 text-gray-400 uppercase text-xs">
                    <p className="w-28">Category</p>
                    <p>Technologies</p>
                </div>

                {/* القوائم */}
                <ul className="content py-3 border-t border-b border-gray-600 space-y-2 max-h-60 overflow-y-auto">
                    {techStack.map(({ category, items }) => (
                        <li key={category} className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <Check className="check text-[#00A154] w-4" />
                                <h3 className="font-semibold text-[#00A154] w-28">{category}</h3>
                            </div>
                            <ul className="flex flex-wrap items-center gap-2 ml-8">
                                {items.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

let windowWrapper = WindowWrapper(Terminal, "terminal");
export default windowWrapper;
