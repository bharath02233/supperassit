import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    function navig() {
        navigate("/createQuiz")
    }
    function navig1() {
        navigate("/takeQuiz")
    }
    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                padding: "10px 20px",
                backgroundColor: "#282c34",
                color: "white"
            }}>
                <button onClick={navig} style={{
                    backgroundColor: "#61dafb",
                    color: "#282c34",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                    transition: "background-color 0.3s ease",
                }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#21a1f1")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#61dafb")}
                >CreateQuiz</button>
                <button onClick={navig1}
                    style={{
                        backgroundColor: "#61dafb",
                        color: "#282c34",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                        transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#21a1f1")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#61dafb")}
                >TakeQuiz</button>
            </div>
        </>
    )
}

export default Header;