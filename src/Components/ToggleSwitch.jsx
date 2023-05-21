import './ToggleSwitch.css'
import { useState } from 'react';

const ToggleSwitch = ({onToggle})=>{
    const [toggle,setToggle] = useState(false);

    const toggleHandler = () => {
        onToggle(!toggle);
        setToggle(!toggle);
    }

    return(
        <label className="switch">
            <input type="checkbox" onClick={toggleHandler}></input>
            <span className="slider round"><span className='slider-dot'><i className={`fa-solid ${toggle?'fa-moon':'fa-sun'}`}></i></span></span>
        </label>
    ); 
}

export default ToggleSwitch;