import { useState, useEffect } from "react";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);

  const getCustomers = async () => {
    const customersUrl = "http://localhost:8090/api/customers/";
    const customersResponse = await fetch(customersUrl);

    if (customersResponse.ok) {
      const data = await customersResponse.json();
      const customers = data.customers;
      setCustomers(customers);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div>
      <h1>Customers</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {customers?.map((customer) => {
            return (
              <tr key={customer.id}>
                <td>{customer.first_name}</td>
                <td>{customer.last_name}</td>
                <td>{customer.phone_number}</td>
                <td>{customer.address}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
