import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import ReactAudioPlayer from "react-audio-player";
import Header from "../components/Header";

class ListOfSongs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      singerDetails: {},
      songs: [],
      userType: JSON.parse(localStorage.getItem("user-details")).type,
      toggle: false,
      toggle_id: ""
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    if (this.state.userType != "singer") {
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
            singerDetails: res.data
          });
          console.log(res.data);
        }
      });
    } else {
      this.setState({
        singerDetails: JSON.parse(localStorage.getItem("user-details"))
      });
    }
    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/songs/get-singer-songs",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token")
      },
      data: {
        id: params.id
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          songs: res.data
        });
        console.log(res.data);
      }
    });
  }

  toggle = id => {
    this.setState({
      toggle: !this.state.toggle,
      toggle_id: id
    });
  };

  deleteSong = id => {
    let requestOptions = {
      method: "DELETE",
      url: "http://localhost:5000/api/songs/delete-song",
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
        alert("Song has been deleted successfully");
        location.reload();
      } else {
        alert("Something went wrong. Couldn't delete the song");
      }
    });
  };
  render() {
    return (
      <div>
        <Header />
        <Container className="bg-dark p-3 mt-5 mb-5">
          <h1>
            <strong>List of Songs by {this.state.singerDetails.name}</strong>
          </h1>
          <Link to="/home" style={{ color: "#FFF", textDecoration: "none" }}>
            <Button className="bg-black m-2 pl-3 pr-3">{"<<"}Go Back</Button>
          </Link>
          {this.state.userType === "singer" ? (
            <Link to="/add-song" style={{ color: "#FFF", textDecoration: "none" }}>
              <Button className="bg-black m-2 pl-3 pr-3">Add Song</Button>
            </Link>
          ) : (
            ""
          )}
          {this.state.songs.length > 0 ? (
            <div>
              {this.state.songs.map(song => (
                <Container className="m-4">
                  <h3>
                    <strong>{song.title}</strong>
                  </h3>
                  <ReactAudioPlayer className="mb-3" src={require(`../../public/${song.song}`)} controls />
                  {this.state.userType === "singer" ? (
                    <p>
                      <Button onClick={() => this.toggle(song._id)} className="ml-3 pl-3 pr-3">
                        Delete
                      </Button>
                      {this.state.toggle === true && song._id === this.state.toggle_id ? (
                        <div>
                          <p className="m-3">
                            <strong>Are you sure ?</strong>
                          </p>
                          <Button onClick={() => this.deleteSong(song._id)} color="danger" className="ml-3 pl-3 pr-3">
                            Yes
                          </Button>
                          <Button onClick={this.toggle} color="primary" className="ml-2 pl-3 pr-3">
                            No
                          </Button>
                        </div>
                      ) : (
                        ""
                      )}
                    </p>
                  ) : (
                    ""
                  )}
                </Container>
              ))}
            </div>
          ) : (
            <p>No songs are available</p>
          )}
        </Container>
      </div>
    );
  }
}

export default ListOfSongs;
