import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ListVehicleModels from './ListVehicleModelsBD';
import VehicleModelForm from './VehicleModelFormBD';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="models">
            <Route path="" element={<ListVehicleModels />} />
            <Route path="create" element={<VehicleModelForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
