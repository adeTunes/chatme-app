import React from "react";
import SigIn from "./SigIn";
import LogOut from "./LogOut";

const style = {
    nav: `bg-gray-800 flex justify-between items-center p-4`,
    heading: `text-white text-3xl`,
};

function Navbar({ user, loading }) {
    console.log(user, loading);
    return (
        <div className={style.nav}>
            <h1 className={style.heading}>TuChat</h1>
            {loading ? (
                <>
                    <p>
                        <strong className="text-white">Authorizing...</strong>
                    </p>
                </>
            ) : (
                <>{user ? <LogOut /> : <SigIn />}</>
            )}
        </div>
    );
}

export default Navbar;
