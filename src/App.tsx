import { Outlet } from "react-router";
import "./App.css";

const App = () => {
  return (
    <div className="p-8 h-screen">
      <Outlet />
    </div>
  );
};

export default App;
