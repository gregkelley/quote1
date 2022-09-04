// https://medium.com/geekculture/using-bootstrap-with-reactjs-the-right-way-9d7ce6cf249e

import React, { useCallback, useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import QuoteBox from './components/QuoteBox/QuoteBox';
import NewQuote from './components/NewQuote/NewQuote';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { Button, Container } from 'react-bootstrap';

// const QS = [
//   {
//     id: "1",
//     qtext: 'your quote here',
//   },
//   {
//     id: "2",
//     qtext: 'motivation is what you make of it',
//   },
//   {
//     id: "3",
//     qtext: 'maintain sanity at all costs',
//   },
//   {
//     id: "4",
//     qtext: "If you set the bar low it is easier to meet your goals and show improvement. -everyone ever",
//   },
// ];

function App() {
  const [quotes, setQuoteList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addQuote, setAddQuote] = useState(false);
  const [render, setRerender] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuotes = useCallback(async () => {
    setError(null); // clear this just for funz
    setIsLoading(true);

    try{
      const resp = 
        await fetch('https://react-http-gak-default-rtdb.firebaseio.com/quotes.json');
  
      if (!resp.ok) {
        throw new Error('Failed. ' + resp.status);
      }

      const data = await resp.json();
      const transformedQuotes = Object.entries(data).map(([key, value]) => {
        return {
          id: key,
          qtext: value.qtext,
        };
      });

      setQuoteList(transformedQuotes);

    } catch (error) {
      setError(error.message);
    }
  
  });
  
    // this will execute whenever this component is re-evaluated / loaded
    useEffect(() => {
      fetchQuotes();
    // an empty dependency list [] causes this to only execute on initial load. 
    }, []);  // define when this should be executed. empty - only at startup.
  
  // const addQuoteHandler = quote => {
  //   setQuoteList((prevQ) => {
  //     return [quote, ...prevQ];
  //   });
  //   // console.log(quotes);

  //   addQuoteToggle();
  // }

  const addQuoteToggle = () => {
    setAddQuote(() => {
      return !addQuote;
    })
  }

  // just need to trigger a re-render of the quote display area. Not finding
  // an elegant way to make this happen, however, changing a state variable 
  // each time will trigger the re-render
   const newQuoteDisp = () => {
     setRerender(!render);
     setAddQuote(false);
   }

  async function addQuoteHandler(quote) {
    const result = await fetch('https://react-http-gak-default-rtdb.firebaseio.com/quotes.json',
          {method: 'POST',
          body: JSON.stringify(quote),
          headers: {
            'Content-Type': 'application/json'
          }
        });
    const data = await result.json();
    console.log(data);

    addQuoteToggle();
  };

  let content = <p>No quotes for you</p>;
  if ( quotes.length > 0) content = <QuoteBox q={quotes} />;
  else if (error) content = <p>{error}</p>;
  else if (isLoading) content = <p>Loading...</p>;
  console.log(content);

  return (
    <Container>
    <div className="App">
      <h2>The Quotes</h2>
      <div className="qwrapper">
        {/* <QuoteBox q={quotes}/> */}
        {content}
        <button className="nqbutton" 
          onClick={newQuoteDisp}>
          Rando
        </button>
        {/* <button className="nqbutton" 
          onClick={newQuoteDisp}>
          Next
        </button> */}

        {!addQuote && (
          <Button className="p-0 d-flex justify-content-center align-items-center text-secondary" style={{ background: 'none', border: '1px solid transparent' }} 
          onClick={addQuoteToggle}>
            Create
        </Button>
        )}
        {addQuote && (
          <NewQuote onAddQuote={addQuoteHandler} />
        )}

      </div>
    </div>
    </Container>
    );
  }

export default App;
