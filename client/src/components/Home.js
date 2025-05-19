import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";


const Home = () => {
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

            <div className="flexbox">
                <div>
                    <h1>Лікарня Minecraft</h1>
                </div>
            </div>

            <div className="main_text">Які в нас доступні функції?</div>

            <div className="box1">
                <div>
                    <img src={"/assets/images/maxresdefault.jpg"} alt="Spawn Point" style={{ borderRadius: "30px" }} />
                </div>
                <div>
                    <p className="big_text" style={{ color: "#1fbfa4" }}>Встановлення спавнпоінту</p>
                    <p className="mid_text">Не хочеш після смерті знову переноситися на спавн?</p>
                    <p className="mid_text">Встановлення точки відродження у наших лікарнях – це те, що тобі треба!</p>
                </div>
            </div>

            <div className="box1" style={{ marginTop: "300px" }}>
                <div style={{ margin: "76px" }}>
                    <p className="big_text" style={{ color: "blue" }}>Отримати рецепт зілля</p>
                    <p className="mid_text">Якщо ви впевнений в собі алхімік, ми можемо надати вам рецепт потрібного зілля!</p>
                    <p className="mid_text" style={{ marginTop: "20px", fontSize: "15px" }}>
                        (Пам'ятайте, самолікування шкідливе для вашого здоров'я)
                    </p>
                </div>
                <div>
                    <img src={"/assets/images/hqdefault.jpg"} alt="Potion Recipe" style={{ borderRadius: "30px" }} />
                </div>
            </div>

            <div className="box1" style={{ marginTop: "300px" }}>
                <div>
                    <img src={"/assets/images/histiry.jpg"} alt="Spawn History" style={{ borderRadius: "30px" }} />
                </div>
                <div>
                    <p className="big_text" style={{ color: "#a71fbf" }}>Дізнатися вашу точку відродження</p>
                    <p className="mid_text">Ви користувалися нашими послугами встановлення точки відродження?</p>
                    <p className="mid_text" style={{ marginTop: "20px" }}>
                        Прекрасно! Ми можемо показати вам вашу актуальну точку відродження, а також історію загалом!
                    </p>
                </div>
            </div>

            <div className="box1" style={{ marginTop: "300px" }}>
                <div style={{ marginRight: "100px" }}>
                    <p className="big_text" style={{ color: "#b5182f" }}>Наявні зілля</p>
                    <p className="mid_text">У вас немає вільного часу або можливостей займатися алхімією?</p>
                    <p className="mid_text" style={{ marginTop: "30px" }}>
                        Нічого страшного! У нас ви завжди можете придбати зілля за символічну ціну!
                    </p>
                </div>
                <div>
                    <img src={"/assets/images/photo_2024-04-05_22-46-45.jpg"} alt="Shop" style={{ borderRadius: "30px", width: "500px", marginRight: "100px" }} />
                </div>
            </div>
        </div>
    );
};

export default Home;
