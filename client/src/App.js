import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import NotFound from "./Components/NotFound/NFound"
import Login from "./Components/Login/Login"
import Details from "./Components/Details/details"
class App extends Component{
    render(){
      return(
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/details" component={Details}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
      )
    }
}
export default App;
