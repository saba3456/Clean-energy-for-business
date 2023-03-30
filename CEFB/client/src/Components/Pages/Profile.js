import '../CSSContents/Profile.css';
import Co2Calculator from './Co2Calculator'
import LoginRegister from './LoginRegister';
import Radar from './Radar';
import BusinessChat from './BusinessChat';
import { Link } from 'react-router-dom';


function Profile() {

    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

    if (!isLoggedIn) {
        return <LoginRegister />

    }

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', JSON.stringify(false));
        window.location.href = '/';
    };
    return (
        <div className='Profile'>
            <div>
                <Link to='/Co2' >
                    <button className='btn-Profile' onClick={<Co2Calculator />} >Co2Calculator</button>
                </Link>
                <Link to='/Radar'>
                    <button className='btn-Profile' onClick={<Radar />} >Radar</button>
                </Link>
                <Link to='/BusinessChat'>
                    <button className='btn-Profile' onClick={<BusinessChat />} >Business Chat</button>
                </Link>
            </div>

            <div className='logout-btn'>
                <button className='btn-Profile' onClick={handleLogout}>Logout</button>

            </div>


        </div >

        //well im back again 
    )
}


export default Profile;