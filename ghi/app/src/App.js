import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ListAutomobiles from "./ListAutomobilesAH";
import NewAutomobileForm from "./AutomobileFormAH";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="automobiles/" element={<ListAutomobiles />} />
          <Route path="automobiles/create/" element={<NewAutomobileForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
