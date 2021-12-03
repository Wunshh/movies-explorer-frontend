import './AboutProject.css';

function AboutProject() {
    return (
        <section className="project" id="aboutProject">
            <h2 className="project__title">О проекте</h2>
            <div className="project__story">
                <h3 className="project__subtitle">Дипломный проект включал 5 этапов</h3>
                <h3 className="project__subtitle">На выполнение диплома ушло 5 недель</h3>
                <p className="project__info">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                <p className="project__info">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            <div className="project__timelines">
                <h4 className="project__timeline project__timeline_position_left">1 неделя</h4>
                <h4 className="project__timeline project__timeline_position_right">4 недели</h4>
                <p className="project__stage">Back-end</p>
                <p className="project__stage">Front-end</p>
            </div>
        </section>
    );
}

export default AboutProject;