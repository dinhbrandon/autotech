import React, { useState } from "react";

export default function SalespersonForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const handleUpdate = (event, stateFunction) => {
    const value = event.target.value;
    stateFunction(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      employee_id: employeeId,
    };

    const salespeopleUrl = "http://localhost:8090/api/salespeople/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await fetch(salespeopleUrl, fetchConfig);
    if (response.ok) {
      const newSalesperson = await response.json();
      console.log(newSalesperson);
      setFirstName("");
      setLastName("");
      setEmployeeId("");
    }
  };

  return (
    <div className="my-5 container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Salesperson</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  onChange={(event) => handleUpdate(event, setFirstName)}
                  value={firstName}
                  placeholder="First Name"
                  required
                  type="text"
                  name="first name"
                  id="first name"
                  className="form-control"
                />
                <label htmlFor="first name">First Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={(event) => handleUpdate(event, setLastName)}
                  value={lastName}
                  placeholder="Last Name"
                  required
                  type="text"
                  name="last name"
                  id="last name"
                  className="form-control"
                />
                <label htmlFor="last name">Last Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={(event) => handleUpdate(event, setEmployeeId)}
                  value={employeeId}
                  placeholder="Employee ID"
                  required
                  type="text"
                  name="employee id"
                  id="employee id"
                  className="form-control"
                />
                <label htmlFor="employee id">Employee ID</label>
              </div>
              <button className="btn btn-success">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
