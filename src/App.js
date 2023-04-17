import { useEffect, useState } from "react";
import "./App.css";

function App() {
  return (
    <div>
      <form id="form">
        <input
          type="text"
          id="search"
          placeholder="Search By Loaction"
          autocomplete="off"
        />
      </form>
      <main id="main">
        <h1>29</h1>
        <h2>Busan</h2>
      </main>
    </div>
  );
}

export default App;
