import React from "react";
import Cam from "../images/cam.png";
import Add from "../images/add.png";
import More from "../images/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { UserContext } from "../App";
import { useContext } from "react";

const Chat = ({ setMessages, scroll, currentConversation, messages }) => {
    const authUser = useContext(UserContext);

    return (
        <div className="chat">
            <div className="chatInfo">
                <span>
                    {currentConversation
                        ? currentConversation.starter === authUser.id
                            ? currentConversation.second_party_username.toUpperCase()
                            : currentConversation.starter_username.toUpperCase()
                        : ""}
                </span>
                <div className="chatIcons">
                    <img src={Cam} alt="" />
                    <img src={Add} alt="" />
                    <img src={More} alt="" />
                </div>
            </div>
            <Messages scroll={scroll} messages={messages} />
            <Input
                scroll={scroll}
                currentConversation={currentConversation}
                setMessages={setMessages}
                messages={messages}
            />
        </div>
    );
};

export default Chat;
