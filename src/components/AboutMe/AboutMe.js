import './AboutMe.css';
import me from '../../images/me.JPG';

function AboutMe() {
    return (
        <section className="about-me" id="aboutMe">
            <h2 className="about-me__title">Студент</h2>
            <article className="about-me__flex">
                <div className="about-me__info">
                    <h3 className="about-me__name">Валентина</h3>
                    <p className="about-me__work">Фронтенд-разработчик, 26 лет</p>
                    <p className="about-me__biography">
                        Я родилась в небольшом городе в Оренбургской области. 
                        В университет поступила в Самаре, откуда после переехала в Москву. 
                        Мне нравится заниматься творчеством: рисовать, готовить. 
                        Для меня разработка стала еще одним способом творчества. 
                        На этапе диплома я уволилась с работы и полностью посвятила себя программированию. 
                    </p>
                    <a className="about-me__contact" href="https://github.com/Wunshh" target={"_blank"}  rel="noreferrer">Github</a>
                    <a className="about-me__contact" href="https://vk.com/id17163726" target={"_blank"} rel="noreferrer">VK</a>
                </div>
                <img className="about-me__photo" alt="Мое фото" src={me} />
            </article>
        </section>
    );
}

export default AboutMe;