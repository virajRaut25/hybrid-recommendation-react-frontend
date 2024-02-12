import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HistoryContextProvider from "./context/HistoryContextProvider";

function App() {
  return (
    <HistoryContextProvider>
      <Navbar />
      <Outlet />
    </HistoryContextProvider>
  );
}

export default App;
