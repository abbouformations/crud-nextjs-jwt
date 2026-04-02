"use client";

import { createContext, useContext, useState } from "react";

type MessageType = "success" | "error" | "info";

type Message = {
  id: number;
  message: string;
  type: MessageType;
};

const MessageContext = createContext<any>(null);

export function MessageProvider({ children }: any) {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: string, type: Message) => {
    const id = Date.now();

    setMessages((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeMessage(id);
    }, 3000);
  };

  const removeMessage = (id: number) => {
    setMessages((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <MessageContext.Provider value={{ addMessage }}>
      {children}
      <div className="toast-container position-fixed top-0 end-0 p-3">
        {messages.map((t) => (
          <div
            key={t.id}
            className={`toast show text-white bg-${
              t.type === "error" ? "danger" : t.type
            }`}
          >
            <div className="d-flex">
              <div className="toast-body">{t.message}</div>
              <button
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => removeMessage(t.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </MessageContext.Provider>
  );
}

export const useMessage = () => useContext(MessageContext);
