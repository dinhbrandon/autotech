import React, { useEffect, useState } from "react";

function ListVehicleModels() {
  const [models, setModels] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8100/api/models/";

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setModels(data.models);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Models</h1>
      <div className="table-responsive"></div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model) => {
            return (
              <tr key={model.href}>
                <td width={200}>{model.name}</td>
                <td width={400}> {model.manufacturer.name}</td>
                <td>
                  <img className="img-fluid" src={model.picture_url} />
                </td>
                <td>{model.manufacturer.picture_url}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default ListVehicleModels;
