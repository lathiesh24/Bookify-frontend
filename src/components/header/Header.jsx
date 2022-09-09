import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faBed, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import "../header/header.css"
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import{format} from  "date-fns";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext.js';
import { AuthContext } from '../../context/AuthContext';

const Header = ({type}) => {
    const [openDate, setOpenDate] = useState(false);
    const [destination, setDestination] = useState("");
    const [dates, setDates] = useState([
       {
        startDate: new Date(),
        endDate:new Date(),
        key:'selection'
       }
    ]);

const [openOptions, setOpenOptions]=useState(false);
const [options,setOptions] = useState({
     adult:1,
     children:0,
     room:1
})

const navigate = useNavigate();
const {user} = useContext(AuthContext);

const handleOption =(name,operation) =>{
  setOptions(prev =>{return {
    ...prev,[name]:operation ==="i" ? options[name]+1: options[name]-1
  }})
}
const {dispatch} = useContext(SearchContext)

const handleSearch=()=>{
  dispatch({type:"NEW_SEARCH", payload:{destination,dates,options}})
  navigate("/hotels",{state:{ destination ,dates ,options }});
}



  return (
    <div className='header'>
     <div className={type=="list" ? "headerContainer listMode" : "headerContainer"}>  
         <div className="headerList">
           <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport Taxis</span>
           </div>
          </div> 
          { type !=="list" &&
            <>
            <h1 className="headerTitle">A lifetime of discounts? It's Genius</h1>
          <p className="headerDesc">
            Get rewarded for your travels-unlock instant savings of 10% or move with a free Bookify account
          </p>
          {!user &&<button className="headerBtn">Sign In / Register</button>}
          <div className="headerSearch">
            <div className="headerSearchItem">
               <FontAwesomeIcon icon={faBed} className="headerIcon"/>   
               <input type="text" 
               placeholder='Where are you going?'
               className='headerSearchInput'
               onChange={e=>setDestination(e.target.value)}/>
            </div>
            <div className="headerSearchItem">
               <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>   
               <span onClick={()=>setOpenDate(!openDate)} className='headerSearchText'>
                {format(dates[0].startDate,"dd/MM/yyyy")} 
                to
                {format(dates[0].endDate,"dd/MM/yyyy")}</span>
             {openDate &&
               <DateRange
               editableDateInputs={true}
               onChange={item => setDates([item.selection])}
               moveRangeOnFirstSelection={false}
               ranges={dates}
               className="date"
               minDate={new Date()}
               />}
            </div>
            <div className="headerSearchItem">
               <FontAwesomeIcon icon={faPerson} className="headerIcon"/>   
               <span onClick={()=>setOpenOptions(!openOptions)} className='headerSearchText'>{options.adult} Adult · {options.children} Children · {options.room} Room</span>
               {openOptions && <div className="options">
                  <div className="optionItem">
                    <span className="optionTest">Adult</span>
                  <div className="optionCounter">
                    <button 
                    disabled={options.adult <=1}
                    className="optionCounterBtn" 
                    onClick={()=>handleOption("adult","d")}>
                      -
                    </button>
                     <span className="optionCounterNumber">1</span>
                    <button className="optionCounterBtn" onClick={()=>handleOption("adult","i")}>+</button>
                   </div>
                  </div>
                     <div className="optionItem">
                    <span className="optionTest">Children</span>
                      <div className="optionCounter">
                    <button 
                     disabled={options.children <=0}
                    className="optionCounterBtn" 
                    onClick={()=>handleOption("children","d")}>-</button>
                     <span className="optionCounterNumber">0</span>
                    <button 
                    className="optionCounterBtn"
                     onClick={()=>handleOption("children","i")}>+
                     </button>
                    </div>
                  </div>
                     <div className="optionItem">
                    <span className="optionTest">Room</span>
                    <div className="optionCounter">
                    <button className="optionCounterBtn" 
                     disabled={options.room <=1}
                    onClick={()=>handleOption("room","d")}>-</button>
                     <span className="optionCounterNumber">1</span>
                    <button className="optionCounterBtn" onClick={()=>handleOption("room","i")}>+</button>
                    </div> 
                  </div>
               </div>}
            </div>
            <div className="headerSearchItem">
              <button className="headerBtn" onClick={handleSearch}>Search</button>
            </div>
          </div></>}
        </div>
    </div>
  )
}

export default Header