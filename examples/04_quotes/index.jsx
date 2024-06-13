// @ts-nocheck
import { signal } from "../../src/reactivity";
import { quotes } from "./quotes";

function Quote({ quote }) {
  const text = () => quote().text
  const author = () => quote().author

  return <div className="quote">
    <blockquote>{text}</blockquote>
    <cite>{author}</cite>
  </div>
}

function App() {
  const [quote, setQuote] = signal({ text: '', author: '' });

  const handleNextQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  handleNextQuote();

  return (
    <div>
      <button onClick={handleNextQuote}>Next Quote</button>
      <Quote quote={quote} />
    </div>
  );
}

document.body.appendChild(App());