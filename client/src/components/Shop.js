import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
    const [potions, setPotions] = useState([]);
    const [nickname, setNickname] = useState(""); // Стан для зберігання нікнейму
    const [errorMessage, setErrorMessage] = useState(""); // Повідомлення про помилку (якщо є)

    // Отримуємо зілля з бази даних при завантаженні компонента
    useEffect(() => {
        fetch("http://localhost:5000/api/potions")
            .then((response) => response.json())
            .then((data) => setPotions(data))
            .catch((error) => console.error("Помилка при отриманні зілля:", error));
    }, []); // [] означає, що ефект виконається лише один раз, коли компонент буде завантажено

    // Обробка натискання на кнопку "Купити"
    const handleBuyPotion = (potionName) => {
        if (nickname.trim() === "") {
            setErrorMessage("Будь ласка, введіть ваш нікнейм перед покупкою.");
            return;
        }

        const potion = potions.find((p) => p.name === potionName);

        if (!potion) {
            setErrorMessage("Зілля не знайдено.");
            return;
        }

        if (potion.amount <= 0) {
            setErrorMessage("Немає достатньо зілля для покупки.");
            return;
        }

        // Запит на сервер для видачі зілля
        fetch(`http://localhost:5000/api/give-potion/${potion.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nickname }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    // Успішна видача зілля
                    setPotions((prevPotions) =>
                        prevPotions.map((p) =>
                            p.id === potion.id
                                ? { ...p, amount: p.amount - 1 }
                                : p
                        )
                    );
                    setErrorMessage("");
                } else {
                    setErrorMessage(data.error || "Сталася помилка при видачі зілля.");
                }
            })
            .catch((error) => {
                setErrorMessage("Сталася помилка при видачі зілля.");
                console.error("Error:", error);
            });
    };


    return (
        <div className="content">
            <div className="button-container">
                <img src={"/assets/images/pngwing.com (1).png"} className="bytpuck" alt="Logo" />
                <div className="main_menu">
                    <Link to="/set-spawn" className="scale" style={{ marginLeft: "20px" }}>
                        Встановити спавнпоінт
                    </Link>
                    <Link to="/potion-recipe" className="scale">
                        Отримати рецепт зілля
                    </Link>
                    <Link to="/spawn-location" className="scale">
                        Дізнатися де спавнпоінт
                    </Link>
                    <Link to="/shop" className="scale">
                        Наявні зілля
                    </Link>
                </div>
                <img src={"/assets/images/pngwing.com (1).png"} className="bytpuck" alt="Logo" style={{ marginLeft: "20px" }} />
            </div>

            <div className="flexbox" style={{ backgroundSize: "0%" }}>

                <div>
                    <h1 style={{
                        fontSize: "70px",
                        maxWidth: "600px",
                        marginLeft: "300px",
                        marginTop: "50px",
                        textAlign: "left",
                        border: "solid white"
                    }}>Наявні зілля для покупки</h1>
                    <img src={"/assets/images/potion.gif"} className="bytpuck" alt="Logo"
                         style={{
                             width: '550px',
                             height: '480px',
                             marginTop: '-300px',
                             marginLeft: '500px',
                             borderRadius: "20px"
                         }} />
                </div>
            </div>

            {/* Графа для введення нікнейму */}
            <div className="nickname-section" style={{ textAlign: "center", marginTop: "-290px", marginRight: "1190px" }}>
                <input
                    type="text"
                    placeholder="Введіть ваш нікнейм"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    style={{
                        padding: "10px",
                        fontSize: "16px",
                        width: "250px",
                        borderRadius: "5px",
                        marginBottom: "10px"
                    }}
                />
                {errorMessage && <p className={"frame"} style={{ color: "red", fontSize: "14px", marginLeft: "330px" }}>{errorMessage}</p>}
            </div>

            <div className="box1" style={{ flexWrap: "wrap", gap: "40px", justifyContent: "center", marginTop: "270px" , marginBottom: "270px" }}>
                {potions.map((potion, index) => (
                    <div key={index} style={{
                        background: "white",
                        borderRadius: "30px",
                        padding: "20px",
                        width: "250px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                        textAlign: "center"
                    }}>
                        <h3 style={{ fontFamily: "Minecraft 1.1" }}>{potion.name}</h3>
                        <p style={{ fontFamily: "Minecraft 1.1" }}>Ефект: {potion.effect}</p>
                        <p style={{ fontFamily: "Minecraft 1.1" }}>Кількість: {potion.amount}</p>
                        <button
                            onClick={() => handleBuyPotion(potion.name)}
                            >
                            Купити
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
