import React from "react";
import Navbar from "#components/Navbar";
import Welcome from "#components/Welcome.jsx";
import { Docks } from "#components/Docks.jsx";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import {Safari, TerminalWindow} from "#windows/index.js";
import Resume from "#windows/Resume.jsx";

gsap.registerPlugin(Draggable);

const App = () => {
    return (
        <main>
            <Navbar />
            <Welcome />
            <Docks />
            <TerminalWindow />
            <Safari />
            <Resume />
        </main>
    );
};

export default App;
