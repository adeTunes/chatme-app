import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setAuthUser }) => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();

        const username = e.target[0].value;
        const password = e.target[1].value;

        const loginUser = { username, password };

        fetch("http://localhost:8000/api/accounts/user_authenticate/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginUser),
        })
            .then((res) => res.json())
            .then((data) => {
                setAuthUser(data);
                navigate("/");
            });
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">ChatMe</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="username" />
                    <input type="password" placeholder="password" />
                    <button>Sign in</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>
                    You don't have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
