import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import Header from "../components/Header";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class HomeProductionUnit extends Component {
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
          singers: res.data.slice(0, 2)
        });
      }
    });
  }
  render() {
    return (
      <div>
        <Header />
        <Container className="bg-dark mt-5 mb-5 p-5">
          <h1>
            <strong>Welcome to {this.state.userDetails.name}</strong>
          </h1>
          <h3>
            <strong>This is the Production Unit's Home page. The production unit will be able to create singer's profile and add details related to the particular singer (family background, music journey and etc).</strong>
          </h3>
          <Link to="/add-singer" style={{ color: "#FFF", textDecoration: "none" }}>
            <Button className="bg-black m-3 p-2">Add new singer</Button>
          </Link>
        </Container>
        <Container className="bg-dark mt-5 mb-5 p-5">
          <h1>
            <strong>Singers</strong>
          </h1>
          {this.state.singers.length > 0 ? (
            <div>
              {this.state.singers.map(singer => (
                <Container>
                  <h3>
                    <strong>
                      <Link to={`/singer-details/${singer._id}`} style={{ color: "#FFF", textDecoration: "none" }}>
                        {singer.name}
                      </Link>
                    </strong>
                  </h3>
                  <p>
                    <strong>
                      {singer.description.slice(0, 1000)} ... <a className="btn btn-link">read more</a>
                    </strong>
                  </p>
                </Container>
              ))}
              <Link to="list-of-singers">
                <Button>See All</Button>
              </Link>
            </div>
          ) : (
            <p>No singers to display</p>
          )}
        </Container>
      </div>
    );
  }
}

export default HomeProductionUnit;
