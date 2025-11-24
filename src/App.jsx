import React from 'react'
import Navbar from '#components/Navbar'
import Welcome from "#components/Welcome.jsx";
import {Docks} from "#components/Docks.jsx";

const App = () => {
  return (
    <main>
        <Navbar />
        <Welcome />
        <Docks />
    </main>
  )
}

export default App