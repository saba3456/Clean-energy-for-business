import '../CSSContents/Co2Calculator.css'
import React, { useState } from "react";

function Co2Calculator() {
    /*
        const [form, setForm] = useState({
            electricity: 0,
            gas: 0,
            vehicleMileage: 0,
            co2Output: 0
        })
    */
    const [electricity, setElectricity] = useState(0);
    const [gas, setGas] = useState(0);
    const [vehicleMileage, setVehicleMileage] = useState(0);
    const [co2Output, setCo2Output] = useState(0);

    const calculateCo2 = () => {
        const electricityCo2 = electricity * 0.5;
        const gasCo2 = gas * 0.2;
        const vehicleCo2 = vehicleMileage * 0.1;
        setCo2Output(electricityCo2 + gasCo2 + vehicleCo2);
    };

    /*
        const handleChange = (e) => {
            setForm({
                ...form,
                [e.target.name]: e.target.value,
            });
    
        };
    */


    return (
        <div className="Co2Calculator">
            <div >
                <label className='co2-label'>Electricity Usage (kWh):</label>
                <input
                    className='co2-input'
                    type="number"
                    value={electricity}
                    onChange={(e) => setElectricity(e.target.value)}
                />
            </div>
            <div>
                <label className='co2-label'>Gas Usage (therms):</label>
                <input
                    className='co2-input'
                    type="number"
                    value={gas}
                    onChange={(e) => setGas(e.target.value)}
                />
            </div>
            <div>
                <label className='co2-label'>Vehicle Mileage (miles):</label>
                <input
                    className='co2-input'
                    type="number"
                    value={vehicleMileage}
                    onChange={(e) => setVehicleMileage(e.target.value)}
                />
            </div>
            <button className='co2-btn' onClick={calculateCo2}>Calculate CO2 Output</button>
            <div>
                <label className='co2-label'>CO2 Output (metric tons):</label>
                <input type="text" className='co2-input' value={co2Output} readOnly />
            </div>
        </div>
    );


};

export default Co2Calculator;
