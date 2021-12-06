import './Portfolio.css';
import linkIcon from '../../images/link-icon.svg';

function Portfolio() {
    return (
        <section className="portfolio">
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
        </section>
    );
}

export default Portfolio;
