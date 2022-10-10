import React, { useEffect } from "react";
import Message from "./Message";

const Messages = ({ messages, scroll }) => {
    useEffect(() => {
        scroll.current.scrollIntoView({
            behaviour: "smooth",
            block: "nearest",
            inline: "start",
        });
    }, []);

    return (
        <div className="messages">
            {messages ? (
                messages.length > 0 ? (
                    messages.map((msg) => (
                        <Message
                            key={msg.url}
                            timeSent={
                                +(
                                    (Date.now() -
                                        new Date(msg.date_sent).getTime()) /
                                    1000 /
                                    60
                                ).toFixed()
                            }
                            msg={msg}
                        />
                    ))
                ) : (
                    <p>No messages</p>
                )
            ) : (
                <p>Select a conversation to start chatting</p>
            )}
            <span ref={scroll}></span>
        </div>
    );
};

export default Messages;
