import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import Header from "../components/Header";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import L from "leaflet";
import { Map, TileLayer } from "react-leaflet";
import * as ELG from "esri-leaflet-geocoder";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "leaflet/dist/leaflet.js";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
});

var address;
var latitude;
var longitude;
class AddSinger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      name: "",
      email: "",
      description: "",
      family_background: "",
      journey_to_singer: "",
      error_message: ""
    };
  }

  componentDidMount() {
    const map = this.leafletMap.leafletElement;
    const searchControl = new ELG.Geosearch().addTo(map);
    const results = new L.LayerGroup().addTo(map);

    var latlng;
    searchControl.on("results", function (data) {
      results.clearLayers();
      for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
        latlng = data.results[i];
      }
      address = latlng.properties.LongLabel;
      latitude = latlng.latlng.lat;
      longitude = latlng.latlng.lng;
    });
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
    console.log(address);
    event.preventDefault();

    let password = "";
    let upperCaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYA";
    let lowerCaseCharacters = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let specialCharacters = "!@#$%^&*()";

    for (let i = 0; i < 4; i++) {
      password += upperCaseCharacters.charAt(Math.floor(Math.random() * upperCaseCharacters.length));
    }
    for (let i = 0; i < 4; i++) {
      password += lowerCaseCharacters.charAt(Math.floor(Math.random() * lowerCaseCharacters.length));
    }
    for (let i = 0; i < 2; i++) {
      password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    for (let i = 0; i < 2; i++) {
      password += specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));
    }

    console.log(this.state);
    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("name", this.state.name);
    formData.append("email", this.state.email);
    formData.append("description", this.state.description);
    formData.append("family_background", this.state.family_background);
    formData.append("journey_to_singer", this.state.journey_to_singer);
    formData.append("password", password);
    formData.append("confirm_password", password);
    formData.append("address", address);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/singer-register",
      header: {
        "Content-Type": "application/json"
      },
      data: formData
    };

    console.log(requestOptions);
    axios(requestOptions).then(res => {
      if (res.data.status == 200) {
        alert("Singer profile has been created successfully");
        this.props.history.push("/home-production-unit");
      } else if (res.data.status == 400) {
        console.log("HELLO");
        this.setState({
          error_message: res.data.msg
        });
      }
    });
  };

  render() {
    const center = [37.7833, -122.4167];
    return (
      <div>
        <Header />
        <Container className="bg-dark p-3 mt-5 mb-5">
          <Link to="/home-production-unit" style={{ color: "#FFF", textDecoration: "none" }}>
            <Button className="bg-black m-3 p-2">{"<<"}Go Back</Button>
          </Link>
          <Form className="mt-4 mb-4" onSubmit={this.submitHandler}>
            <Col>
              <h2>Add singer</h2>
            </Col>
            {this.state.error_message ? <Alert color="danger">{this.state.error_message}</Alert> : ""}
            <Col>
              <FormGroup>
                <Label>Full Name</Label>
                <Input type="text" size="5" name="name" id="name" placeholder="enter full name" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Email</Label>
                <Input type="email" size="5" name="email" id="exampleEmail" placeholder="myemail@email.com" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Description</Label>
                <Input type="textarea" name="description" id="description" placeholder="description" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Family Background</Label>
                <Input type="textarea" name="family_background" id="family_background" placeholder="family background" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Journey to Singing</Label>
                <Input type="textarea" name="journey_to_singer" id="journey_to_singer" placeholder="Journey" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Upload Picture</Label>
                <Input type="file" name="file" id="file" placeholder="profile picture" onChange={this.changeHandlerForFile} />
              </FormGroup>
            </Col>
            <Col>
              <Label>Address</Label>
              <Map
                className="map-font-color"
                style={{ height: "50vh" }}
                center={center}
                zoom="10"
                ref={m => {
                  this.leafletMap = m;
                }}
              >
                <TileLayer attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors" url={"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />
                <div className="pointer" />
              </Map>
            </Col>
            <Col>
              <Button type="submit" className=" mt-3 bg-black">
                Create Profile
              </Button>
            </Col>
          </Form>
        </Container>
      </div>
    );
  }
}

export default AddSinger;
