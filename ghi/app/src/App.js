import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ListAutomobiles from "./Inventory/ListAutomobilesAH";
import NewAutomobileForm from "./Inventory/AutomobileFormAH";
import ListVehicleModels from "./Inventory/ListVehicleModelsBD";
import VehicleModelForm from "./Inventory/VehicleModelFormBD";
import ListTechnicians from "./servicesBD/ListTechniciansBD";
import TechnicianForm from "./servicesBD/TechnicianFormBD";
import AppointmentForm from "./servicesBD/AppointmentFormBD";
import ListAppointments from "./servicesBD/ListAppointmentsBD";
import AppointmentHistory from "./servicesBD/AppointmentHistoryBD";
import ManufacturersList from "./Inventory/ManufacturersListAT";
import ManufacturersForm from "./Inventory/ManufacturersFormAT";
import SalespersonForm from "./salesAH/SalespersonForm";
import SalespersonList from "./salesAH/SalespersonList";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="automobiles/" element={<ListAutomobiles />} />
          <Route path="automobiles/create/" element={<NewAutomobileForm />} />
          <Route path="models">
            <Route path="" element={<ListVehicleModels />} />
            <Route path="create" element={<VehicleModelForm />} />
          </Route>
          <Route path="technicians">
            <Route path="" element={<ListTechnicians />} />
            <Route path="create" element={<TechnicianForm />} />
          </Route>
          <Route path="appointments">
            <Route path="" element={<ListAppointments />} />
            <Route path="create" element={<AppointmentForm />} />
            <Route path="history" element={<AppointmentHistory />} />
          </Route>
          <Route path="manufacturers">
            <Route path="" element={<ManufacturersList />} />
            <Route path="create" element={<ManufacturersForm />} />
          </Route>
          <Route path="salespeople/create/" element={<SalespersonForm />} />
          <Route path="salespeople/" element={<SalespersonList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
