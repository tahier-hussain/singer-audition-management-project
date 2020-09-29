import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import HomeModerator from "./components/HomeModerator";
import HomeProductionUnit from "./components/HomeProductionUnit";
import HomeSinger from "./components/HomeSinger";
import AddSinger from "./components/AddSinger";
import AddSong from "./components/AddSong";
import ListOfSongs from "./components/ListOfSongs";
import ListOfSingers from "./components/ListOfSingers";
import SingerDetails from "./components/SingerDetails";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" component={Login} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/home-moderator" component={HomeModerator} exact />
          <Route path="/home-production-unit" component={HomeProductionUnit} exact />
          <Route path="/home-singer" component={HomeSinger} exact />
          <Route path="/about-us" component={AboutUs} exact />
          <Route path="/add-singer" component={AddSinger} exact />
          <Route path="/add-song" component={AddSong} exact />
          <Route path="/list-of-songs/:id" component={ListOfSongs} exact />
          <Route path="/list-of-singers" component={ListOfSingers} exact />
          <Route path="/singer-details/:id" component={SingerDetails} exact />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
