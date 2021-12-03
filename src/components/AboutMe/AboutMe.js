import './AboutMe.css';
import me from '../../images/me.JPG';
import linkIcon from '../../images/link-icon.svg';

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

            <div className="portfolio">
                <h4 className="portfolio__title">Портфолио</h4>
                <div className="portfolio__project">
                    <a className="portfolio__link" href="https://github.com/Wunshh/how-to-learn" target={"_blank"}  rel="noreferrer">Статичный сайт</a>
                    <img className="portfolio__icon" alt="стрелка" src={linkIcon}/>
                </div>
                <hr className="portfolio__line"/>
                <div className="portfolio__project">
                    <a className="portfolio__link" href="https://github.com/Wunshh/russian-travel" target={"_blank"}  rel="noreferrer">Адаптивный сайт</a>
                    <img className="portfolio__icon" alt="стрелка" src={linkIcon}/>
                </div>
                <hr className="portfolio__line"/>
                <div className="portfolio__project">
                    <a className="portfolio__link" href="https://github.com/Wunshh/react-mesto-api-full" target={"_blank"}  rel="noreferrer">Одностраничное приложение</a>
                    <img className="portfolio__icon" alt="стрелка" src={linkIcon}/>
                </div>
            </div>
        </section>
    );
}

export default AboutMe;