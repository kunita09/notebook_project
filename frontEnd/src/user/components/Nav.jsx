import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

function Nav() {
  return (
    <nav className="w-full bg-LightGray text-white p-4 fixed top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Meb</h1>
        <div className="flex items-center space-x-4">
          <span className="text-lg">นางสาวคุณิตา นนทะชาติ</span>
          <FontAwesomeIcon icon={faUserCircle} size="lg" />
          
        </div>
      </div>
    </nav>
  );
}

export default Nav;
