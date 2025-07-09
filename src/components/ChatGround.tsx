import { useChat } from "../context/ChatContext";
import { useMessages } from "../hooks/useMessages";
import errorImg from "../assets/error.png";
import sentImg from "../assets/sent.png";
import { useEffect, useRef } from "react";
function ChatGround() {
  const { selectedChannel, inputValue, setInputValue } = useChat();
  const {
    messages,
    loading,
    error,
    sendMessage,
    loadOlderMessages,
    retryMessage,
  } = useMessages();

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="flex-1 bg-[#f4f5fb] rounded-lg shadow-md flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          {selectedChannel}
        </h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-4 ">
        <div className="h-[400px] relative">
          <div className="flex justify-start mb-3">
            <button
              className="bg-[#17a2b8] hover:bg-[#138496] text-white font-bold py-2 px-4 rounded flex items-center transition-colors duration-200 cursor-pointer"
              onClick={loadOlderMessages}
            >
              Read More
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                ></path>
              </svg>
            </button>
          </div>
          {loading && (
            <p className="text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Loading messages...
            </p>
          )}
          {error && (
            <p className="text-red-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Failed to load messages. Please try again.
            </p>
          )}
          {messages.map((message) =>
            message.type === "received" ? (
              <div key={message.id} className="flex items-center gap-2 mb-8">
                <div>
                  <img
                    src={message.avatar}
                    alt={message.user}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <p className="text-sm text-center text-[#999999]">
                    {message.user}
                  </p>
                </div>

                <div className="p-2 rounded bg-[#fff] w-80">
                  <p className="text-sm text-gray-800 whitespace-pre-line">
                    {message.message}
                  </p>
                </div>
                <p className="text-sm">{message.time}</p>
              </div>
            ) : (
              <div
                key={message.id}
                className="flex items-center justify-end pb-2 gap-2 mb-8"
              >
                <p className="text-sm">{message.time}</p>
                {message.type === "error" && (
                  <button onClick={() => retryMessage(message)} title="Retry">
                    <img
                      className="w-[18px] h-[18px] cursor-pointer"
                      src={errorImg}
                      alt="Retry Icon"
                    />
                    error
                  </button>
                )}

                {message.type === "sent" && (
                  <>
                    <img
                      className="w-[18px] h-[18px]"
                      src={sentImg}
                      alt="Sent Icon"
                    />
                    <span>sent</span>
                  </>
                )}
                <div className="p-2 rounded bg-[#fff] w-80 text-end">
                  <p className="text-sm text-gray-800 whitespace-pre-line">
                    {message.message}
                  </p>
                </div>
                <div>
                  <img
                    src={message.avatar}
                    alt={message.user}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <p className="text-sm text-center text-[#999999]">
                    {message.user}
                  </p>
                </div>
              </div>
            )
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 flex flex-col space-y-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type Here..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="bg-[#17a2b8] w-fit hover:bg-[#138496] text-white font-bold py-3 px-6 rounded flex items-center transition-colors duration-200"
          onClick={sendMessage}
        >
          Send Message
          <svg
            className="ml-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </button>
      </div>
    </main>
  );
}

export default ChatGround;
