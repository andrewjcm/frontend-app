import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getToken, setFormResponse } from "../Utils/Common"
import axios from 'axios';


const HealthProfileForm = (props) => {
  const token = getToken();
  const headers = {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token,
        }
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {register, handleSubmit, formState: { errors } } = useForm();
  const handleData = (data) => {
    // Convert values to numbers
    for (var key in data) {
      if (data[key] === true) {
        data[key] = 1;
      } else if (data[key] === false) {
        data[key] = 0;
      } else {
        data[key] = Number(data[key]);
      }
    }
    setError(null);
    setLoading(true);
    axios.post('/api/health-profile/',
      data, { headers }
    ).then(response => {
      setLoading(false);
      setFormResponse(response.data)
      props.onResponseReceived(true);
    }).catch(error => {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        setError(error.response.data.message);
        props.onUnauthReceived(false);
      } else {
        setError("Something went wrong. Please try again later.")
        console.log(error);
      };
    });
  };
  const healthCheckOptions = [
    { label: "hospitalized", name: "hospitalized" },
    { label: "pnemonia" , name: "pnemonia" },
    { label: "diabetes" , name: "diabetes" },
    { label: "copd" , name: "copd" },
    { label: "asthma" , name: "asthma" },
    { label: "immunosuppression syndrome" , name: "inmsupr" },
    { label: "hypertension" , name: "hypertension" },
    { label: "cardiovascular disease" , name: "cardiovascular" },
    { label: "obesity" , name: "obesity" },
    { label: "kidney disease" , name: "renal_chronic" },
    { label: "tobacco use" , name: "tobacco" },
    { label: "other disease" , name: "other_disease" },
  ]

  return (
    <form onSubmit={handleSubmit(handleData)}>
      <label className="label">Age:</label>
      <input type="number" {...register("age", { required: true, min: 1, max: 120 })}/>
      <small className="text-danger">
        {errors.age && "Valid age required."}
      </small><br/><br/>
      <label className="label">Sex:</label>
      <select {...register("sex", { required: true })}>
        <option value="0">Male</option>
        <option value="1">Female</option>
      </select><br/><br/>
      <fieldset className="inner">
        <legend>Health Risks</legend>
        {
          healthCheckOptions.map (
            (options) =>
            <label key={options.name}>
            <input type="checkbox" name={options.name} {...register(options.name)}/>
            {options.label}<br/>
            </label>
          )
        }
      </fieldset>
      <input type="submit" value={loading ? 'Loading...' : 'Submit'} disabled={loading}/>
    </form>
  );
};
export default HealthProfileForm;
