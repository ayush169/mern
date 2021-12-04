import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import signpic from "../images/signup.svg";

const Signup = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;

    // proxy: localhost:5000 in package.json
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert("invalid registration");
      console.log("invalid registration");
    } else {
      window.alert("registration successful");
      console.log("registration successful");
      history.push("/login");
    }
  };

  return (
    <>
      <section className="signup">
        <div className="container mt-2">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form method="POST" className="register-form" id="register-form">
                <div className="form-group">
                  <label htmlFor="name">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    value={user.name}
                    onChange={handleInputs}
                    placeholder="Your Name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="Your Email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    autoComplete="off"
                    value={user.phone}
                    onChange={handleInputs}
                    placeholder="Your Phone"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="work">
                    <i className="zmdi zmdi-slideshow material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="work"
                    id="work"
                    autoComplete="off"
                    value={user.work}
                    onChange={handleInputs}
                    placeholder="Your Profession"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInputs}
                    placeholder="Your Password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cpassword">
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    autoComplete="off"
                    value={user.cpassword}
                    onChange={handleInputs}
                    placeholder="Confirm Your Password"
                  />
                </div>

                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    value="register"
                    onClick={PostData}
                  />
                </div>
              </form>
            </div>

            <div className="signup-image">
              <figure>
                <img src={signpic} alt="registration pic" />
              </figure>
              <Link to="/login" className="signup-image-link">
                I am already register
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
