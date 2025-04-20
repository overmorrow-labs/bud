import clsx from "clsx";
import { useState } from "react";

export const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { type: "ai", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { type: "user", text: input }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: "This is an AI response to your message." },
      ]);
    }, 1000);
  };

  return (
    <div
      className={clsx([
        "budclient:grid",
        "budclient:grid-rows-[1fr_auto]",
        "budclient:h-96",
        "budclient:w-full",
        "budclient:rounded-lg",
        "budclient:shadow-xl",
        "budclient:backdrop-blur-md",
        "budclient:bg-white/30",
        "budclient:border",
        "budclient:border-white/20",
      ])}
    >
      {/* Chat Messages */}
      <div
        className={clsx([
          "budclient:flex-1",
          "budclient:overflow-y-auto",
          "budclient:p-4",
          "budclient:space-y-4",
        ])}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={clsx([
              "budclient:flex",
              "budclient:items-start",
              "budclient:space-x-2",
              "budclient:animate-fade-in",
              {
                "budclient:justify-end": message.type === "user",
                "budclient:justify-start": message.type === "ai",
              },
            ])}
          >
            <div
              className={clsx([
                "budclient:max-w-xs",
                "budclient:px-4",
                "budclient:py-2",
                "budclient:rounded-lg",
                "budclient:text-sm",
                "budclient:shadow-md",
                {
                  "budclient:bg-blue-500 budclient:text-white budclient:rounded-br-none":
                    message.type === "user",
                  "budclient:bg-gray-200 budclient:text-gray-800 budclient:rounded-bl-none":
                    message.type === "ai",
                },
              ])}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div
        className={clsx([
          "budclient:flex",
          "budclient:flex-1",
          "budclient:items-center",
          "budclient:px-4",
          "budclient:py-3",
          "budclient:border",
          "budclient:border-b-0",
          "budclient:border-l-0",
          "budclient:border-r-0",
          "budclient:border-gray-300",
          "budclient:rounded-lg",
          "budclient:shadow-sm",
          "budclient:focus:outline-none",
          "budclient:focus:ring-2",
          "budclient:focus:ring-blue-500",
        ])}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleSend() : null)}
          placeholder="Type your message..."
          autoFocus
          className={clsx([
            "budclient:flex-1",
            "budclient:px-4",
            "budclient:py-2",
            "budclient:border",
            "budclient:border-gray-300",
            "budclient:rounded-lg",
            "budclient:shadow-sm",
            "budclient:focus:outline-none",
            "budclient:focus:ring-2",
            "budclient:focus:ring-blue-500",
          ])}
        />
        <button
          onClick={handleSend}
          className={clsx([
            "budclient:ml-2",
            "budclient:px-2",
            "budclient:py-2",
            "budclient:bg-blue-500",
            "budclient:text-white",
            "budclient:rounded-lg",
            "budclient:shadow-md",
            "budclient:hover:bg-blue-600",
            "budclient:transition-all",
          ])}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2c-8.5 2.1-13.8 10.7-11.7 19.3l86.2 352.2c1.3 5.3 5.2 9.6 10.4 11.3l147.7 50.7l-147.6 50.7c-5.2 1.8-9.1 6-10.3 11.3L72.2 926.5c-.9 3.7-.5 7.6 1.2 10.9c3.9 7.9 13.5 11.1 21.5 7.2l836.5-417c3.1-1.5 5.6-4.1 7.2-7.1c3.9-8 .7-17.6-7.2-21.6M170.8 826.3l50.3-205.6l295.2-101.3c2.3-.8 4.2-2.6 5-5c1.4-4.2-.8-8.7-5-10.2L221.1 403L171 198.2l628 314.9z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
