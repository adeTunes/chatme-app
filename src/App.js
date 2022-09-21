import React from "react";
import Navbar from "./components/Navbar";
import Chat from "./components/Chat";

import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const style = {
    appContainer:
        "max-w-[720px] w-[60%] mx-auto grid overflow-auto grid-rows-[1fr] text-center",
    sectionContainer:
        "bg-gray-100 rounded-[20px] shadow-xl border grid grid-rows-[auto_1fr_auto_auto] overflow-auto",
};

function App() {
    const [user, loading] = useAuthState(auth);

    return (
        <div className={style.appContainer}>
            <section className={style.sectionContainer}>
                <Navbar user={user} loading={loading} />
                {user ? <Chat /> : null}
            </section>
        </div>
    );
}

export default App;
