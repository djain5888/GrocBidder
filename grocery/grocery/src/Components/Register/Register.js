// import React, { useEffect, useState } from "react";
// import basestyle from "../Base.module.css";
// import registerstyle from "./Register.module.css";
// import { useNavigate, NavLink } from "react-router-dom";
// import { setTitle } from "../../Constants/Constant";

// setTitle("Register");
// window.dispatchEvent(new Event('titleChange'));

// const Register = () => {
//   const navigate = useNavigate();

//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmit, setIsSubmit] = useState(false);
//   const [user, setUserDetails] = useState({
//     Name: "",
//     Address: "",
//     email: "",
//     password: "",
//     cpassword: "",
//   });

//   const changeHandler = (e) => {
//     const { name, value } = e.target;
//     setUserDetails({
//       ...user,
//       [name]: value,
//     });
//   };

//   const validateForm = (values) => {
//     const error = {};
//     const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
//     if (!values.Name) {
//       error.Name = "Name is required";
//     }
//     if (!values.Address) {
//       error.Address = "Address is required";
//     }
//     if (!values.email) {
//       error.email = "Email is required";
//     } else if (!regex.test(values.email)) {
//       error.email = "This is not a valid email format!";
//     }
//     if (!values.password) {
//       error.password = "Password is required";
//     } else if (values.password.length < 4) {
//       error.password = "Password must be more than 4 characters";
//     } else if (values.password.length > 10) {
//       error.password = "Password cannot exceed more than 10 characters";
//     }
//     if (!values.cpassword) {
//       error.cpassword = "Confirm Password is required";
//     } else if (values.cpassword !== values.password) {
//       error.cpassword = "Confirm password and password should be same";
//     }
//     return error;
//   };

//   const signupHandler = (e) => {
//     e.preventDefault();
//     setFormErrors(validateForm(user));
//     setIsSubmit(true);
//   };

//   useEffect(() => {
//     if (Object.keys(formErrors).length === 0 && isSubmit) {
//       console.log(user);
//       fetch("https://groceries-i18z.onrender.com/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: user.Name,
//           address: user.Address,
//           email: user.email,
//           password: user.password,
//         }),
//       })
//         .then(async (response) => {
//           const contentType = response.headers.get("Content-Type");
//           if (contentType && contentType.includes("application/json")) {
//             const data = await response.json();
//             if (response.ok) {
//               alert(data.message);
//               navigate("/login", { replace: true });
//             } else {
//               throw new Error(data.message || 'Registration failed');
//             }
//           } else {
//             const text = await response.text();
//             throw new Error(text || 'Registration failed');
//           }
//         })
//         .catch((error) => {
//           console.error("There was an error registering the user!", error);
//         });
//     }
//   }, [formErrors, isSubmit, navigate, user]);

//   return (
//     <div className={registerstyle.register}>
//       <form>
//         <h1>Create your account</h1>
//         <input
//           type="text"
//           name="Name"
//           id="Name"
//           placeholder="Full Name"
//           onChange={changeHandler}
//           value={user.Name}
//         />
//         <p className={basestyle.error}>{formErrors.Name}</p>
//         <input
//           type="text"
//           name="Address"
//           id="Address"
//           placeholder="Address"
//           onChange={changeHandler}
//           value={user.Address}
//         />
//         <p className={basestyle.error}>{formErrors.Address}</p>
//         <input
//           type="email"
//           name="email"
//           id="email"
//           placeholder="Email"
//           onChange={changeHandler}
//           value={user.email}
//         />
//         <p className={basestyle.error}>{formErrors.email}</p>
//         <input
//           type="password"
//           name="password"
//           id="password"
//           placeholder="Password"
//           onChange={changeHandler}
//           value={user.password}
//         />
//         <p className={basestyle.error}>{formErrors.password}</p>
//         <input
//           type="password"
//           name="cpassword"
//           id="cpassword"
//           placeholder="Confirm Password"
//           onChange={changeHandler}
//           value={user.cpassword}
//         />
//         <p className={basestyle.error}>{formErrors.cpassword}</p>
//         <button className={basestyle.button_common} onClick={signupHandler}>
//           Register
//         </button>
//       </form>
//       <NavLink to="/login">Already registered? Login</NavLink>
//     </div>
//   );
// };

// export default Register;
import React, { useEffect, useState } from "react";
import basestyle from "../Base.module.css";
import registerstyle from "./Register.module.css";
import { useNavigate, NavLink } from "react-router-dom";
import { setTitle } from "../../Constants/Constant";

setTitle("Register");
window.dispatchEvent(new Event('titleChange'));

const Register = () => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  // Loading state
  const [responseMessage, setResponseMessage] = useState("");  // Response message state
  const [showPopup, setShowPopup] = useState(false);  // Popup visibility state

  const [user, setUserDetails] = useState({
    Name: "",
    Address: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.Name) {
      error.Name = "Name is required";
    }
    if (!values.Address) {
      error.Address = "Address is required";
    }
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format!";
    }
    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      error.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.cpassword) {
      error.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.password) {
      error.cpassword = "Confirm password and password should be same";
    }
    return error;
  };

  const signupHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setIsLoading(true);  // Start loading
      fetch("https://groceries-i18z.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.Name,
          address: user.Address,
          email: user.email,
          password: user.password,
        }),
      })
        .then(async (response) => {
          setIsLoading(false);  // Stop loading
          const contentType = response.headers.get("Content-Type");
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            if (response.ok) {
              setResponseMessage(data.message);
              navigate("/login", { replace: true });
            } else {
              throw new Error(data.message || 'Registration failed');
            }
          } else {
            const text = await response.text();
            throw new Error(text || 'Registration failed');
          }
        })
        .catch((error) => {
          setIsLoading(false);  // Stop loading
          setResponseMessage(`There was an error registering the user: ${error.message}`);
        })
        .finally(() => {
          setShowPopup(true);  // Show the popup
        });
    }
  }, [formErrors, isSubmit, navigate, user]);

  const closePopup = () => {
    setShowPopup(false);
    setResponseMessage("");
  };

  return (
    <div className={registerstyle.register}>
      <form>
        <h1>Create your account</h1>
        <input
          type="text"
          name="Name"
          id="Name"
          placeholder="Full Name"
          onChange={changeHandler}
          value={user.Name}
        />
        <p className={basestyle.error}>{formErrors.Name}</p>
        <input
          type="text"
          name="Address"
          id="Address"
          placeholder="Address"
          onChange={changeHandler}
          value={user.Address}
        />
        <p className={basestyle.error}>{formErrors.Address}</p>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={changeHandler}
          value={user.email}
        />
        <p className={basestyle.error}>{formErrors.email}</p>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={changeHandler}
          value={user.password}
        />
        <p className={basestyle.error}>{formErrors.password}</p>
        <input
          type="password"
          name="cpassword"
          id="cpassword"
          placeholder="Confirm Password"
          onChange={changeHandler}
          value={user.cpassword}
        />
        <p className={basestyle.error}>{formErrors.cpassword}</p>
        <button className={basestyle.button_common} onClick={signupHandler}>
          Register
        </button>
        {isLoading && <div>Loading...</div>}
      </form>
      <NavLink to="/login">Already registered? Login</NavLink>
      {showPopup && (
        <div className={registerstyle.popup}>
          <div className={registerstyle.popupContent}>
            <p>{responseMessage}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
