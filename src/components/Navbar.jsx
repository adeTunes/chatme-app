import React from "react";
import { useContext } from "react";
import { SetUserContext, UserContext } from "../App";

const Navbar = () => {
    const setAuthUser = useContext(SetUserContext);
    const authUser = useContext(UserContext);

    return (
        <div className="navbar">
            <span className="logo">ChatMe</span>
            <div className="user">
                <img src={authUser.profile_picture} alt="" />
                <span>{authUser.username}</span>
                <button
                    onClick={() => {
                        setAuthUser(null);
                    }}>
                    logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
