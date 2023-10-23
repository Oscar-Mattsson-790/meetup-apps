import "./AppLayout.css";

export default function AppLayout() {
  return (
    <div className="main-container">
      <header>
        <nav className="container-nav">
          <div>Signup</div>
        </nav>
        <h1>Meetup</h1>
      </header>
      <main></main>
      <footer>
        <p style={{ color: "#fff" }}>
          © 2023 LCKD Made with ❤️ by Furious Scientists
        </p>
      </footer>
    </div>
  );
}
