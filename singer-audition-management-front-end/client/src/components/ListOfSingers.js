import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import ReactAudioPlayer from "react-audio-player";
import Header from "../components/Header";

class ListOfSingers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      singers: [],
      userType: JSON.parse(localStorage.getItem("user-details")).type,
      toggle: false,
      toggle_id: ""
    };
  }

  componentDidMount() {
    let url;

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
        <Container className="bg-dark p-3 mt-5 mb-5">
          <h1>
            <strong>Singers</strong>
          </h1>
          {this.state.singers.length > 0 ? (
            <div>
              {this.state.singers.map(singer => (
                <Container className="p-3 mb-3">
                  <h3>
                    <strong>
                      <Link to={`/singer-details/${singer._id}`} style={{ color: "#FFF", textDecoration: "none" }}>
                        {singer.name}
                      </Link>
                    </strong>
                  </h3>
                  <p>
                    <strong>
                      {singer.description.slice(0, 800)} ... <a className="btn btn-link">read more</a>
                    </strong>
                  </p>
                </Container>
              ))}
            </div>
          ) : (
            <p>There are no singers to display</p>
          )}
        </Container>
      </div>
    );
  }
}

export default ListOfSingers;
