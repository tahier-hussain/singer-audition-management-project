import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

class SingerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singer: {},
      auditionStatus: "",
      toggleAccept: false,
      toggleReject: false
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/auth/singer-details",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: {
        id: params.id
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          singer: res.data
        });
        if (this.state.singer.audition_decision_finalised === true && this.state.singer.audition_status === false) {
          this.setState({
            auditionStatus: "Rejected"
          });
        } else if (this.state.singer.audition_decision_finalised === true && this.state.singer.audition_status === true) {
          this.setState({
            auditionStatus: "Selected"
          });
        } else {
          this.setState({
            auditionStatus: "Not yet finalized"
          });
        }
        console.log(res.data);
      } else {
        console.log(res);
      }
    });
  }

  toggleAccept = () => {
    this.setState({
      toggleAccept: !this.state.toggleAccept
    });
  };

  toggleReject = () => {
    this.setState({
      toggleReject: !this.state.toggleReject
    });
  };

  selectSinger = id => {
    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/auth/select-singer",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: {
        id: id
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        alert("Singer has been selected");
        console.log(res.data);
        location.reload();
      } else {
        console.log(res);
      }
    });
  };

  rejectSinger = id => {
    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/auth/reject-singer",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: {
        id: id
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        alert("Singer has been rejected");
        console.log(res.data);
        location.reload();
      } else {
        console.log(res);
      }
    });
  };
  render() {
    return (
      <div>
        <Header />
        <Container>
          {this.state.singer ? (
            <Container className="bg-dark p-3 mt-5 mb-5">
              {/* <Link to="/home" style={{ color: "#FFF", textDecoration: "none" }}>
                <Button className="bg-black mb-2 pl-3 pr-3">{"<<"}Go Back</Button>
              </Link> */}
              {this.state.singer.image ? <img src={require(`../../public/${this.state.singer.image}`)} height="300px" width="auto" /> : ""}
              <h1 className="mt-3">
                <strong>{this.state.singer.name}</strong>
              </h1>
              <Link to={`/list-of-songs/${this.state.singer._id}`} style={{ color: "#FFF", textDecoration: "none" }}>
                <Button className="bg-black pl-3 pr-3">Songs</Button>
              </Link>
              <h3 className="mt-3">
                <strong>Audition Status: {this.state.auditionStatus}</strong>
              </h3>
              {this.state.auditionStatus === "Not yet finalized" || this.state.auditionStatus === "Rejected" ? (
                <Button onClick={this.toggleAccept} className="pl-3 pr-3 mr-3">
                  Select
                </Button>
              ) : (
                ""
              )}
              {this.state.auditionStatus === "Not yet finalized" || this.state.auditionStatus === "Selected" ? (
                <Button onClick={this.toggleReject} className="pl-3 pr-3">
                  Reject
                </Button>
              ) : (
                ""
              )}
              {this.state.toggleAccept ? (
                <div className="mt-2">
                  <p>Are you sure ?</p>
                  <Button onClick={() => this.selectSinger(this.state.singer._id)} color="success" className="pl-3 pr-3 mr-2">
                    Yes
                  </Button>
                  <Button color="primary" className="pl-3 pr-3" onClick={this.toggleAccept}>
                    No
                  </Button>
                </div>
              ) : (
                ""
              )}
              {this.state.toggleReject ? (
                <div className="mt-2">
                  <p>Are you sure ?</p>
                  <Button onClick={() => this.rejectSinger(this.state.singer._id)} color="danger" className="pl-3 pr-3 mr-2">
                    Yes
                  </Button>
                  <Button color="primary" className="pl-3 pr-3" onClick={this.toggleReject}>
                    No
                  </Button>
                </div>
              ) : (
                ""
              )}
              <h3 className="mt-3">
                <strong>Lives in,</strong>
              </h3>
              <p>{this.state.singer.address}</p>
              <h3 className="mt-3">
                <strong>About</strong>
              </h3>
              <p>{this.state.singer.description}</p>
              <h3 className="mt-3">Journey to Singing</h3>
              <p>{this.state.singer.journey_to_singer}</p>
              <h3 className="mt-3">Family Background</h3>
              <p>{this.state.singer.family_background}</p>
            </Container>
          ) : (
            <p>Singer details not available</p>
          )}
        </Container>
      </div>
    );
  }
}

export default SingerDetails;
