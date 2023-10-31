import { useState } from "react";
import "./DropdownMenu.css";
import menuLogo from "../../assets/meetupLogo.svg"
import { useNavigate } from "react-router-dom";

export default function DropdownMenu({onClick}) {
  const navigate = useNavigate()
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  function logout () {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <img src={menuLogo} tabIndex={0} className="styled-menu-logo"  onClick={() => setIsMenuVisible(!isMenuVisible)} />
      {isMenuVisible && (
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 styled-menu">
          <li><a className="menu-a-text" onClick={() => navigate('/meetups')}>Home</a></li>
          <li><a className="menu-a-text" onClick={onClick}>Profile</a></li>
          <li><a className="menu-a-text" onClick={logout}>Sign out</a></li>
        </ul>
        )
      }

    </div>
  );
}
