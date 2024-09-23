import React from "react";

function Nav() {
  return (
    <nav className="w-full bg-gray-800 text-white p-4 fixed top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">My Application</h1>
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Profile</a>
          <a href="#" className="hover:underline">Logout</a>
        </div>
      </div>
    </nav>
  );
}

export default Nav
