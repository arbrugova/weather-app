const Card = (props) => {
  return (
    <div>
      <div className="location-box">
        <div className="location">
          {props.name}, {props.country}
        </div>
        <div className="date">{props.date}</div>
      </div>
      <div className="weather-box">
        <div className="temp">{props.temp}°c</div>
        <div className="weather">{props.weather}</div>
      </div>
    </div>
  );
};

export default Card;
