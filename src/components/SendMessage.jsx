import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { auth, db } from "../firebase";

const style = {
    form: `w-full max-w-[728px] flex text-xl`,
    input: `w-full text-xl p-3 bg-gray-900 text-white outline-none border-none`,
    button: `w-[20%] bg-green-500`,
};

function SendMessage({ scroll }) {
    const [input, setInput] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();
        if (input === "") {
            alert("Please enter a valid message");
            return;
        }
        const { uid, displayName } = auth.currentUser;
        setInput("");
        await addDoc(collection(db, "messages"), {
            text: input,
            name: displayName,
            uid,
            timestamp: serverTimestamp(),
        });
        scroll.current.scrollIntoView({
            behaviour: "smooth",
            block: "nearest",
            inline: "start",
        });
    };

    return (
        <form onSubmit={sendMessage} className={style.form}>
            <input
                className={style.input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Message"
            />
            <button type="submit" className={style.button}>
                Send
            </button>
        </form>
    );
}

export default SendMessage;
