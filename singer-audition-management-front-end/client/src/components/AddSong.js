import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import Header from "../components/Header";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

class AddSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      file: ""
    };
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  changeHandlerForFile = event => {
    this.setState({
      file: event.target.files[0]
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.set("title", this.state.title);

    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/songs/add",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "multipart/form-data"
      },
      data: formData
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        alert("Song added");
        this.props.history.push("/home");
        console.log(res.data);
      } else {
        console.log(res.data);
      }
    });
  };

  render() {
    return (
      <div>
        <Header />
        <Container className="p-3 mt-2 mb-5">
          <Container className="bg-dark p-3 mt-2 mb-5">
            <Link to="/home-singer" style={{ color: "#FFF", textDecoration: "none" }}>
              <Button className="bg-black m-3 pl-3 pr-3">{"<<"}Go Back</Button>
            </Link>
            <Form className="mt-4 mb-4" onSubmit={this.submitHandler}>
              <Col>
                <h2>Add song</h2>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Title</Label>
                  <Input type="text" size="5" name="title" id="title" placeholder="enter full name" onChange={this.changeHandler} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Upload Song</Label>
                  <Input type="file" name="file" id="file" placeholder="profile picture" onChange={this.changeHandlerForFile} />
                </FormGroup>
              </Col>
              <Col>
                <Button className="pl-3 pr-3 mt-3" type="submit">
                  Add Song
                </Button>
              </Col>
            </Form>
          </Container>
        </Container>
      </div>
    );
  }
}

export default AddSong;
