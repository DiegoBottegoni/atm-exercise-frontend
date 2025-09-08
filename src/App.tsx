import { useState } from "react";
import LoginPage from "./pages/LoginPages";
import Dashboard from "./pages/Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Mientras no esté logueado, mostramos LoginPage
  if (!loggedIn) {
    return <LoginPage onLoginSuccess={() => setLoggedIn(true)} />;
  }

  // Una vez logueado, mostramos Dashboard
  return <Dashboard onLogout={() => setLoggedIn(false)} />;
}

export default App;
