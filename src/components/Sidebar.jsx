import React, { useState } from "react";
import Chats from "./Chats";
import Navbar from "./Navbar";
import Search from "./Search";

const Sidebar = ({
    users,
    userDetails,
    setMessages,
    setCurrentConversation,
    scroll,
}) => {
    const [conversations, setConversations] = useState([]);

    return (
        <div className="sidebar">
            <Navbar />
            <Search
                scroll={scroll}
                setMessages={setMessages}
                users={users}
                conversations={conversations}
                setConversations={setConversations}
                setCurrentConversation={setCurrentConversation}
            />
            <Chats
                scroll={scroll}
                setMessages={setMessages}
                conversations={conversations}
                setConversations={setConversations}
                setCurrentConversation={setCurrentConversation}
                userDetails={userDetails}
            />
        </div>
    );
};

export default Sidebar;
