import React from "react";

const MessageBubble = ({ message, sender, timestamp }) => {
  const bubbleClass = sender ? "sender-bubble" : "receiver-bubble";

  console.log(timestamp);

  // Function to split the message into lines with max 20 characters each
  const splitMessageIntoLines = (message) => {
    const maxLengthPerLine = 30;
    let lines = [];
    let currentLine = "";

    for (let i = 0; i < message.length; i++) {
      currentLine += message[i];
      if (currentLine.length === maxLengthPerLine) {
        lines.push(currentLine);
        currentLine = "";
      }
    }

    if (currentLine.length > 0) {
      lines.push(currentLine);
    }

    return lines;
  };

  const messageLines = splitMessageIntoLines(message);

  return (
    <div className="message-container-2">
      <div className={`message-bubble ${bubbleClass}`}>
        {messageLines.map((line, index) => (
          <div
            key={index}
            style={{
              textAlign: "Start",
            }}
          >
            {line}
          </div>
        ))}
        <div
          className="timeStamp"
          style={{
            textAlign: sender ? "end" : "end",
          }}
        >
          {timestamp}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
