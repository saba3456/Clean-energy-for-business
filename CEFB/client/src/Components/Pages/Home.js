import '../CSSContents/Home.css';
import React from 'react';
import { Link } from 'react-router-dom';


function Home() {
    // alt is used to describe the content of the image 
    return (

        <div className="Home">
            <h1>Check out what is the best option for your Business!</h1>

            <div className='Structure'>
                <Link className='business-image' to='GymSolution'> <img className='fade-img'
                    src='images/897.jpg' height={220} width={420}
                    alt='Gym Solution'
                />
                    <h3 className='description'> Gyms and Fitness Centers</h3>
                </Link>

                <Link className='business-image' to='/Courier'> <img className='fade-img'
                    src={'images/4016547_15255.jpg'} height={220} width={420}
                    alt='Courier'
                />
                    <h3 className='description'>Sustainable delivery services</h3>
                </Link>

                <Link className='business-image' to='/BoilerBioFuel'><img className='fade-img'
                    src='images/7291389.jpg' height={220} width={420}
                    alt='Boiler Bio Fuel'
                />
                    <h3 className='description'>Biofuel-boilers</h3>
                </Link>
            </div>
        </div>
    )
}


export default Home;