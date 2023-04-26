import React, {useEffect, useState } from 'react';


function VehicleModelForm(){

    const [formData, setFormData] = useState(
        {
            name: '',
            picture_url: '',
            manufacturer_id: '',
        }
    );
    
    //handle data from fetch to manufacturer_id
    const [manufacturer_id, setManufacturer] = useState([]); 

    const fetchManufacturer = async () => {
        const url = "http://localhost:8100/api/manufacturers/";
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            setManufacturer(data.manufacturers);
        };
    };

    useEffect(() => {
        fetchManufacturer();
    }, []);


    //handle changes of text in the form for all JSX input
    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;

        setFormData({
            ...formData,
            [inputName]: value
        });
    }


    //handle submission of form (create vehicle model)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const submitUrl = "http://localhost:8100/api/models/"

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(submitUrl, fetchConfig);

        if (response.ok){
            setFormData({
                name: '',
                picture_url: '',
                manufacturer_id: '',
            });
        }
    };

    return(
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a vehicle model</h1>
            <form onSubmit={handleSubmit} id="create-vehicle-form">
  
              <div>
                <input value={formData.name} onChange={handleFormChange} placeholder="Model name..." required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name"></label>
              </div>

              <div>
                <input value={formData.picture_url} onChange={handleFormChange} placeholder="Picture URL..." required type="text" name="picture_url" id="picture_url" className="form-control" />
                <label htmlFor="picture_url"></label>
              </div>

              <div className="mb-3">
                <select value={formData.manufacturer_id} onChange={handleFormChange} required name="manufacturer_id" id="manufacturer_id" className="form-select">
                  <option value="">Choose a manufacturer</option>
                  {manufacturer_id.map(manufacturer => {
                    return (
                      <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                    )
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
}
export default VehicleModelForm;