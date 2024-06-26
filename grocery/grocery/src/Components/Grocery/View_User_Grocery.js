
import { useState, useEffect } from "react"; 
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuthToken ,setTitle} from "../../Constants/Constant";
import image1 from "../../Images/image1.png"
import image2 from "../../Images/image3.png"
import image3 from "../../Images/image4.png"
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const AddGroceryPage = () => {
  const [groceries, setGroceries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);
  const navigate = useNavigate();

  // Add a default value for authToken if locationn.state is null or undefined
  const authToken = getAuthToken() || ''; 
  setTitle("Groceries Listed by You")
  
  window.dispatchEvent(new Event('titleChange'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://groceries-i18z.onrender.com/api/groceries/userspecificgrocery",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json"
            }
          }
        );
        setGroceries(response.data);
        setLoading(false);
        console.log("received user details ", response.data);
      } catch (error) {
        console.error("Something went wrong ", error);
      }
    };

    fetchData();
    
  }, [authToken]);

  const formatDate = (dateString) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
  
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear() % 100; // Get last two digits of the year
  
      // Function to get the ordinal suffix for the day
      const getOrdinalSuffix = (day) => {
        if (day >= 11 && day <= 13) {
          return "th";
        }
        switch (day % 10) {
          case 1:
            return "<sup>st</sup>";
          case 2:
            return "<sup>nd</sup>";
          case 3:
            return "<sup>rd</sup>";
          default:
            return "<sup>th</sup>";
        }
      };
  
      // Add the ordinal suffix to the day
      const dayWithSuffix = day + getOrdinalSuffix(day);
  
      return  (     <span dangerouslySetInnerHTML={{ __html: `${dayWithSuffix} ${month}, ${year}` }} />)
      ;
    }
    return 'Invalid Date';
  };
  const imageLinks = [
    image1,image2,image3
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageLinks.length);
    return imageLinks[randomIndex];
  };
  const handleClick = (event, item) => {
    event.preventDefault();
    console.log('auth token', authToken)
    console.log('item', item)
    navigate('/ShowAllBids', { state: { item: item, authToken: authToken } });
  };

  const toggleCard = (index) => {
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

  return (
    <div >
      {loading ? (
        <div class="preloader">
        <svg class="cart" role="img" aria-label="Shopping cart line animation" viewBox="0 0 128 128" width="128px" height="128px" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="8">
            <g class="cart__track" stroke="hsla(0,10%,10%,0.1)">
              <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
              <circle cx="43" cy="111" r="13" />
              <circle cx="102" cy="111" r="13" />
            </g>
            <g class="cart__lines" stroke="red !important">
              <polyline class="cart__top" points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" stroke-dasharray="338 338" stroke-dashoffset="-338" />
              <g class="cart__wheel1" transform="rotate(-90,43,111)">
                <circle class="cart__wheel-stroke" cx="43" cy="111" r="13" stroke-dasharray="81.68 81.68" stroke-dashoffset="81.68" />
              </g>
              <g class="cart__wheel2" transform="rotate(90,102,111)">
                <circle class="cart__wheel-stroke" cx="102" cy="111" r="13" stroke-dasharray="81.68 81.68" stroke-dashoffset="81.68" />
              </g> 
            </g>
          </g>
        </svg>
        <div class="preloader__text">
          <p class="preloader__msg">Bringing you the goods…</p>
          <p class="preloader__msg preloader__msg--last">This is taking long. Something’s wrong.</p>
        </div>
      </div>
      ) : (
        <ul className="cards">
          {groceries.map((item, index) => (
            <li key={index}>
              <a href="#" className="card" onClick={(event) => { toggleCard(index); handleClick(event, item) }}>
                <img src={getRandomImage()} className="card__image" alt="" />
                <div className="card__overlay">
                  <div className="card__header">
                    <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
                      <path />
                    </svg>
                    
                    <div className="card__header-text">
                      <h3 className="card__title">{item.itemName}</h3>
                      <span className="card__min-price">Price: {item.minPrice}</span>
                    </div>
                  </div>
                  <div className="card__description">
                    <div className='info'>
                      <span className="card__quantity">Quantity: {item.quantity}</span>
                      <span className="card__expiration">Exp: {formatDate(item.expirationDate)}</span>
                      <span className="No_of_bids">No. of Bids: {item.bids.length}</span>
                    </div>
                    <div className="button-container_info">
                      <button className="button-6" onClick={(event) => handleClick(event, item)}>Show All Bids</button>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
      <div><p>in view_grocery</p></div>
    </div>
  );
};

export default AddGroceryPage;

