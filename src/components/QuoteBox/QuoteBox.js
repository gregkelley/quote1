
import "./QuoteBox.css";

const QuoteBox = (props) => {

  // console.log(props.q.length);
  const idx = Math.floor(Math.random() * props.q.length );
  return (
    <div className="qb">
      <p className="element">{props.q[idx].qtext}</p>
    </div>
  )
};

export default QuoteBox;
