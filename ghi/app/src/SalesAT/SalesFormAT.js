import React, { useEffect, useState } from "react";

export default function SalesForm() {
    const [autos, setAutos] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [href, setHref] = useState("");
    const [salesperson, setSalesperson] = useState("");
    const [customer, setCustomer] = useState("");
    const [price, setPrice] = useState("");

    const handleUpdate = (e, stateFunction) => {
        const value = e.target.value;
        stateFunction(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {};

        data.automobile = href;
        data.salesperson_id = salesperson;
        data.customer_id = customer;
        data.price = price;

        const url = "http://localhost:8090/api/sales/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }

        const response = await fetch(url, fetchConfig)

        if (response.ok) {
            setHref("");
            setSalesperson("");
            setCustomer("");
            setPrice("");
            fetchAutoData();
        }
    }

    const fetchAutoData = async () => {
        const url = "http://localhost:8090/api/autoVO/";

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setAutos(data.autos);
        }
    }

    const fetchSalespeopleData = async () => {
        const url = "http://localhost:8090/api/salespeople/";

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople);
        }
    }

    const fetchCustomerData = async () => {
        const url = "http://localhost:8090/api/customers/";

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        }
    }

    useEffect(() => {
        fetchAutoData();
        fetchSalespeopleData();
        fetchCustomerData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Record a New Sale</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <select onChange={(e) => handleUpdate(e, setHref)} value={href} placeholder="Choose a VIN" required name="href" id="href" className="form-select">
                                <option value="">--</option>
                                {autos.filter(auto => auto.sold === false).map(auto => {
                                    return(
                                        <option value={auto.import_href} key={auto.import_href}>
                                            {auto.vin}
                                        </option>
                                    )
                                })}
                            </select>
                            <label htmlFor="href">Choose a VIN</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select onChange={(e) => handleUpdate(e, setSalesperson)} value={salesperson} placeholder="Choose a Salesperson" required name="salesperson" id="salesperson" className="form-select">
                                <option value="">--</option>
                                {salespeople.map(salesperson => {
                                    return(
                                        <option value={salesperson.id} key={salesperson.id}>
                                            {salesperson.first_name + " " + salesperson.last_name}
                                        </option>
                                    )
                                })}
                            </select>
                            <label htmlFor="salesperson">Choose a Salesperson</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select onChange={(e) => handleUpdate(e, setCustomer)} value={customer} placeholder="Choose a Customer" required name="customer" id="customer" className="form-select">
                                <option value="">--</option>
                                {customers.map(customer => {
                                    return(
                                        <option value={customer.id} key={customer.id}>
                                            {customer.first_name + " " + customer.last_name}
                                        </option>
                                    )
                                })}
                            </select>
                            <label htmlFor="customer">Choose a Customer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={(e) => handleUpdate(e, setPrice)} value={price} placeholder="Price" required type="text" name="price" id="price" className="form-control"/>
                            <label htmlFor="price">Price</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
