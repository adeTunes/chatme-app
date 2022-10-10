import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../App";

const Search = ({
    users,
    conversations,
    setCurrentConversation,
    setMessages,
    setConversations,
}) => {
    const [username, setUsername] = useState("");
    const [userSearch, setUserSearch] = useState([]);
    const [err, setErr] = useState(false);

    const authUser = useContext(UserContext);

    const handleSearch = () => {
        const result = users.filter((el) => el.username.includes(username));
        result.length > 0 ? setUserSearch(result) : setErr(true);
    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };

    useEffect(() => {
        username === "" && setUserSearch([]);
        username === "" && setErr(false);
    }, [username]);

    const handleAddConversation = (id) => {
        const newConvo = { starter: authUser.id, second_party: id };

        fetch(
            `http://localhost:8000/api/chat/user_conversation_list/${authUser.id}/`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newConvo),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                setConversations([...conversations, data]);
                setCurrentConversation(data);
                fetch(
                    `http://localhost:8000/api/chat/conversation_messages/${data.id}/`
                )
                    .then((res) => res.json())
                    .then((data) => setMessages(data));
            });
        setUserSearch([]);
    };

    return (
        <div className="search">
            <div className="searchForm">
                <input
                    type="text"
                    onKeyDown={handleKey}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Find a user"
                />
            </div>
            {err && <span>User not found</span>}
            {userSearch.map((user) => {
                return (
                    <div
                        key={user.id}
                        onClick={() => handleAddConversation(user.id)}
                        className="userChat">
                        <img src={user.profile_picture} alt="" />{" "}
                        {/* photo url */}
                        <div className="userChatInfo">
                            <span>{user.username}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Search;
