import React from "react";
import io from "socket.io-client";

export default function Chat() {
  const socket = io("http://localhost:3001");

  function sendMessage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const messageInput = e.currentTarget.parentElement?.querySelector(
      "input"
    ) as HTMLInputElement;
    const message = messageInput.value || "";

    socket.emit("message", message);
    messageInput.value = "";
  }

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  socket.on("message", (data) => {
    const messageList = document.getElementById("messageList");
    const messageItem = document.createElement("li");
    messageItem.textContent = data;
    messageList?.appendChild(messageItem);
  });

  return (
    <>
      <input type="text" id="messageInput" placeholder="메시지를 입력하세요" />
      <button onClick={(e) => sendMessage(e)}>보내기</button>
      <ul id="messageList"></ul>
    </>
  );
}
