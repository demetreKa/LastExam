import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
function Question({ questNumber = 15, setCorrect, correct }) {
  const [questions, setQuestion] = useState([]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const regex = /&(?:amp|quot|#039);/g;

  const question = questions[currentSlide]?.question?.replaceAll(regex, " ");
  const answers = [
    questions[currentSlide]?.correct_answer,
    ...(questions[currentSlide]?.incorrect_answers || []),
  ].sort((a, b) => a - b);

  useEffect(
    () =>
      async function getData() {
        const res = await fetch(
          `https://opentdb.com/api.php?amount=${questNumber}`
        );
        const data = await res.json();

        setQuestion(data["results"] ?? " ");
      },
    [questNumber]
  );

  const handlePrev = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide - 1 >= 0 ? prevSlide - 1 : prevSlide
    );
    console.log(answers);
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide + 1 === questions.length ? prevSlide : prevSlide + 1
    );
  };
  const handleOptionsClick = (value) => {
    if (value === questions[currentSlide]?.correct_answer) {
      setCorrect((correct) => correct + 1);
    }
    currentSlide + 1 >= questions.length ? setCorrect(0) : correct;

    setCurrentSlide((prevSlide) =>
      prevSlide + 1 === questions.length ? prevSlide : prevSlide + 1
    );
  };

  return currentSlide !== questions.length - 1 ? (
    <div className="carousel-container">
      <div className="question-display"></div>
      <h2>you are on question {currentSlide + 1}</h2>

      <p>{question}</p>

      {answers.map((e) => (
        <li key={e}>
          <button className="question" onClick={() => handleOptionsClick(e)}>
            {e}
          </button>
        </li>
      ))}
      <div className="navigation">
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  ) : correct > questions.length ? (
    <p className="score">
      you have answerd more then half questions right{" "}
      {Math.floor((correct / questions.length) * 100)}%
    </p>
  ) : (
    <p className="score">
      study more you got {Math.floor((correct / questions.length) * 100)}%
    </p>
  );
}

export default Question;
