import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Navigation reroute
  const navigate = useNavigate();

  const handleUpdate = (event, stateFunction) => {
    const value = event.target.value;
    stateFunction(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      address: address,
      phone_number: phoneNumber,
    };

    const customerUrl = "http://localhost:8090/api/customers/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await fetch(customerUrl, fetchConfig);
    if (response.ok) {
      const newCustomer = await response.json();
      setFirstName("");
      setLastName("");
      setAddress("");
      setPhoneNumber("");
      navigate("/customers/");
    }
  };

  return (
    <div className="my-5 container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Customer</h1>
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
                  onChange={(event) => handleUpdate(event, setAddress)}
                  value={address}
                  placeholder="Address"
                  required
                  type="text"
                  name="address"
                  id="address"
                  className="form-control"
                />
                <label htmlFor="address">Address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={(event) => handleUpdate(event, setPhoneNumber)}
                  value={phoneNumber}
                  placeholder="Phone Number"
                  required
                  type="text"
                  name="phone number"
                  id="phone number"
                  className="form-control"
                />
                <label htmlFor="phone number">Phone Number</label>
              </div>
              <button className="btn btn-success">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
