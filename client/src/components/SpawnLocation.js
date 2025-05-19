import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
    const [nickname, setNickname] = useState("");
    const [lastSpawn, setLastSpawn] = useState(null);
    const [spawnError, setSpawnError] = useState(null);

    const fetchLastSpawn = async () => {
        if (!nickname) {
            alert("Спочатку введіть нікнейм");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/last-spawn/${nickname}`);
            if (!response.ok) {
                const error = await response.json();
                setSpawnError(error.message || "Не знайдено");
                setLastSpawn(null);
                return;
            }
            const data = await response.json();
            setLastSpawn(data);
            setSpawnError(null);
        } catch (err) {
            console.error("Помилка запиту:", err);
            setSpawnError("Помилка з'єднання з сервером");
            setLastSpawn(null);
        }
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
                    }}>Дізнатися де точка підродження</h1>
                    <img src={"/assets/images/map.png"} className="bytpuck" alt="Logo"
                         style={{
                             width: '550px',
                             height: '500px',
                             marginTop: '-350px',
                             marginLeft: '500px',
                             borderRadius: "20px"
                         }} />
                </div>
            </div>


            <div className="box1">
                <div className={"mid_text"}>
                    <h2 className="text-2xl font-bold mb-4">Останній спавнпоінт</h2>
                    <input
                        type="text"
                        placeholder="Ваш нікнейм"
                        style={{fontFamily:"Minecraft 1.1"}}
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <button
                        onClick={fetchLastSpawn}
                        style={{ marginTop: "10px", fontFamily: "Minecraft 1.1" }}
                    >
                        Показати останній спавнпоінт
                    </button>

                    {lastSpawn && (
                        <div className={"frame"} style={{ marginLeft: "75px", wordSpacing: '10px' }}>
                            <strong>Останній спавнпоінт:</strong><br />
                            Координати: {lastSpawn.coordinates}<br />
                            Дата: {new Date(lastSpawn.set_date).toLocaleString()}
                        </div>
                    )}

                    {spawnError && (
                        <div style={{ color: "red", marginTop: "10px" }}>
                            {spawnError}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
