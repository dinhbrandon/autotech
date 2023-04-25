import React, { useState, useEffect } from "react";

export default function ListAutomobiles() {
  const [autos, setAutos] = useState([]);

  const getAutomobiles = async () => {
    const autoUrl = "http://localhost:8100/api/automobiles/";
    const autoResponse = await fetch(autoUrl);

    if (autoResponse.ok) {
      const data = await autoResponse.json();
      const autos = data.autos;
      setAutos(autos);
    }
  };

  useEffect(() => {
    getAutomobiles();
  }, []);

  return (
    <div>
      <h1>Automobiles</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Color</th>
            <th>Year</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {autos.map((auto) => {
            return (
              <tr key={auto.href}>
                <td>{auto.vin}</td>
                <td>{auto.color}</td>
                <td>{auto.year}</td>
                <td>{auto.model.name}</td>
                <td>{auto.model.manufacturer.name}</td>
                <td>{auto.sold.toString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
