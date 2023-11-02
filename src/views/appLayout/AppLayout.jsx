import "./AppLayout.css";
import { Outlet } from "react-router-dom";
import searchSymbol from "../../assets/searchSymbol.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMeetups, getUserInfo } from "../../api";
import moment from "moment";
import DropdownMenu from "../../components/dropdownMenu/DropdownMenu";
import MeetupFilter from "../../components/meetupFilter/MeetupFilter";
import ListMeetup from "../../components/listMeetup/ListMeetup";
import MeetupItem from "../../components/meetupItem/MeetupItem";

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate()
  const path = location.pathname;
  const [showInputField, setShowInputField] = useState(false);
  const [meetups, setMeetups] = useState([]);
  const [filters, setFilters] = useState({
    date: "",
    city: "",
    name: "",
    category: "",
    searchQuery: "",
  });


  function handleSetShowInputField () {
    setShowInputField(true)
  }
  
  async function handleOnClick() {
    const userInfo = await getUserInfo();
    navigate(`/profile`, { state: { userInfo: userInfo } });
  }

  useEffect(() => {
    async function meetupArr() {
      const listMeetups = await getMeetups();
      setMeetups(listMeetups);
    }
    meetupArr();

  }, []);


  const today = moment();

  const applyFilters = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  function showMeetupInfo(meetup) {
    navigate(`/meetupInfo/${meetup.PK}`, { state: { meetup: meetup } });
  }


  const getUpcomingMeetups = meetups.filter((meetup) => {

    const dateFilter =
      !filters.date || moment(meetup.date).isSame(filters.date, 'day');
    const cityFilter =
      !filters.city ||
      meetup.city.toLowerCase().includes(filters.city.toLowerCase());
    const nameFilter =
      !filters.name ||
      meetup.name.toLowerCase().includes(filters.name.toLowerCase());
    const categoryFilter =
      !filters.category || meetup.category === filters.category;
    const searchQueryFilter =
      !filters.searchQuery ||
      meetup.keywords.includes(filters.searchQuery.toLowerCase())
    return (
      today.isBefore(meetup.date) && dateFilter && cityFilter && nameFilter && categoryFilter && searchQueryFilter
    );
  });

  const upcomingMeetups = getUpcomingMeetups.map((futureMeetup) => {
    return (
      <MeetupItem
        meetup={futureMeetup}
        key={futureMeetup.PK}
        showMeetupInfo={() => showMeetupInfo(futureMeetup)}
      />
    );
  });

  const getPastMeetups = meetups.filter((meetup) => {
    return today.isAfter(meetup.date);
  });

  const pastMeetups = getPastMeetups.map((pastMeetup) => {
    return (
      <MeetupItem
        meetup={pastMeetup}
        key={pastMeetup.PK}
        showMeetupInfo={() => showMeetupInfo(pastMeetup)}
      />
    );
  });

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
          {path === "/meetups" || path.startsWith("/meetupInfo/") || path === "/profile" ? (
            <DropdownMenu onClick={handleOnClick}/>
          ) : (
            <div className="empty-div"></div>
          )}
        </nav>
      </header>
      <main> 


        {path === "/meetups" && showInputField && (

          <MeetupFilter
            placeholder="Search for meetups"
            isShowMeetupFilter={() => handleSetShowInputField()}
            onApplyFilters={applyFilters}
          />
        )}
        {path === "/meetups" && (
          <ListMeetup upcomingMeetups={upcomingMeetups} pastMeetups={pastMeetups} />
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
