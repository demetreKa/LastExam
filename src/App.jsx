import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Question from "./Pages/Question/Question";
import { useState } from "react";
import Login from "./Pages/Login/Login";

function App() {
  const [questNumber, setQuestNumber] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUserData(null);
  };
  const HenldeNumberOFQuestions = (e) => {
    setQuestNumber(e);
  };
  const handleLoginSuccess = (userData) => {
    setName(userData.name);
    setEmail(userData.email);
  };
  if (!email && !name) {
    return (
      <>
        <Router>
          <ul className="userLogin">
            <li className="login">
              <Link to="/login">login</Link>
            </li>
            <li className="register">
              <Link to="/register">register</Link>
            </li>
          </ul>

          <Routes>
            <Route
              path="/register"
              element={<Register setUserData={setUserData} />}
            ></Route>
            <Route
              path="/login"
              element={
                <Login
                  LoginData={userData}
                  setUserData={setUserData}
                  onLoginSuccess={handleLoginSuccess}
                />
              }
            ></Route>
          </Routes>
        </Router>
      </>
    );
  }
  return (
    <>
      <Router>
        <nav>
          <ul>
            <li className="home">
              <Link to="/">{name ? name : "home"}</Link>
            </li>

            <li>
              <Link to="/question">question</Link>
              <a href="" onClick={handleLogout}>
                logOut
              </a>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <Home
                onSetQuestNumber={HenldeNumberOFQuestions}
                correct={correct}
                name={name}
              />
            }
          ></Route>
          <Route
            path="/question"
            element={
              <Question
                questNumber={questNumber}
                setCorrect={setCorrect}
                correct={correct}
              />
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
