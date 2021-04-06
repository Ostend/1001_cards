import React, { useState, useEffect } from "react";
const url = "http://localhost:5000/";

//Randomize the order and what will show up
function shuffled(allTerms) {
  for (let i = allTerms.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = allTerms[i];
    allTerms[i] = allTerms[j];
    allTerms[j] = temp;
  }
}

const AllCards = () => {
  const [data, setData] = useState([]);
  const getUsers = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
  };
  useEffect(() => {
    getUsers();
  }, []);
  shuffled(data);
  //only show ten terms per session
  const flashData = data.slice(0, 10);
  return (
    <>
      <section className="btw-cards">
        <h1>Comptia 1001 practice questions</h1>
        <div>
          {flashData.map((terms) => {
            return <FlashCard key={terms.Concept_ID} {...terms} />;
          })}
          <button
            className="btn-reset"
            onClick={() => window.location.reload()}
          >
            shuffle
          </button>
        </div>
      </section>
    </>
  );
};

const FlashCard = ({ Concept_ID, Terms, Definitions }) => {
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <section>
        <div className="center">
          <p>{Terms}</p>
          <h4>
            {toggle ? (
              <h4 onClick={() => setToggle(!toggle)}>answer</h4>
            ) : (
              `${Definitions}`
            )}
          </h4>
          <button className="btn" onClick={() => setToggle(!toggle)}>
            {toggle ? "Show answer" : "hide answer"}
          </button>
        </div>
      </section>
    </>
  );
};

export default AllCards;
