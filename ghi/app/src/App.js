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
import SalespeopleList from "./SalesAT/SalespeopleListAT";
import SalespeopleForm from "./SalesAT/SalespeopleFormAT";
import CustomersList from "./SalesAT/CustomersListAT";
import CustomersForm from "./SalesAT/CustomersFormAT";
import SalesList from "./SalesAT/SalesListAT";
import SalesForm from "./SalesAT/SalesFormAT";

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
          <Route path="salespeople">
            <Route path="" element={<SalespeopleList />} />
            <Route path="create" element={<SalespeopleForm />} />
          </Route>
          <Route path="customers">
            <Route path="" element={<CustomersList />} />
            <Route path="create" element={<CustomersForm/>} />
          </Route>
          <Route path="sales">
            <Route path="" element={<SalesList />} />
            <Route path="create" element={<SalesForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
