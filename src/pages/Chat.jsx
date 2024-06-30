import React, { useState } from "react";
import { OpenAIApi } from "openai";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const sendMessage = async () => {
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [...messages, userMessage],
    });

    const aiMessage = response.data.choices[0].message;
    setMessages([...messages, userMessage, aiMessage]);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl p-4">
        <div className="bg-white p-4 rounded shadow-md h-96 overflow-y-scroll">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
              <p className={`p-2 rounded ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                {msg.content}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 border rounded-l"
          />
          <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded-r">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;