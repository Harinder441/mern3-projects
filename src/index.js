import React from "react";
import ReactDOM from "react-dom";
import BookAppointment from './BookAppointment';
import WeatherApp from "./Weather";


  class App extends React.Component{
    render(){
        return (
            <>
              <WeatherApp/>
            </>
        )
    }
  }

ReactDOM.render(<App/>, document.querySelector("#root"));
// ReactDOM.render(containerDivElement, document.querySelector("#root2"));

