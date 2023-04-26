import React, { useEffect, useState } from "react";

export default function SalespersonHistory() {
    const [sales, setSales] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [salesperson, setSalesperson] = useState("");

    const handleUpdate = (e, stateFunction) => {
        const value = e.target.value;
        stateFunction(value);
    }

    const fetchSalesData = async () => {
        const url = "http://localhost:8090/api/sales/";

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setSales(data.sales);

        }
    }

    const fetchSalespeopleData = async() => {
        const url = "http://localhost:8090/api/salespeople";

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople)
        }
    }

    useEffect(() => {
        fetchSalesData();
        fetchSalespeopleData();
    }, []);

    return (
        <div className="my-5 container">
            <h1>Salesperson History</h1>
            <div className="mb-3">
                <select onChange={(e) => handleUpdate(e, setSalesperson)} value={salesperson} name="salesperson" id="salesperson" className="form-select">
                    <option value="">--</option>
                    {salespeople.map(salesperson => {
                        return(
                            <option value={salesperson.id} key={salesperson.id}>
                                {salesperson.first_name + " " + salesperson.last_name}
                            </option>
                        )
                    })}
                </select>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson Employee ID</th>
                        <th>Salesperson Name</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.filter(sale => {
                        return (
                            salesperson == "" ? sale : sale.salesperson.id == salesperson
                        )
                    }).map(sale => {
                        return (
                            <tr key={sale.id}>
                                <td> {sale.salesperson.employee_id} </td>
                                <td> {sale.salesperson.first_name + " " + sale.salesperson.last_name} </td>
                                <td> {sale.customer.first_name + " " + sale.customer.last_name} </td>
                                <td> {sale.automobile.vin} </td>
                                <td> {sale.price} </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
