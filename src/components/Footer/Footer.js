import './Footer.css';

function Footer() {
    return (
        <section className="footer">
            <h4 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
            <hr className="footer__line"/>
            <div className="footer__copyright">
                <p className="footer__year">&#169; 2021</p>
                <div className="footer__links">
                    <a className="footer__link" href="https://practicum.yandex.ru" target={"_blank"}  rel="noreferrer">Яндекс.Практикум</a>
                    <a className="footer__link" href="https://github.com" target={"_blank"}  rel="noreferrer">Github</a>
                    <a className="footer__link" href="https://ru-ru.facebook.com" target={"_blank"}  rel="noreferrer">Facebook</a>
                </div>
            </div>
        </section>
    );
}

export default Footer;