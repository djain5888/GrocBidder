// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./GroceriesList.css";
// import { useNavigate } from 'react-router-dom';
// import { getAuthToken, setTitle } from "../../Constants/Constant";
// import image1 from "../../Images/image1.png";
// import image2 from "../../Images/image3.png";
// import image3 from "../../Images/image4.png";

// const GroceriesList = ({ token }) => {
//   const [groceries, setGroceries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedCard, setExpandedCard] = useState(null);
//   const [bidModalOpen, setBidModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [bidAmount, setBidAmount] = useState(0);
//   const [bidQuantity, setBidQuantity] = useState(0);
//   const [Apierror, setError] = useState(null);

//   setTitle("All Groceries");
//   window.dispatchEvent(new Event('titleChange'));
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchGroceries = async () => {
//       try {
//         const response = await axios.get("https://groceries-i18z.onrender.com/api/groceries", {
//           headers: {
//             Authorization: `Bearer ${getAuthToken()}`,
//           },
//         });
//         setGroceries(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching groceries:", error);
//         setLoading(false);
//       }
//     };

//     fetchGroceries();
//   }, [token]);

//   const imageLinks = [
//         image1,image2,image3
//       ];
    
//       const getRandomImage = () => {
//         const randomIndex = Math.floor(Math.random() * imageLinks.length);
//         return imageLinks[randomIndex];
//       };
    
//   const handleClick = () => {
//     navigate('/add-grocery', { state: { authToken: getAuthToken() } });
//   };

//   const toggleCard = (e,index) => {
//     e.preventDefault()
//     if (expandedCard === index) {
//       setExpandedCard(null);
//     } else {
//       setExpandedCard(index);
//     }
//   };

//   const formatDate = (dateString) => {
//         const months = [
//           "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//           "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
//         ];
    
//         const date = new Date(dateString);
//         if (!isNaN(date.getTime())) {
//           const day = date.getDate();
//           const month = months[date.getMonth()];
//           const year = date.getFullYear() % 100; // Get last two digits of the year
    
//           // Function to get the ordinal suffix for the day
//           const getOrdinalSuffix = (day) => {
//             if (day >= 11 && day <= 13) {
//               return "th";
//             }
//             switch (day % 10) {
//               case 1:
//                 return "<sup>st</sup>";
//               case 2:
//                 return "<sup>nd</sup>";
//               case 3:
//                 return "<sup>rd</sup>";
//               default:
//                 return "<sup>th</sup>";
//             }
//           };
    
//           // Add the ordinal suffix to the day
//           const dayWithSuffix = day + getOrdinalSuffix(day);
    
//           return  (     <span dangerouslySetInnerHTML={{ __html: `${dayWithSuffix} ${month}, ${year}` }} />)
//           ;
//         }
//         return 'Invalid Date';
//       };
    
//   const handlePlaceBid = (e,item) => {
//     e.preventDefault()
//     setSelectedItem(item);
//     setBidModalOpen(true);
//   };

//   const handleBidSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `https://groceries-i18z.onrender.com/api/groceries/${selectedItem._id}/bids`,
//         {
//           amount: bidAmount,
//           quantity: bidQuantity
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${getAuthToken()}`,
//             "Content-Type": "application/json"
//           }
//         }
//       );
//       console.log("Bid placed successfully:", response.data);
//       setBidModalOpen(false);
//     } catch (error) {
//       setError(error.response.data);
//       console.error("Error placing bid:", error.response.data);
//     }
//   };

//   const handleCloseModal = () => {
//     setError(null);
//     setBidModalOpen(false);
//   };

//   return (
//     <div>
//       {loading && (
//         <div className="preloader">
//           <svg className="cart" role="img" aria-label="Shopping cart line animation" viewBox="0 0 128 128" width="128px" height="128px" xmlns="http://www.w3.org/2000/svg">
//             <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8">
//               <g className="cart__track" stroke="hsla(0,10%,10%,0.1)">
//                 <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
//                 <circle cx="43" cy="111" r="13" />
//                 <circle cx="102" cy="111" r="13" />
//               </g>
//             </g>
//           </svg>
//           <div className="preloader__text">
//             <p className="preloader__msg">Bringing you the goods…</p>
//             <p className="preloader__msg preloader__msg--last">This is taking long.Please give us a moment to fix.</p>
//           </div>
//         </div>
//       )}
//       <div className="button-container">
//         <button className="button-6" onClick={handleClick}>Add New Item</button>
//       </div>

//       <ul className="grocerycards">
//         {groceries.map((item, index) => (
//           <li key={index}>
//             <a href="#" className="card" onClick={(e) => toggleCard(e,index)}>
//               <img src={getRandomImage()} className="card__image" alt="" />
//               <div className="card__overlay">
//                 <div className="card__header">
//                   <div className="card__header-text">
//                     <h3 className="card__title">{item.itemName}</h3>
//                     <span className="card__min-price">Price: {item.minPrice}</span>
//                   </div>
//                 </div>
//                 <div className="card__description">
//                   <div className="info">
//                     <span className="card__quantity">Quantity: {item.quantity}</span>
//                     <span className="card__expiration">Exp: {formatDate(item.expirationDate)}</span>
//                     <span className="No_of_bids">No. of Bids: {item.bids.length}</span>
//                   </div>
//                   <div className="button-container_info">
//                     <button className="button-6" onClick={(e) => handlePlaceBid(e,item)}>Place Bid</button>
//                   </div>
//                 </div>
//               </div>
//             </a>
//           </li>
//         ))}
//       </ul>

//       {/* Bid Modal */}
//       {bidModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <div className="modal-content">
//               <h2 className="title">Place Bid</h2>
//               <p>{Apierror && Apierror.message}</p>
//               <form onSubmit={handleBidSubmit}>
//                 <div className="field">
//                   <label className="label">Bid Amount:</label>
//                   <div className="control">
//                     <input 
//                       type="number" 
//                       className="input" 
//                       value={bidAmount} 
//                       onChange={(e) => setBidAmount(e.target.value)} 
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="field">
//                   <label className="label">Bid Quantity:</label>
//                   <div className="control">
//                     <input 
//                       type="number" 
//                       className="input" 
//                       value={bidQuantity} 
//                       onChange={(e) => setBidQuantity(e.target.value)} 
//                       required
//                     />
//                   </div>
//                 </div>
//                 <button type="submit" className="button is-primary">Submit Bid</button>
//               </form>
//             </div>
//             <button className="modal-close" onClick={handleCloseModal}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GroceriesList;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GroceriesList.css";
import { useNavigate } from 'react-router-dom';
import { getAuthToken, setTitle } from "../../Constants/Constant";
import image1 from "../../Images/image1.png";
import image2 from "../../Images/image3.png";
import image3 from "../../Images/image4.png";

const GroceriesList = ({ token }) => {
  const [groceries, setGroceries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [bidAmount, setBidAmount] = useState(0);
  const [bidQuantity, setBidQuantity] = useState(0);
  const [Apierror, setError] = useState(null);

  setTitle("All Groceries");
  window.dispatchEvent(new Event('titleChange'));
  const navigate = useNavigate();

  const imageLinks = [image1, image2, image3];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageLinks.length);
    return imageLinks[randomIndex];
  };

  useEffect(() => {
    const fetchGroceries = async () => {
      try {
        const response = await axios.get("https://groceries-i18z.onrender.com/api/groceries", {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        });

        // Generate random images for each grocery item
        const groceriesWithImages = response.data.map(item => ({
          ...item,
          imageUrl: getRandomImage()
        }));

        setGroceries(groceriesWithImages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching groceries:", error);
        setLoading(false);
      }
    };

    fetchGroceries();
  }, [token]);

  const handleClick = () => {
    navigate('/add-grocery', { state: { authToken: getAuthToken() } });
  };

  const toggleCard = (e, index) => {
    e.preventDefault();
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

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

      return <span dangerouslySetInnerHTML={{ __html: `${dayWithSuffix} ${month}, ${year}` }} />;
    }
    return 'Invalid Date';
  };

  const handlePlaceBid = (e, item) => {
    e.preventDefault();
    setSelectedItem(item);
    setBidModalOpen(true);
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://groceries-i18z.onrender.com/api/groceries/${selectedItem._id}/bids`,
        {
          amount: bidAmount,
          quantity: bidQuantity
        },
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json"
          }
        }
      );
      console.log("Bid placed successfully:", response.data);
      setBidModalOpen(false);
    } catch (error) {
      setError(error.response.data);
      console.error("Error placing bid:", error.response.data);
    }
  };

  const handleCloseModal = () => {
    setError(null);
    setBidModalOpen(false);
  };

  return (
    <div>
      {loading && (
         <div className="preloader">
        <svg className="cart" role="img" aria-label="Shopping cart line animation" viewBox="0 0 128 128" width="128px" height="128px" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8">
                <g className="cart__track" stroke="hsla(0,10%,10%,0.1)">
                  <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                  <circle cx="43" cy="111" r="13" />
                  <circle cx="102" cy="111" r="13" />
                </g>
                <g className="cart__lines" stroke="currentColor">
                  <polyline className="cart__top" points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" strokeDasharray="338 338" strokeDashoffset="-338" />
                  <g className="cart__wheel1" transform="rotate(-90,43,111)">
                    <circle className="cart__wheel-stroke" cx="43" cy="111" r="13" strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                  </g>
                  <g className="cart__wheel2" transform="rotate(90,102,111)">
                    <circle className="cart__wheel-stroke" cx="102" cy="111" r="13" strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                  </g>
                </g>
              </g>
            </svg>
          <div className="preloader__text">
            <p className="preloader__msg">Bringing you the goods…</p>
            <p className="preloader__msg preloader__msg--last">This is taking long. please wait.</p>
          </div>
        </div>
      )}
      <div className="button-container">
        <button className="button-6" onClick={handleClick}>Add New Item</button>
      </div>

      <ul className="grocerycards">
        {groceries.map((item, index) => (
          <li key={index}>
            <a href="#" className="card" onClick={(e) => toggleCard(e, index)}>
              <img src={item.imageUrl} className="card__image" alt="" />
              <div className="card__overlay">
                <div className="card__header">
                  <div className="card__header-text">
                    <h3 className="card__title">{item.itemName}</h3>
                    <span className="card__min-price">Price: {item.minPrice}</span>
                  </div>
                </div>
                <div className="card__description">
                  <div className="info">
                    <span className="card__quantity">Quantity: {item.quantity}</span>
                    <span className="card__expiration">Exp: {formatDate(item.expirationDate)}</span>
                    <span className="No_of_bids">No. of Bids: {item.bids.length}</span>
                  </div>
                  <div className="button-container_info">
                    <button className="button-6" onClick={(e) => handlePlaceBid(e, item)}>Place Bid</button>
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>

      {/* Bid Modal */}
      {bidModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h2 className="title">Place Bid</h2>
              <p>{Apierror && Apierror.message}</p>
              <form onSubmit={handleBidSubmit}>
                <div className="field">
                  <label className="label">Bid Amount:</label>
                  <div className="control">
                    <input 
                      type="number" 
                      className="input" 
                      value={bidAmount} 
                      onChange={(e) => setBidAmount(e.target.value)} 
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Bid Quantity:</label>
                  <div className="control">
                    <input 
                      type="number" 
                      className="input" 
                      value={bidQuantity} 
                      onChange={(e) => setBidQuantity(e.target.value)} 
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="button is-primary">Submit Bid</button>
              </form>
            </div>
            <button className="modal-close" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroceriesList;


