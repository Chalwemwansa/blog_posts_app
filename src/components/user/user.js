// component that is used to get user data from the database
import { useNavigate, useParams } from "react-router-dom";
import "./user.css";
import singout from "./signout";
import deleteuser from "./deleteuser";
import { useEffect, useState } from "react";

export default function User({ userId, token }) {
  const navigate = useNavigate();
  const url = `http://localhost:5000/user/${userId}`;
  const imageUrl = "http://localhost:5000/uploads/";

  const [data, setData] = useState({});

  async function fetchData() {
    await fetch(url, {
      method: "GET",
      headers: {
        token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }

  function handledelete() {
    (async () => {
      await deleteuser(token);
      localStorage.removeItem("token");
      navigate("/");
    })();
  }

  function handlesignout() {
    (async () => {
      await singout(token);
      localStorage.removeItem("token");
      navigate("/");
    })();
  }

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  function exists(item) {
    return data[item] !== undefined;
  }

  return (
    <>
      <div className="main-user-container">
        <div className="user-container">
          <div className="user-pic">
            {exists("picture") ? (
              <img
                className="user-image"
                src={`${imageUrl}${data.picture}`}
              ></img>
            ) : (
              <img
                className="user-image"
                src={require("./assets/user.png")}
              ></img>
            )}
          </div>
          <div className="user-content">
            <div className="content-section">
              <h5 className="section-name">Name: </h5>
              <t className="section-content">{data.name}</t>
            </div>
            <div className="content-section">
              <h5 className="section-name">Email: </h5>
              <t className="section-content">{data.email}</t>
            </div>
            {exists("age") && (
              <div className="content-section">
                <h5 className="section-name">Age: </h5>
                <t className="section-content">{data.age}</t>
              </div>
            )}
            {exists("gender") && (
              <div className="content-section">
                <h5 className="section-name">Sex: </h5>
                <t className="section-content">{data.gender}</t>
              </div>
            )}
          </div>
          {exists("about") && (
            <div className="about-class">
              <h5 className="about-section">About {data.name}</h5>
              <p className="about-content">{data.about}</p>
            </div>
          )}
          {userId === "owner" && (
            <div className="small-header">
              <div
                className="small-header-component"
                onClick={() => navigate("/editUser" + `/${token}`)}
              >
                edit
              </div>
              <div
                className="small-header-component"
                onClick={() => handlesignout()}
              >
                signout
              </div>
              <div
                className="small-header-component"
                onClick={() => handledelete()}
              >
                delete account
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="u-p">
        <h3>Posts by {data.name}</h3>
      </div>
    </>
  );
}
