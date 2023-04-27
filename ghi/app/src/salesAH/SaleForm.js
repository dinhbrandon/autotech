import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SaleForm() {
  // Dropdown array information
  const [autos, setAutos] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [customers, setCustomers] = useState([]);

  // User inputted information fields
  const [vin, setVin] = useState("");
  const [salesperson, setSalesperson] = useState("");
  const [customer, setCustomer] = useState("");
  const [price, setPrice] = useState("");

  // Navigation reroute
  const navigate = useNavigate();

  const handleUpdate = (event, stateFunction) => {
    const value = event.target.value;
    stateFunction(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      automobile: vin,
      salesperson: salesperson,
      customer: customer,
      price: price,
    };

    const url = "http://localhost:8090/api/sales/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newSale = await response.json();
      setVin("");
      setSalesperson("");
      setCustomer("");
      setPrice("");
      navigate("/sales/");
    }
    // fetches the VIN data again so that you don't have to reload
    // the page to not show sold VINs
    fetchAutoData();
  };

  const fetchAutoData = async () => {
    const url = "http://localhost:8090/api/autovo/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setAutos(data.autos);
    }
  };

  const fetchSalespeopleData = async () => {
    const url = "http://localhost:8090/api/salespeople/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setSalespeople(data.salespeople);
    }
  };

  const fetchCustomersData = async () => {
    const url = "http://localhost:8090/api/customers/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customers);
    }
  };

  useEffect(() => {
    fetchAutoData();
    fetchSalespeopleData();
    fetchCustomersData();
  }, []);

  return (
    <div className="my-5 container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Record a new sale</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <select
                  onChange={(event) => handleUpdate(event, setVin)}
                  required
                  value={vin}
                  name="vin"
                  id="vin"
                  className="form-select"
                >
                  <option>Choose an automobile VIN...</option>
                  {autos
                    .filter((auto) => auto.sold === false)
                    .map((auto) => {
                      return (
                        // value is being returned as the data
                        // key is the location of the data (usually the id)
                        <option value={auto.vin} key={auto.import_href}>
                          {auto.vin}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="mb-3">
                <select
                  onChange={(event) => handleUpdate(event, setSalesperson)}
                  required
                  value={salesperson}
                  name="salesperson"
                  id="salesperson"
                  className="form-select"
                >
                  <option>Choose a salesperson...</option>
                  {salespeople?.map((salesperson) => {
                    return (
                      <option key={salesperson.id} value={salesperson.id}>
                        {salesperson.first_name} {salesperson.last_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                <select
                  onChange={(event) => handleUpdate(event, setCustomer)}
                  required
                  value={customer}
                  name="customer"
                  id="customer"
                  className="form-select"
                >
                  <option>Choose a customer...</option>
                  {customers?.map((customer) => {
                    return (
                      <option key={customer.id} value={customer.id}>
                        {customer.first_name} {customer.last_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={(event) => handleUpdate(event, setPrice)}
                  value={price}
                  placeholder="Price"
                  required
                  type="text"
                  name="price"
                  id="price"
                  className="form-control"
                />
                <label htmlFor="price">Price</label>
              </div>
              <button className="btn btn-success">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
