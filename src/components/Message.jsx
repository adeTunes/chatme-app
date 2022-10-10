import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../App";

const Message = ({ msg, timeSent }) => {
    const authUser = useContext(UserContext);

    return (
        <div
            className={
                authUser.id === msg.sender
                    ? "message owner"
                    : "message receiver"
            }>
            <div className="messageInfo">
                <img
                    src="https://images.pexels.com/photos/6389849/pexels-photo-6389849.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                    alt=""
                />
                <span style={{ fontSize: "12px", whiteSpace: "nowrap" }}>
                    {timeSent < 1
                        ? "just now"
                        : timeSent === 1
                        ? `${timeSent} minute ago`
                        : timeSent > 1 && timeSent < 59
                        ? `${timeSent} minutes ago`
                        : timeSent > 59 &&
                          `${(timeSent / 60).toFixed()} hr ago`}
                </span>
            </div>
            <div className="messageContent">
                <p>{msg.text}</p>
                {/* <img
                    src="https://images.pexels.com/photos/6389849/pexels-photo-6389849.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                    alt=""
                /> */}
            </div>
        </div>
    );
};

export default Message;
