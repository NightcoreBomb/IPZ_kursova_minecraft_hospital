import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
    const [nickname, setNickname] = useState("");
    const [selectedCoords, setSelectedCoords] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const coordinates = [
        "X: 100, Y: 64, Z: 200",
        "X: -50, Y: 70, Z: 300",
        "X: 250, Y: 65, Z: -100",
        "X: 466, Y: 65, Z: -1000",
    ];

    const handleSubmit = async () => {
        if (!nickname || !selectedCoords) {
            alert("Будь ласка, введіть нікнейм і виберіть координати.");
            return;
        }

        setIsLoading(true);

        // Витягуємо лише цифри (включаючи від'ємні) та форматуємо з пробілами
        const coordsOnly = selectedCoords
            .replace(/[^0-9,\s\-]/g, "") // залишає лише цифри, коми, пробіли, мінуси
            .split(",")
            .map(c => c.trim())
            .join(" ");

        const command = `spawnpoint ${nickname} ${coordsOnly}`;

        // Логування перед відправкою запиту
        console.log(`Відправляється команда: ${command}`);

        try {
            const response = await fetch('http://localhost:5000/api/rcon-command', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    host: '192.168.1.76',
                    port: 25575,
                    password: '22848',
                    command
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert(`✅ Спавнпоінт встановлено для ${nickname}!\n\nВідповідь сервера: ${data.response}`);
            } else {
                alert(`❌ Помилка: ${data.error || 'Невідома помилка'}`);
            }
        } catch (err) {
            console.error(err);
            alert("❌ Помилка з'єднання з сервером.");
        } finally {
            setIsLoading(false);
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
                        marginLeft: "200px",
                        marginTop: "50px",
                        textAlign: "left",
                        border: "solid white"
                    }}>Встановити точку відродження</h1>
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

            <div className="box1" style={{ display: "block", marginTop: "-260px", textAlign: "left", paddingLeft: "120px", marginLeft: "-1300px" }}>
                <p className="mid_text">1. Ввести ваш нікнейм</p>
                <p className="mid_text">2. Вибрати з переліку координату, ті які вам підходять</p>
                <p className="mid_text">3. Натиснути кнопку "Обрати"</p>
                <p className="mid_text">4. Трошки зачекати</p>
            </div>

            <div className="box1">
                <div className="mid_text">
                    <h2>Встановлення спавнпоінту</h2>
                    <input
                        type="text"
                        placeholder="Ваш нікнейм"
                        className="mid_text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <div className="mid_text">
                        <select
                            value={selectedCoords}
                            onChange={(e) => setSelectedCoords(e.target.value)}
                        >
                            <option value="" disabled>Виберіть координати</option>
                            {coordinates.map((coord, index) => (
                                <option key={index} value={coord}>{coord}</option>
                            ))}
                        </select>
                        <button
                            onClick={handleSubmit}
                            style={{ fontFamily: "Minecraft 1.1" }}
                            disabled={isLoading}
                        >
                            {isLoading ? "Зачекайте..." : "Обрати"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
