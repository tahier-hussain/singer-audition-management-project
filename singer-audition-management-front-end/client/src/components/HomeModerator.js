import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Header from "../components/Header";

class HomeModerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      singers: []
    };
  }
  componentDidMount() {
    let requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/auth/get-singers"
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          singers: res.data
        });
        console.log(res.data);
      }
    });
  }
  render() {
    return (
      <div>
        <Header />
        <Container className="bg-dark mt-5 mb-5 p-5">
          <h1>
            <strong>Welcome {this.state.userDetails.name}</strong>
          </h1>
          {this.state.singers.length > 0 ? (
            <div>
              <h3 className="mt-3">
                <strong>List of Singers</strong>
              </h3>
              {this.state.singers.map(singer => (
                <Container className="p-3 mb-3 pb-4 border-bottom">
                  <h3>
                    <strong>
                      <Link to={`/singer-details/${singer._id}`} style={{ color: "#FFF", textDecoration: "none" }}>
                        {singer.name}
                      </Link>
                    </strong>
                  </h3>
                  <p>
                    <strong>Audition status: {singer.audition_decision_finalised === false ? "Not yet decided" : <a>{singer.audition_status === true && singer.audition_decision_finalised === true ? "Selected" : "Rejected"}</a>}</strong>
                  </p>
                  <Link to={`/list-of-songs/${singer._id}`} style={{ color: "#FFF", textDecoration: "none" }}>
                    <Button className="bg-black pl-3 pr-3">Songs</Button>
                  </Link>
                </Container>
              ))}
            </div>
          ) : (
            <p>No singers to display</p>
          )}
        </Container>
      </div>
    );
  }
}

export default HomeModerator;
