// the component responsible for signing up a user to the api
// import { useState } from "react";
import "./signup.css";
import Back from "../back/back";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  // function that handles the input entered by the user
  const getUserData = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Append the file to the FormData
    const pictureInput = document.querySelector('input[type="file"]');
    const picture = pictureInput.files[0];
    formData.append("picture", picture);

    const url = "http://localhost:5000/signup";
    try {
      await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("token", data.token);
          navigate("/posts" + `/${data.token}`);
        });
    } catch {}
  };

  return (
    <>
      <Back page={"Sign up"} />
      <div className="divClass">
        <form className="row g-3 formClass" onSubmit={getUserData}>
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              required
            ></input>
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              required
            ></input>
          </div>
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              required
            ></input>
          </div>
          <div className="col-md-6">
            <label className="form-label">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              className="form-control"
            ></input>
          </div>
          <div className="col-md-6">
            <label className="form-label">Sex</label>
            <input
              type="text"
              id="gender"
              name="gender"
              placeholder="sex"
              className="form-control"
            ></input>
          </div>
          <div className="col-md-6">
            <label className="form-label">Profile picture</label>
            <input className="form-control" type="file" id="picture"></input>
          </div>
          <textarea
            id="about"
            name="about"
            placeholder="Describe yourself"
            className="form-control"
            cols={50}
            rows={6}
          ></textarea>
          <button className="button-class" type="submit">
            Sign up
          </button>
        </form>
      </div>
    </>
  );
}
