import styled, { createGlobalStyle } from "styled-components";
import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";
import LoginPage from "../src/pages/LoginPage";
import JoinPage from "../src/pages/JoinPage/JoinPage";
import MainPage from "../src/pages/MainPage";
import GamePage from "../src/pages/GamePage/GamePage";
import { Cookies } from "react-cookie";

function App() {
  const cookies = new Cookies();
  const [nickname, setNickname] = useState();
  const [imgPreview, setImgPreview] = useState();
  const handleJoinButtonClick = (nickname, imgPreview) => {
    /*
    const headers = {
      processData: false,
      "Content-Type": "multipart/form-data",
    };
    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("photo", imgFile);
    new Response(formData).text().then(console.log);
    for (var value of formData.values()) {
      console.log(value);
    }
    */
    setNickname(nickname);
    setImgPreview(imgPreview);
    axios
      .post("/api/join", {
        nickname: nickname.value,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          window.location.replace("http://3.34.253.253/");
        }
      })
      .catch((err) => console.warn(err));
  };
  return (
    <div className="App">
      <Header>
        <h1>Indian Poker</h1>
      </Header>
      <BrowserRouter>
        <Route path="/" exact>
          {cookies.get("connect.sid") ? (
            <MainPage nickname={nickname} img={imgPreview} />
          ) : (
            <LoginPage />
          )}
        </Route>
        <Route path="/login" render={() => <LoginPage />} />
        <Route
          path="/join"
          render={() => (
            <JoinPage handleJoinButtonClick={handleJoinButtonClick} />
          )}
        />
        <Route path="/game" component={GamePage} />
      </BrowserRouter>
      <GlobalStyle />
    </div>
  );
}

export const GlobalStyle = createGlobalStyle`
  html, body, ul, li, input, button, a {
    all: unset;
    list-style: none;
  }

  a, button {
    cursor: pointer;
  }

  body, .App {
    width: 100%;
    height: 100vh;
  }

  body { 
    background: #000;
    
   /*
    background: #0f0c29;
    background: -webkit-linear-gradient(to left, #24243e, #302b63, #0f0c29);
    background: linear-gradient(to left, #24243e, #302b63, #0f0c29);
    */

    /*
    background: #0F2027;
    background: -webkit-linear-gradient(to bottom, #2C5364, #203A43, #0F2027);
    background: linear-gradient(to bottom, #2C5364, #203A43, #0F2027);
    */
  }
  
  header {
    font-size: 30px;
    font-family:'HeirofLightBold';
    letter-spacing: 0.15em;
  }

  #root {
    width: 100%;
    height: 100vh;
    color: #fff;
    font-family: 'DOSGothic';
    @font-face {
      font-family: 'HeirofLightBold';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/HeirofLightBold.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: 'DOSGothic';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_eight@1.0/DOSGothic.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }
  }
`;

export const Header = styled.header`
  text-align: center;
  margin-top: 60px;
`;

export default App;
