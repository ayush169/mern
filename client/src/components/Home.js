import React from "react";

const Home = () => {
  const show = "";

  return (
    <div className="home-page">
      <div className="home-div">
        <p className="pt-5">WELCOME</p>
        {/* <h1>{userName}</h1> */}
        <h2>
          {" "}
          {show ? "Happy, to see you back" : "We Are The MERN Developer"}
        </h2>
      </div>
    </div>
  );
};

export default Home;
