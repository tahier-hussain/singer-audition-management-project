import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import Header from "../components/Header";

class HomeSinger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      auditionStatus: ""
    };
  }
  componentDidMount() {
    if (this.state.userDetails.audition_decision_finalised === true && this.state.userDetails.audition_status === false) {
      this.setState({
        auditionStatus: "Rejected"
      });
    } else if (this.state.userDetails.audition_decision_finalised === true && this.state.userDetails.audition_status === true) {
      this.setState({
        auditionStatus: "Selected"
      });
    } else {
      this.setState({
        auditionStatus: "Not yet finalized"
      });
    }
  }
  render() {
    return (
      <div>
        <Header />
        <Container className="bg-dark p-3 mt-5 mb-5">
          {this.state.userDetails.image ? <img src={require(`../../public/${this.state.userDetails.image}`)} height="300px" width="auto" /> : ""}
          <h1 className="mt-3">
            <strong>Welcome {this.state.userDetails.name}</strong>
          </h1>
          <Link to="/add-song" style={{ color: "#FFF", textDecoration: "none" }}>
            <Button className="bg-black mt-3 mb-3 mr-3 pl-3 pr-3">Add Song</Button>
          </Link>
          <Link to={`/list-of-songs/${this.state.userDetails.id}`} style={{ color: "#FFF", textDecoration: "none" }}>
            <Button className="bg-black mt-3 mb-3 pl-3 pr-3">See Already Uploaded Songs</Button>
          </Link>{" "}
          <h3 className="mt-3">
            <strong>Audition Status: {this.state.auditionStatus}</strong>
          </h3>
          <h3 className="mt-3">
            <strong>Lives in,</strong>
          </h3>
          <p>{this.state.userDetails.address}</p>
          <h3 className="mt-3">
            <strong>About</strong>
          </h3>
          <p>{this.state.userDetails.description}</p>
          <h3 className="mt-3">
            <strong> Journey to Singing</strong>
          </h3>
          <p className="mt-3">{this.state.userDetails.journey_to_singer}</p>
          <h3 className="mt-3">
            <strong> Family Background </strong>
          </h3>
          <p>{this.state.userDetails.family_background}</p>
        </Container>
      </div>
    );
  }
}

export default HomeSinger;
