import { Link } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
    return (
        <section className="not-found">
            <h3 className="not-found__title">404</h3>
            <p className="not-found__subtitle">Страница не найдена</p>
            <Link className="not-found__button" to="/">Назад</Link>
        </section>
    );
}

export default PageNotFound;