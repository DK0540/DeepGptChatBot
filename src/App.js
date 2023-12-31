//////////////////////////////////////////////////////////below is completed
//Its a limited time based free Open API key
import React, { useState } from "react";
import axios from "axios";
import { useSwipeable } from "react-swipeable";
import { MdAddCircleOutline } from "react-icons/md";

import "./App.css";
import img1 from "./Assets/aavlogo.png";
import img2 from "./Assets/logoleft.png";
import img3 from "./Assets/logoright.png";
import img4 from "./Assets/ai.png";
import img5 from "./Assets/eyeflash.png";
import img6 from "./Assets/redtitle.png";
import img7 from "./Assets/Subtract.png";
import chat from "./Assets/Group126.png";
import sendbtn from "./Assets/send.png";
import userIcon from "./Assets/user108.png";
import botIcon from "./Assets/bot77.png";

function App() {
  const [response, setResponse] = useState("");
  const [responseVisible, setResponseVisible] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);
  const [editingMessageIndex, setEditingMessageIndex] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const apiKey = ""; //Here you want exchange Api key
  //const apiKey = "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";

  const submitHandle = async (e) => {
    e.preventDefault();

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: userInput },
    ]);

    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        prompt: userInput,
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const chatbotResponse = response.data.choices[0].text;

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "bot", text: chatbotResponse },
    ]);

    setUserInput(""); // Reset user input
  };

  const copyResponse = (text) => {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
    setCopiedResponse(true);
  };

  const deleteMessage = (index) => {
    setMessages((prevMessages) => prevMessages.filter((_, i) => i !== index));
  };

  const editMessage = (index) => {
    setUserInput(messages[index].text);
    setEditingMessageIndex(index);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo-container">
          <h1 className="clogo">AAVINNOVATION LAB</h1>
          <div className="image-container">
            <img src={img2} alt="Cropped Image" />
          </div>
        </div>
        <div className="user-info">
          <h1>
            Welcome, <span>Vishwa</span>
          </h1>
          <img src={img3} alt="Logo 3" className="logo" />
        </div>
      </nav>
      <div className="main-container">
        <div className="redtitle">
          <img src={img6} alt="" />
          <h1>An Ai based Assistant</h1>
        </div>
        <div className="partonea">
          <img src={img5} alt="" />
        </div>
        <div className="partone">
          <img src={img4} alt="" />
        </div>
      </div>
      <div className="chatsection">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-card ${message.type}-message-card`}
            >
              <div className="logo-container">
                <img
                  className={`logo ${message.type}-logo`}
                  src={message.type === "user" ? userIcon : botIcon}
                  alt={`${message.type} icon`}
                  style={{ width: "85px", height: "62px" }}
                />
              </div>
              <div className="text-container">
                <span>{message.text}</span>
                {message.type === "user" && (
                  <div className="response-buttons">
                    <button onClick={() => editMessage(index)}>Edit</button>
                  </div>
                )}
                {message.type === "bot" && (
                  <div className="response-buttons">
                    <button onClick={() => copyResponse(message.text)}>
                      Copy
                    </button>
                    <button onClick={() => deleteMessage(index)}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="addoicon">
          <h1>
            <MdAddCircleOutline />
          </h1>
        </div>
        <div className="chatbtn">
          <img src={chat} alt="" />
        </div>

        <div className="inputsection">
          <p>Hi, I am dalas</p>
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message here"
            type="text"
          />
        </div>
        <img src={img7} alt="" />
        <img
          onClick={submitHandle}
          style={{ marginBottom: "15px" }}
          src={sendbtn}
          alt=""
        />
      </div>
    </div>
  );
}

export default App;
