import React, { useState, useNavigate } from "react";

export default function SalespeopleForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [employeeId, setEmployeeId] = useState("");

    const handleUpdate = (e, stateFunction) => {
        const value = e.target.value;
        stateFunction(value);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = {}

        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;

        const url = "http://localhost:8090/api/salespeople/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }

        const response = await fetch(url, fetchConfig);

        if (response.ok) {
            setFirstName("");
            setLastName("");
            setEmployeeId("");
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a Salesperson</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input onChange={(e) => handleUpdate(e, setFirstName)} value={firstName} placeholder="First Name" required type="text" name="firstName" id="firstName" className="form-control" />
                            <label htmlFor="firstName">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={(e) => handleUpdate(e, setLastName)} value={lastName} placeholder="Last Name" required type="text" name="lastName" id="lastName" className="form-control" />
                            <label htmlFor="lastName">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={(e) => handleUpdate(e, setEmployeeId)} value={employeeId} placeholder="Employee ID" required type="text" name="employeeId" id="employeeId" className="form-control" />
                            <label htmlFor="employeeId">Employee ID</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
