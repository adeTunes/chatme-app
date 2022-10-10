import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../App";

const Chats = ({
    conversations,
    setCurrentConversation,
    setMessages,
    setConversations,
    scroll,
    userDetails,
}) => {
    const authUser = useContext(UserContext);
    const [active, setActive] = useState(0);
    const [userDP, setuserDP] = useState(null);

    useEffect(() => {
        fetch(
            `http://localhost:8000/api/chat/user_conversation_list/${authUser.id}/`
        )
            .then((res) => res.json())
            .then((data) => {
                setConversations(data);
            });
    }, [authUser.id]);

    // useEffect(() => {
    //     conversations.length > 0 &&
    //         conversations.map((item) =>
    //             fetch(item.all_active_messages)
    //                 .then((res) => res.json())
    //                 .then((resp) =>
    //                     setLastMsg((prevState) => [
    //                         ...prevState,
    //                         {
    //                             itemId: item.id,
    //                             lastText: resp[resp.length - 1].text,
    //                         },
    //                     ])
    //                 )
    //         );
    // }, [conversations]);

    const handleAddConversation = (conversation) => {
        setCurrentConversation(conversation);
        fetch(
            `http://localhost:8000/api/chat/conversation_messages/${conversation.id}/`
        )
            .then((res) => res.json())
            .then(async (data) => {
                await setMessages(data);
                scroll.current.scrollIntoView({
                    behaviour: "smooth",
                    block: "nearest",
                    inline: "start",
                });
            });

        setActive(conversation.id);
    };

    return (
        <div className="chats">
            {conversations.length > 0 ? (
                conversations
                    .map((item) => {
                        return (
                            <div
                                key={item.id}
                                onClick={() => handleAddConversation(item)}
                                className={
                                    active === item.id
                                        ? "bg-click userChat"
                                        : "userChat"
                                }>
                                <img
                                    src={
                                        (item.starter === authUser.id
                                            ? fetch(
                                                  `http://localhost:8000/api/accounts/user/details/${item.second_party}/`
                                              )
                                                  .then((res) => res.json())
                                                  .then((data) =>
                                                      setuserDP(
                                                          data.profile_picture
                                                      )
                                                  )
                                            : fetch(
                                                  `http://localhost:8000/api/accounts/user/details/${item.starter}/`
                                              )
                                                  .then((res) => res.json())
                                                  .then((data) =>
                                                      setuserDP(
                                                          data.profile_picture
                                                      )
                                                  )) && userDP
                                    }
                                    alt=""
                                />
                                <div className="userChatInfo">
                                    <span>
                                        {item.second_party === authUser.id
                                            ? item.starter_username
                                                  .split("")
                                                  .map((el, i) =>
                                                      i === 0
                                                          ? el.toLocaleUpperCase()
                                                          : el
                                                  )
                                                  .join("")
                                            : item.second_party_username
                                                  .split("")
                                                  .map((el, i) =>
                                                      i === 0
                                                          ? el.toLocaleUpperCase()
                                                          : el
                                                  )
                                                  .join("")}
                                    </span>
                                    <p
                                        title={
                                            item.last_message &&
                                            item.last_message
                                        }>
                                        {item.last_message &&
                                            item.last_message
                                                .split("")
                                                .reduce((acc, el, idx) => {
                                                    idx < 20
                                                        ? acc.push(el)
                                                        : idx >= 20 &&
                                                          idx < 23 &&
                                                          acc.push(".");
                                                    return acc;
                                                }, [])
                                                .join("")}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                    .reverse()
            ) : (
                <span>Search for a user to start a conversation</span>
            )}
        </div>
    );
};

export default Chats;
