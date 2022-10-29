import React, { useState, useEffect } from 'react';
import './App.css';
type Quote = {
  text: string;
  author: string;
}

const getQuotes = async () => { 
  const data = await fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data: Quote[]) {
     return data

  })
  return data
}

export default function App () {
  const [quotes,setQuotes] = useState<Quote[]>([])
  const [quoteSelected, setQuoteSelected] = useState({text: "", author: ""})
  
  const setRandomQuote = () => {
    let itemId = (Math.floor((Math.random()*100)+1)); 
    const match =  quotes.find((quoteSelected, index) => index === itemId)
    if (match) setQuoteSelected({text: match.text, author: match.author})
    console.log(match)
  }

  useEffect(() => {
    (async () => {
      const quotes = await getQuotes();
      setQuotes(quotes)
    })()
  }, [])

  useEffect(() => {
    setRandomQuote()
  }, [quotes])

  // if (!quoteSelected) return null
  
  return (
    <div className="app">
      <div id="quote-box">
        <div className='quote-wrapper'>
          <div id="text">"{quoteSelected.text}"</div>
          <div id="author">{quoteSelected.author ? `Author: ${quoteSelected.author}` : "Anonymous author"}</div>
          </div>
          <div id="new-quote"></div>
          <button onClick={setRandomQuote}>Get a quote</button>
          <a href="https://www.twitter.com/intent/tweet" target="_blank" id="tweet-quote">Tweet</a>
      </div>
    </div>
  );
}