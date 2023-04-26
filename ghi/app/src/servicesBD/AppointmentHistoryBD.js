import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AppointmentHistory(){
    const [appointments, setAppointments] = useState([]);

    const fetchData = async () => {
        const url = "http://localhost:8080/api/appointments/"

        try {
            const response = await fetch(url);
            if(response.ok){
                const data = await response.json();
                setAppointments(data.appointments);
                console.log(data.appointments)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchData();
      }, []);
    
    const finishAppointment = async (appointmentId) => {
        const url = `http://localhost:8080/api/appointments/${appointmentId}/finish`
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(appointments),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);

        if (response.ok){
            fetchData()
        }
    }

    const cancelAppointment = async (appointmentId) => {
        const url = `http://localhost:8080/api/appointments/${appointmentId}/cancel`
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(appointments),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);

        if (response.ok){
            fetchData()
        }
    }

    return(
        <div>
            <h1>Service Appointments</h1>
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
                    {appointments.map((appointment) => {
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