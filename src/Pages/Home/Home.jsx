import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function Home({ onSetQuestNumber, correct, name }) {
  return (
    <div className="container">
      <form className="form">
        <input
          type="text"
          placeholder="Enter Number Of Questions"
          onChange={(e) => onSetQuestNumber(parseInt(e.target.value))}
        />
        <button>
          <Link to="/question">set Questions</Link>
        </button>
      </form>
      <div>
        <p className="answer">
          {name} have answerd to:{correct} questions right{" "}
        </p>
      </div>
    </div>
  );
}

export default Home;
