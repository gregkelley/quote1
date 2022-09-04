import React, { useState } from "react";
import "./NewQuote.css";

const NewQuote = (props) => {

  const [enteredQuote, setEnteredQuote] = useState("");

  const submitHandler = (event) => {
    // prevent a callback to the server
    event.preventDefault();

    const quoteData = {
      // id: Math.random().toString(), // need a unique id here. This NOT the way to do it
      qtext: enteredQuote.trim(),
    }

    props.onAddQuote(quoteData);
  }

  const quoteChangeHandler = (event) => {
    //  onChange triggers on every keystroke
    setEnteredQuote(event.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-quote">
        <input type="text" value={enteredQuote} onChange={quoteChangeHandler}
        />
      </div>
    </form>
  )
};

export default NewQuote;
