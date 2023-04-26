import React, { useState, useEffect } from "react";

export default function SaleForm() {
//   const [vins, setVins] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [customers, setCustomers] = useState([]);

//   const [vin, setVin] = useState("");
  const [salesperson, setSalesperson] = useState("");
  const [customer, setCustomer] = useState("");
  const [price, setPrice] = useState("");

  const handleUpdate = (event, stateFunction) => {
    const value = event.target.value;
    stateFunction(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
    //   vin: vin,
      salesperson: salesperson,
      customer: customer,
      price: price,
    };

    const salesUrl = "http://localhost:8100/api/sales/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await fetch(salesUrl, fetchConfig);
    if (response.ok) {
      const newSale = await response.json();
      console.log(newSale);
    //   setVin("");
      setSalesperson("");
      setCustomer("");
      setPrice("");
    }
  };

//   const fetchAutoData = async () => {
//     const autoUrl = "http://localhost:8100/api/automobiles/";
//     const response = await fetch(autoUrl);
//     if (response.ok) {
//       const data = await response.json();

//       const autos = data.autos;
//       const vins = [];

//       for (const auto in autos) {
//         vins.push(auto.vin)
//       }

//       setVins(vins);
//       console.log(data.autos)
//     }
//   };

  const fetchSalespeopleData = async () => {
    const salespeopleUrl = "http://localhost:8090/api/salespeople/";
    const response = await fetch(salespeopleUrl);
    if (response.ok) {
      const data = await response.json();
      setSalespeople(data.salespeople);
    }
  };

  const fetchCustomerData = async () => {
    const customersUrl = "http://localhost:8090/api/customers/";
    const response = await fetch(customersUrl);
    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customers);
    }
  };

  useEffect(() => {
    // fetchAutoData();
    fetchSalespeopleData();
    fetchCustomerData();
  }, []);

  return (
    <div className="my-5 container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Record a New Sale</h1>
            <form onSubmit={handleSubmit}>
              {/* <div className="mb-3">
                <select
                  onChange={(e) => handleUpdate(e, setVins)}
                  required
                  value={vin}
                  name="vins"
                  id="vins"
                  className="form-select"
                >
                  <option value="">Choose an automobile VIN...</option>
                  {autos?.map((auto) => {
                    return (
                      <option key={auto.id} value={auto.id}>
                        {auto.vin}
                      </option>
                    );
                  })}
                </select>
              </div> */}
              <div className="mb-3">
                <select
                  onChange={(e) => handleUpdate(e, setSalespeople)}
                  required
                  value={salesperson}
                  name="salesperson"
                  id="salesperson"
                  className="form-select"
                >
                  <option value="">Choose a salesperson...</option>
                  {salespeople?.map((salesperson) => {
                    return (
                      <option key={salesperson.id} value={salesperson.id}>
                        {salesperson}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                <select
                  onChange={(e) => handleUpdate(e, setCustomers)}
                  required
                  value={customer}
                  name="customer"
                  id="customer"
                  className="form-select"
                >
                  <option value="">Choose a customer...</option>
                  {customers?.map((customer) => {
                    return (
                      <option key={customer.id} value={customer.id}>
                        {customer}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={(e) => handleUpdate(e, setPrice)}
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
