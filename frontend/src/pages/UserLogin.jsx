import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [userData, setUserData] = useState({});

    const handleSubmit = (e) => {
        setUserData({ email, password });
        e.preventDefault();
    };

    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/960px-Uber_logo_2018.png"
                    alt=""
                    className="w-16 mb-6"
                />
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h3 className="text-base font-medium mb-2">
                        What's Your Email
                    </h3>
                    <input
                        type="email"
                        required
                        placeholder="Email"
                        className="bg-[#eeeeee] mb-2 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <h3 className="text-base font-medium mb-2">Enter Password</h3>
                    <input
                        type="password"
                        placeholder="Password"
                        className="bg-[#eeeeee] mb-2 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="bg-[#111] mt-2 text-white font-semibold mb-2 rounded px-4 py-2 border w-full text-base placeholder:text-sm">
                        login
                    </button>
                    <p className="text-center">
                        New Here?{" "}
                        {
                            <Link className="text-blue-600" to="/signup">
                                Create Account
                            </Link>
                        }
                    </p>
                </form>
            </div>
            <div>
                <Link
                    to="/captain-login"
                    className="bg-[#111] flex items-center justify-center mt-2 text-white font-semibold mb-2 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
                >
                    Sign in as captain
                </Link>
            </div>
        </div>
    );
};

export default UserLogin;
