import React, { useState } from "react";

export default function CustomersForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleUpdate = (e, stateFunction) => {
        const value = e.target.value;
        stateFunction(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {};

        data.first_name = firstName;
        data.last_name = lastName;
        data.address = address;
        data.phone_number = phoneNumber;

        const url = "http://localhost:8090/api/customers/";
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
            setAddress("");
            setPhoneNumber("");
        }
    }

    return(
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a Customer</h1>
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
                            <input onChange={(e) => handleUpdate(e, setAddress)} value={address} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
                            <label htmlFor="address">Address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={(e) => handleUpdate(e, setPhoneNumber)} value={phoneNumber} placeholder="Phone Number" required type="text" name="phoneNumber" id="phoneNumber" className="form-control" />
                            <label htmlFor="phoneNumber">Phone Number</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
