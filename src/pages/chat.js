import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import Navbar from "../components/navbar";
import "./chat.css";
import sendIcon from "../assets/send.png";
import { avatar } from "../assets";

const API = process.env.REACT_APP_API;

let socket;

const Chat = (props) => {
  console.log("PROPS", props);
  //   const socket = useSocket();

  const [sellerId, setSellerId] = useState(0);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  //   const [socket, setSocket] = useState();

  const user_id = useSelector((state) => state.auth.id);
  const user_name = useSelector((state) => state.auth.name);

  useEffect(() => {
    socket = io(API, {
      query: { user_id },
    });
    // setSocket(newSocketConnection);
    // console.log("NEWNEW", newSocketConnection);

    // return () => newSocketConnection.close();
  }, [user_id]);

  useEffect(() => {
    if (props.location && props.location.seller_id) {
      console.log("LALA", props.location.seller_id);
      setSellerId(props.location.seller_id);
    }
  }, []);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setChatMessages((chatMessages) => [...chatMessages, msg]);
      if (user_id !== msg.sender) {
        setSellerId(msg.sender);
      }
    });
    return () => {
      socket.off("chat message");
    };
  }, []);

  const submitChatMessage = () => {
    socket.emit(
      "chat message",
      { chatMessage, sender: user_id, senderName: user_name },
      sellerId
    );
    setChatMessage("");
  };
  console.log("USER ID ", user_id);
  console.log("SellerID", sellerId);
  console.log("length " + chatMessages.length);
  console.log("MESSAGE", chatMessage);

  console.log("SOCKET", socket);
  return (
    <>
      <div>
        <div>
          <Navbar />
        </div>
        <div className="section-chat">
          <div className="row">
            <div className="col-sm-4 d-flex justify-content-end">
              <div className="list-chat">
                <div className="listchat-header">
                  <h5 style={{ fontWeight: "bold" }}>Chat</h5>
                </div>
                <div className="list-user">
                  <div style={{ marginBottom: "5vh" }}>
                    <h4 style={{ fontWeight: "bold", fontSize: "16px" }}>
                      User Dummy
                    </h4>
                    <p style={{ fontSize: "small", color: "#9B9B9B" }}>
                      Data Dummy
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="text-message">
                {chatMessages &&
                  chatMessages.length !== 0 &&
                  chatMessages.map(
                    ({ chatMessage, sender, senderName }, index) => {
                      return (
                        <div className="messaging" key={index}>
                          <div className="message-header">
                            <h5 style={{ fontWeight: "bold" }}>{senderName}</h5>
                          </div>
                          <div className="chatting">
                            <p>{chatMessage}....</p>
                          </div>
                          <div className="input-message">
                            {sender === user_id ? "You" : senderName}
                          </div>
                        </div>
                      );
                    }
                  )}
                <div
                  class="form-group"
                  //   style={{ width: "90%", paddingTop: "350px" }}
                >
                  <form>
                    <input
                      type="text"
                      class="form-control"
                      style={{
                        borderRadius: "23px",
                        padding: "0 1.4vw",
                        width: "90%",
                        marginLeft: "5vw"
                      }}
                      value={chatMessage}
                      onSubmit={() => submitChatMessage()}
                      onChange={(chatMessage) => {
                        setChatMessage(chatMessage.target.value);
                      }}
                      autocomplete="off"
                      placeholder="type message.."
                    />
                    <div
                      className="btn btn-danger send"
                      onClick={submitChatMessage}
                    //   style={{marginTop: "5vw"}}
                    >
                      <img src={sendIcon} alt="" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
