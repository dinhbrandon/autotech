import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NewAutomobileForm() {
  const [models, setModels] = useState([]);
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [vin, setVin] = useState("");
  const [model, setModel] = useState("");

  const navigate = useNavigate();

  const handleUpdate = (event, stateFunction) => {
    const value = event.target.value;
    stateFunction(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      color: color,
      year: year,
      vin: vin,
      model_id: model,
    };

    const autoUrl = "http://localhost:8100/api/automobiles/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await fetch(autoUrl, fetchConfig);
    if (response.ok) {
      const newAuto = await response.json();
      setColor("");
      setYear("");
      setVin("");
      setModel("");
      navigate("/automobiles/");
    }
  };

  const fetchData = async () => {
    const url = "http://localhost:8100/api/models/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="my-5 container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new automobile to inventory</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  onChange={(event) => handleUpdate(event, setColor)}
                  value={color}
                  placeholder="Color"
                  required
                  type="text"
                  name="color"
                  id="color"
                  className="form-control"
                />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={(event) => handleUpdate(event, setYear)}
                  value={year}
                  placeholder="Year"
                  required
                  type="text"
                  name="year"
                  id="year"
                  className="form-control"
                />
                <label htmlFor="year">Year</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={(event) => handleUpdate(event, setVin)}
                  value={vin}
                  placeholder="VIN"
                  required
                  type="text"
                  name="vin"
                  id="vin"
                  className="form-control"
                />
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="mb-3">
                <select
                  onChange={(event) => handleUpdate(event, setModel)}
                  required
                  value={model}
                  name="model"
                  id="model"
                  className="form-select"
                >
                  <option value="">Choose a model...</option>
                  {models?.map((model) => {
                    return (
                      <option key={model.id} value={model.id}>
                        {model.name}
                        {model.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-success">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
