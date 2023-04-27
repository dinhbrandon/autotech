import React, {useEffect, useState } from 'react';

function AppointmentHistory(){
    const [appointments, setAppointments] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    const fetchData = async () => {
        const url = "http://localhost:8080/api/appointments/"

        try {
            const response = await fetch(url);
            if(response.ok){
                const data = await response.json();
                setAppointments(data.appointments);
                setFilteredAppointments(data.appointments)

            }
        } catch (e) {
            console.error(e)
        }
    };

    
    useEffect(() => {
        fetchData();
      }, []);

    // filter appointments upon pressing submit
    const handleSubmit = async (event) => {
        event.preventDefault();

             const results = appointments.filter((appointment) => {
                return appointment.vin.includes(searchInput);               

            });
            setFilteredAppointments(results);
        
    };
    // this would allow us to filter in real time regardless of pressing submit - must be onChange=
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchInput(value);
    };
    //filter appointments will still be appointments until entered into search
    // const filteredAppointments = appointments.filter(appointment => {
    //     return appointment.vin.includes(searchInput);
    // });

    return (
        <div>
            <h1>Service History</h1>
            
            <form onSubmit={handleSubmit}>
                <div className='input-group mb-3 w-100'>
                    <input className='form-control' type='search' name='searchInput' aria-describedby='submit-button' placeholder='Search by VIN...' value={searchInput} onChange={handleSearch}/>
                    <button className='btn btn-outline-secondary' type='submit' id='submit-button'>Search</button>
                </div>
            </form>
            

            <table className='table table-striped' >
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Is VIP?</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAppointments.map((appointment) => {
                        const dateTime = new Date(appointment.date_time);
                        const date = dateTime.toLocaleDateString()
                        const time = dateTime.toLocaleTimeString()

                            if(appointment.status === "Canceled" || appointment.status ==="Finished"){
                                return(
                                    <tr key={appointment.id}>
                                        <td>{appointment.vin}</td>
                                        <td>{appointment.is_vip ? 'Yes' : 'No'}</td>
                                        <td>{appointment.customer}</td>
                                        <td>{date}</td>
                                        <td>{time}</td>
                                        <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                        <td>{appointment.reason}</td>
                                        <td>{appointment.status}</td>
                                    </tr>
                                )
                            }                    
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AppointmentHistory;