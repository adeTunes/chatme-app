import React from "react";
import { useState, useRef } from "react";
import { useEffect } from "react";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

const Home = () => {
    const [users, setUsers] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [messages, setMessages] = useState(null);
    const scroll = useRef();

    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/accounts/users_list/")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setUserDetails(
                    data.reduce((acc, item) => {
                        acc.push({
                            userId: item.id,
                            userDP: item.profile_picture,
                        });
                        return acc;
                    }, [])
                );
            });
    }, []);

    return (
        <div className="home">
            <div className="container">
                <Sidebar
                    setCurrentConversation={setCurrentConversation}
                    setMessages={setMessages}
                    users={users}
                    scroll={scroll}
                    userDetails={userDetails}
                />
                <Chat
                    currentConversation={currentConversation}
                    messages={messages}
                    setMessages={setMessages}
                    scroll={scroll}
                    userDetails={userDetails}
                />
            </div>
        </div>
    );
};

export default Home;
