import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import { db } from "../firebase";
import SendMessage from "./SendMessage";

const style = {
    main: `flex flex-col p-[10px] overflow-auto`,
};

function Chat() {
    const [messages, setMessages] = useState(null);
    const scroll = useRef();

    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("timestamp"));
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            let messages = [];
            QuerySnapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messages);
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            <main className={style.main}>
                {!messages ? (
                    <strong>fetching messages...</strong>
                ) : (
                    messages.length === 0 && (
                        <p className="flex flex-col gap-[30px]">
                            <strong>No messages...</strong>
                            <small>
                                Be the first to send a message here...
                            </small>
                        </p>
                    )
                )}
                {messages &&
                    messages.map((message) => (
                        <Message key={message.id} message={message} />
                    ))}
                <span ref={scroll}></span>
            </main>
            {/* Send Message Component */}
            <SendMessage scroll={scroll} />
        </>
    );
}

export default Chat;
