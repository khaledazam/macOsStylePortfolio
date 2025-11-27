import React from "react";
import Navbar from "#components/Navbar";
import Welcome from "#components/Welcome.jsx";
import { Docks } from "#components/Docks.jsx";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { TerminalWindow } from "#windows/index.js";

gsap.registerPlugin(Draggable);

const App = () => {
    return (
        <main>
            <Navbar />
            <Welcome />
            <Docks />
            <TerminalWindow /> {/* فقط هنا */}
        </main>
    );
};

export default App;
