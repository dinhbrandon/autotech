import React, { useState } from "react";

export default function ManufacturersForm() {
    const [manufacturer, setManufacturer] = useState("");

    const handleUpdate = (e, stateFunction) => {
        const value = e.target.value;
        stateFunction(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {}

        data.name = manufacturer;

        const url = "http://localhost:8100/api/manufacturers/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newManufacturer = await response.json();


            setManufacturer("");
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Manufacturer</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input onChange={(e) => handleUpdate(e, setManufacturer)} value={manufacturer} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control" />
                            <label htmlFor="manufacturer">Manufacturer...</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
