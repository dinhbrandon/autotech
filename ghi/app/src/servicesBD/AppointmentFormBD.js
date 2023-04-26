import React, { useEffect, useState } from 'react';

function AppointmentForm(){

    const [formData, setFormData] = useState(
        {
            vin: '',
            customer: '',
            date_time: '',
            technician: '',
            reason: '',
        }
    );

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const [technician, setTechnician] = useState([]);

    const fetchTechnician = async () => {
        const url = "http://localhost:8080/api/technicians/";
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            setTechnician(data.technicians);
        };
    };

    useEffect(() => {
        fetchTechnician();
    }, []);

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;

        if (inputName === 'date') {
            setDate(value);
        } else if (inputName === 'time') {
            setTime(value);
        } else{
            setFormData({
                ...formData,
                [inputName]: value
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const submitUrl = "http://localhost:8080/api/appointments/"

        const fetchConfig = {
            method: "post",
            body: JSON.stringify({
                ...formData,
                date_time: date + 'T' + time
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(submitUrl, fetchConfig);

        if (response.ok){
            setFormData({
                vin: '',
                customer: '',
                date_time: '',
                technician: '',
                reason: '',
            });
        }
    };

    return(
        <div className='row'>
            <div className='offset-3 col-6'>
                <div className='shadow p-4 mt-4'>
                    <h1>Create a service appointment</h1>
                    <form onSubmit={handleSubmit} id='appointment-form'>
                        <div>
                            <label htmlFor='vin'>Automobile VIN</label>
                            <input value={formData.vin} onChange={handleFormChange} required type='text' name='vin' id='vin' className='form-control' />
                        </div>
                        <div>
                            <label htmlFor='customer'>Customer</label>
                            <input value={formData.customer} onChange={handleFormChange} required type='text' name='customer' id='customer' className='form-control' />
                        </div>
                        <div>
                            <label htmlFor='date_time'>Date</label>
                            <input value={date} onChange={handleFormChange} required type='date' name='date' id='date' className='form-control' />
                        </div>
                        <div>
                            <label htmlFor='date_time'>Time</label>
                            <input value ={time} onChange={handleFormChange} required type='time' name='time' id='time' className='form-control' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor='technician'>Technician</label>
                            <select value={formData.technician} onChange={handleFormChange} required name="technician" id="technician" className="form-select">
                            <option value="">Choose a technician...</option>
                            {technician.map(technician => {
                                return (
                                <option key={technician.id} value={technician.id}>{technician.first_name} {technician.last_name}</option>
                                )
                            })}
                            </select>
                        </div>
                        <div>
                            <label htmlFor='reason'>Reason</label>
                            <input value={formData.reason} onChange={handleFormChange} required type='text' name='reason' id='reason' className='form-control' />
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AppointmentForm;