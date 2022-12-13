import { useCallback, useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import io, { Socket } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState<Socket>();
  const [msg, setMsg] = useState<string[]>([]);
  const [singleMsg, setSingleMsg] = useState<string>();

  const MessageListener = (message: string) => {
    setMsg([message, ...msg]);
  };
  const sendMsg = () => {
    socket?.emit("events", singleMsg);
  };
  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket?.on("events", MessageListener);
    return () => {
      // socket?.off("events", MessageListener);
      newSocket.close();
    };
  }, [setSocket]);

  return (
    <div>
      <h1 className="text-3xl font-bold  underline text-red-700">
        {" "}
        Testing socket programming
      </h1>
      <div className="mt-20">
        <input
          placeholder="Enter the msg"
          className="border p-2 m-1 rounded-xl"
          onChange={(e) => setSingleMsg(e.target.value)}
        />
        <button
          onClick={() => sendMsg()}
          className="bg-slate-900 text-yellow-100 p-2 rounded-xl ml-1"
        >
          send
        </button>
      </div>
      <div>
        <ul>
          {msg.map((tex, index) => (
            <li key={index}>{tex}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
