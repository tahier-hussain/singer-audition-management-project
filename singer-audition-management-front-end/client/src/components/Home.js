import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import Header from "../components/Header";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details"))
    };
  }
  componentDidMount() {
    if (this.state.userDetails) {
      if (this.state.userDetails.type === "singer") {
        window.location.replace("http://localhost:3000/home-singer");
      } else if (this.state.userDetails.type === "moderator") {
        window.location.replace("http://localhost:3000/home-moderator");
      } else if (this.state.userDetails.type === "production-unit") {
        window.location.replace("http://localhost:3000/home-production-unit");
      }
    }
  }
  render() {
    return (
      <div>
        <Header />
        <Container>
          <p>Home</p>
        </Container>
      </div>
    );
  }
}

export default Home;
