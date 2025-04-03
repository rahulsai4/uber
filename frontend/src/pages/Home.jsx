import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <div className="bg-cover bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] h-screen w-full pt-8 flex justify-between flex-col bg-blue-300">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/960px-Uber_logo_2018.png"
                    alt=""
                    className="w-16 ml-9"
                />
                <div className="bg-white rounded py-5 px-4">
                    <h2 className="font-bold">Get started with uber</h2>
                    <Link
                        className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-4"
                        to="/login"
                    >
                        Continue
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
