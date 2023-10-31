import "./AppLayout.css";
import { Outlet } from "react-router-dom";
import meetupLogo from "../../assets/meetupLogo.svg";
import searchSymbol from "../../assets/searchSymbol.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { getUserInfo } from "../../api";

import InputField from "../../components/inputField/InputField";
import ArrowIcon from "../../assets/arrowIcon.svg";

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [showInputField, setShowInputField] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  function handleInputChange(event) {
    setSearchQuery(event.target.value);
  }

  function handleSearchSubmit() {
    console.log("Searching for:", searchQuery);
  }

  async function handleOnClick() {
    const userInfo = await getUserInfo();
    navigate(`/profile`, { state: { userInfo: userInfo } });
  }

  return (
    <div className="main-container">
      <header>
        <nav className="container-nav">
          {path === "/meetups" ? (
            <>
              <img
                className="search-symbol"
                src={searchSymbol}
                alt="search-symbol"
                onClick={() => setShowInputField(!showInputField)}
              />
            </>
          ) : (
            <div className="empty-div"></div>
          )}
          <h1>Meetup</h1>
          {path === "/meetups" || path.startsWith("/meetupInfo/") ? (
            <img
              className="profile-icon-small"
              src={meetupLogo}
              onClick={handleOnClick}
            />
          ) : (
            <div className="empty-div"></div>
          )}
        </nav>
      </header>
      <main> 
        
        {path === "/meetups" && showInputField && (
          <InputField
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search for meetups"
            iconSrc={ArrowIcon}
            iconOnClick={handleSearchSubmit}
          />
        )}
        <Outlet />
      </main>
      <footer>
        <p style={{ color: "#fff" }}>
          © 2023 Meetup Made with ❤️ by Furious Scientists
        </p>
      </footer>
    </div>
  );
}
