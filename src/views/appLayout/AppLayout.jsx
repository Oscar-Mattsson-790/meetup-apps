import "./AppLayout.css";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  return (
    <div className="main-container">
      <header>
        <nav className="container-nav">
          {path === "/" && (
            <div onClick={() => navigate("/signup")}>Signup</div>
          )}
        </nav>
        <h1>Meetup</h1>
      </header>
      <main>
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
