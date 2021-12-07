import './Promo.css';
import background from '../../images/main_back.svg';

function Promo() {
    return (
        <section className="promo">
            <img className="promo__background-image" alt="Практикум" src={background} />
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        </section>
    );
}

export default Promo;