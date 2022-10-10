import React from "react";
import Img from "../images/img.png";
import Attach from "../images/attach.png";
import { useState } from "react";
import { UserContext } from "../App";
import { useContext } from "react";

const Input = ({ setMessages, scroll, messages, currentConversation }) => {
    const [newText, setNewText] = useState("");

    const authUser = useContext(UserContext);

    const handlePostMessage = () => {
        const newMessage = {
            conversation: currentConversation.id,
            sender: authUser.id,
            receiver:
                authUser.id === currentConversation.starter
                    ? currentConversation.second_party
                    : currentConversation.starter,
            text: newText,
        };

        fetch(
            `http://localhost:8000/api/chat/conversation_messages/${currentConversation.id}/`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newMessage),
            }
        ).then(() => {
            fetch(
                `http://localhost:8000/api/chat/conversation_messages/${currentConversation.id}/`
            )
                .then((res) => res.json())
                .then((data) => {
                    setMessages(data);
                    scroll.current.scrollIntoView({
                        behaviour: "smooth",
                        block: "nearest",
                        inline: "start",
                    });
                });
        });
    };

    const handleKey = (e) => {
        e.code === "Enter" && handlePostMessage();
        e.code === "Enter" && setNewText("");
        e.code === "Enter" &&
            scroll.current.scrollIntoView({
                behaviour: "smooth",
                block: "nearest",
                inline: "start",
            });
    };

    return (
        <div className="input">
            <input
                type="text"
                placeholder="Type something..."
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                onKeyDown={handleKey}
            />
            <div className="send">
                <img src={Attach} alt="" />
                <input type="file" style={{ display: "none" }} id="file" />
                <label htmlFor="file">
                    <img src={Img} alt="" />
                </label>
                <button onClick={handlePostMessage}>Send</button>
            </div>
        </div>
    );
};

export default Input;
