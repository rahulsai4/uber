import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const navigate = useNavigate();

    const { user, setUser } = useContext(UserDataContext);

    const handleSubmit = async (e) => {
        console.log(import.meta.env);

        e.preventDefault();
        const newUser = {
            fullName: {
                firstName,
                lastName,
            },
            email,
            password,
        };

        console.log("ENV Base URL:", import.meta.env.VITE_BASE_URL);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/users/register`,
                newUser
            );
            if (response.status === 201) {
                const data = response.data;
                setUser(data.user);
                navigate("/home");
            }
        } catch (error) {
            console.error(error);
        }
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
                        What's Your Name
                    </h3>
                    <div className="flex gap-1">
                        <input
                            required
                            placeholder="Firstname"
                            className="bg-[#eeeeee] mb-2 w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            required
                            placeholder="Lastname"
                            className="bg-[#eeeeee] mb-2 w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
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
                    <h3 className="text-base font-medium mb-2">
                        Enter Password
                    </h3>
                    <input
                        type="password"
                        placeholder="Password"
                        className="bg-[#eeeeee] mb-2 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="bg-[#111] mt-2 text-white font-semibold mb-2 rounded px-4 py-2 border w-full text-base placeholder:text-sm">
                        signup
                    </button>
                    <p className="text-center">
                        Already Have An Account?{" "}
                        {
                            <Link className="text-blue-600" to="/login">
                                Login
                            </Link>
                        }
                    </p>
                </form>
            </div>
        </div>
    );
};

export default UserSignup;
