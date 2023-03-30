import '../CSSContents/Radar.css'
import 'leaflet/dist/leaflet.css';
import React, {useState, useEffect} from "react";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet/Marker'
import { Popup } from 'react-leaflet/Popup'
import { Icon } from 'leaflet'
import axios from 'axios'
import { Link } from 'react-router-dom';



function Radar(){
    localStorage.removeItem('radarChatUsername');
    const [position, setPosition] = useState([0, 0])
    const [markerInfo, setMarkerInfo] = useState({
        username: JSON.parse(localStorage.getItem('username')),
        name: '',
        lat: '',
        lng: '',
    });
    const [errors, setErrors] = useState([]);
    const [showMap, setShowMap] = useState(false);
    const [hasMarker, setHasMarker] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [mapMarkers, setMapMarkers] = useState([]);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:4000/locationget/${markerInfo.username}`)
        .then((response) => {
            if (response.data) {                
                const{business, latitude, longitude} = response.data;
                markerInfo.name = business;
                markerInfo.latitude = latitude;
                markerInfo.longitude = longitude;
                setPosition([markerInfo.latitude, markerInfo.longitude])
                setHasMarker(true);
                setUpdate(true)
            }
        })
        .catch((error) => {
            if(error.response){
                if(error.response.status === 404){
                    setShowUpdate(true)
                }
            }
        })
        console.log(showUpdate)
    }, []);

    

    const onInfoChange = (e) => {
        setMarkerInfo({
            ...markerInfo,
            [e.target.name]: e.target.value,
        }
    )};
  

    function checkErrors(){
        const err = [];

        if (!markerInfo.name) {
            err.push("- Business Name: No business name entered.")
        }else if(markerInfo.name.length <= 2){
            err.push("- Business Name: Business name must be at least 3 characters long.")
        }else if(markerInfo.name.length > 30){
            err.push("- Business Name: Business name must be 30 characters or less.")
        }
        if (!markerInfo.lat) {
            err.push("- Business Location: No business latitude entered.")
        } else if (isNaN(markerInfo.lat)) {
            err.push("- Business Location: Latitude is not a number.")
        }
        if (!markerInfo.lng) {
            err.push("- Business Location: No business longitude entered.")
        } else if (isNaN(markerInfo.lng)) {
            err.push("- Business Location: Longitude is not a number.")
        }

        
        return err;
    };
  
    const onSubmit = (e) => {
        e.preventDefault();

        const err = checkErrors();
        setErrors(err);
        console.log(err);

        if (err.length === 0){
            if(!hasMarker){
                axios.post('http://localhost:4000/locationset', markerInfo)
                .then((response) => {
                    if (response.data === 'Business data successfully entered') {
                        setPosition([markerInfo.lat, markerInfo.lng]);
                        setHasMarker(true);
                        setUpdate(true);
                    }
                })
            }else{
                axios.post('http://localhost:4000/locationUpdate', markerInfo)
                .then((response) => {
                    if (response.data === 'Business data successfully updated') {
                        setPosition([markerInfo.lat, markerInfo.lng]);
                        setUpdate(true);
                    }
                })
            }
        }
    }

    useEffect(() => {
        if (update) {
            axios.get(`http://localhost:4000/locationgetMarkers/${markerInfo.username}`)
            .then((response) => {
                if (response.data) {
                    setMapMarkers(response.data)
                    setShowMap(true);
                }
            })
            .finally(() => {
                setUpdate(false);
            })
        }
      }, [update]);

    return (
        <div>
            {!showUpdate && <button onClick={() => setShowUpdate(!showUpdate)}>Update Business Information</button> }
            {showUpdate && hasMarker && <button onClick={() => setShowUpdate(!showUpdate)}>Hide</button> }
            <br></br>
            {showUpdate && 
                <form onSubmit={onSubmit}>
                <div className='input-title'>Business Name</div>
                <input type="text" className='input' name="name" placeholder="Name" onChange={onInfoChange}/>
                <div className='input-title'>Business Location</div>
                <div>
                <input type="text" className='input' name="lat" placeholder="Latitude" onChange={onInfoChange}/>
                <input type="text" className='input' name="lng" placeholder="Longitude" onChange={onInfoChange}/>
                </div>
                <button type="submit">Set Business Information</button>
                </form>
            }
            {errors.map(err => (
                <div className='error-text'>{err}</div>
            ))}
            <br></br>
            {showMap && <Map mapPosition={position} mapMarkers={mapMarkers} />}
        </div>
      );

}


function Map({mapPosition, mapMarkers}) {

    const userBusinessIcon = new Icon({
        iconUrl: process.env.PUBLIC_URL + '/images/map-marker-icon-blue.png',
        iconSize: [48,48]
     })
    const otherBusinessIcon = new Icon({
        iconUrl: process.env.PUBLIC_URL + '/images/map-marker-icon.png',
        iconSize: [48,48]
    })

    function onMarkerChat(markername){
        console.log(markername);
        localStorage.setItem('radarChatUsername', JSON.stringify(markername));
    }

    return (
        <MapContainer center={mapPosition} zoom={15} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Marker position={mapPosition} icon={userBusinessIcon}>
                <Popup>
                    This is your business.
                </Popup>
            </Marker>
            {mapMarkers.map(marker => (
                <Marker position={[marker.latitude, marker.longitude]} icon={otherBusinessIcon}>
                    <Popup>
                        {marker.name}
                        <br></br>
                        {marker.username}
                        <br />
                        <Link to='/BusinessChat'>
                            <button onClick={() => onMarkerChat(marker.username)}>Chat</button>
                        </Link>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}


export default Radar;
