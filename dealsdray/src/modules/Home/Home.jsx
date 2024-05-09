import React from "react";
import TopNav from "../../components/TopNav/TopNav";

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col">
        <TopNav />
      </div>
      <div >
        <h1 className="bg-amber-200 h-full w-full">DASHBOARD</h1>
      </div>
    </div>
  );
};

export default Home;
