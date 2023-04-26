import { useState, useEffect } from "react";

export default function SalespersonList() {
  const [salespeople, setSalespeople] = useState([]);

  const getSalespeople = async () => {
    const salespeopleUrl = "http://localhost:8090/api/salespeople/";
    const salespeopleResponse = await fetch(salespeopleUrl);

    if (salespeopleResponse.ok) {
      const data = await salespeopleResponse.json();
      const salespeople = data.salespeople;
      setSalespeople(salespeople);
    }
  };

  useEffect(() => {
    getSalespeople();
  }, []);

  return (
    <div>
      <h1>Salespeople</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Employee ID</th>
          </tr>
        </thead>
        <tbody>
          {salespeople?.map((salesperson) => {
            return (
              <tr key={salesperson.id}>
                <td>{salesperson.first_name}</td>
                <td>{salesperson.last_name}</td>
                <td>{salesperson.employee_id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
