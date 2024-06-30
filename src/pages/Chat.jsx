import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const handleSend = async () => {
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [...messages, userMessage],
    });

    const aiMessage = response.data.choices[0].message;
    setMessages([...messages, userMessage, aiMessage]);
    setInput("");
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl p-4">
        <div className="bg-gray-100 p-4 rounded shadow-md h-96 overflow-y-scroll">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
              <span className={`inline-block p-2 rounded ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
                {msg.content}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border p-2 flex-grow"
          />
          <button onClick={handleSend} className="bg-blue-500 text-white p-2 ml-2 rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;