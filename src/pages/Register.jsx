import React from "react";
import Add from "../images/addAvatar.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [gender, setGender] = useState("Male");

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();

        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const profile_picture = e.target[4].files[0];

        let formdata = new FormData();
        formdata.append(
            "profile_picture",
            profile_picture,
            profile_picture.name
        );
        formdata.append("username", username);
        formdata.append("email", email);
        formdata.append("password", password);
        formdata.append("gender", gender);

        let requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
        };

        fetch("http://localhost:8000/api/accounts/users_list/", requestOptions)
            .then((response) => response.json())
            .then((result) => navigate("/login"))
            .catch((error) => console.log("error", error));
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">ChatMe</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="username" />
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                    {err && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                            password must be more than 6 characters
                        </span>
                    )}
                    <input type="file" style={{ display: "none" }} id="file" />
                    <label htmlFor="file">
                        <img src={Add} alt="" />
                        <span>Add an Avatar</span>
                    </label>
                    <button>Sign up</button>
                    {/* {loading && !err && (
                        <span>
                            Uploading and compressing the image please wait...
                        </span>
                    )} */}
                </form>
                <p>
                    You do have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
