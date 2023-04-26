import { useState, useEffect } from "react";

export default function SalespersonHistory() {
  // Dropdown array information
  const [sales, setSales] = useState([]);
  const [salespeople, setSalespeople] = useState([]);

  // User inputted information field
  const [salesperson, setSalesperson] = useState("");

  const handleUpdate = (event, stateFunction) => {
    const value = event.target.value;
    stateFunction(value);
  };

  const fetchSalesData = async () => {
    const url = "http://localhost:8090/api/sales/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setSales(data.sales);
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

  useEffect(() => {
    fetchSalesData();
    fetchSalespeopleData();
  }, []);

  return (
    <div>
      <h1>Salesperson History</h1>
      <div className="mb-3">
        <select
          onChange={(event) => handleUpdate(event, setSalesperson)}
          required
          value={salesperson}
          name="salesperson"
          id="salesperson"
          className="form-select"
        >
          <option>Choose a salesperson</option>
          {salespeople.map((salesperson) => {
            return (
              <option value={salesperson.id} key={salesperson.id}>
                {salesperson.first_name} {salesperson.last_name}
              </option>
            );
          })}
        </select>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales
            .filter((sale) => {
              if (sale) {
                return sale.salesperson.id == salesperson;
              }
            })
            .map((sale) => {
              return (
                <tr key={sale.id}>
                  <td>
                    {sale.salesperson.first_name} {sale.salesperson.last_name}
                  </td>
                  <td>
                    {sale.customer.first_name} {sale.customer.last_name}
                  </td>
                  <td> {sale.automobile.vin} </td>
                  <td> {sale.price} </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
