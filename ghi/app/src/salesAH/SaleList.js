import { useState, useEffect } from "react";

export default function SaleList() {
  const [sales, setSales] = useState([]);

  const getSales = async () => {
    const salesUrl = "http://localhost:8090/api/sales/";
    const salesResponse = await fetch(salesUrl);

    if (salesResponse.ok) {
      const data = await salesResponse.json();
      const sales = data.sales;
      setSales(sales);
    }
  };

  useEffect(() => {
    getSales();
  }, []);

  return (
    <div>
      <h1>Sales</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson Name</th>
            <th>Salesperson Employee ID</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales?.map((sale) => {
            return (
              <tr key={sale.id}>
                <td>
                  {sale.salesperson.first_name} {sale.salesperson.last_name}
                </td>
                <td>{sale.salesperson.employee_id}</td>
                <td>
                  {sale.customer.first_name} {sale.customer.last_name}
                </td>
                <td>{sale.automobile.vin}</td>
                <td>{sale.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
