import { useState } from 'react';
import './MoviesCard.css';
import poster from '../../images/poster.jpg'

function MoviesCard() {
    // при добавлении функциональности добавить setLike
    const [isLike] = useState(false);

    return (
        <div className="movie__card">
            <div className="card">
                <div className="card__info">
                    <h3 className="card__name">В погоне за Бенкси</h3>
                    <p className="card__duration">27 минут</p>
                </div>
                <a className="card__link" href="https://youtu.be/K521T9HmGyM" target={"_blank"} rel="noreferrer">
                    <img className="card__image" alt="постер" src={poster}/>
                </a>

                {isLike ? 
                    <button className="card__like-button_active" />
                    : 
                    <button className="card__like-button">Cохранить</button>
                }
            </div>
            
            <div className="card">
                <div className="card__info">
                    <h3 className="card__name">В погоне за Бенкси</h3>
                    <p className="card__duration">27 минут</p>
                </div>
                <a className="card__link" href="https://youtu.be/K521T9HmGyM" target={"_blank"} rel="noreferrer">
                    <img className="card__image" alt="постер" src={poster}/>
                </a>

                {isLike ? 
                    <button className="card__like-button_active" />
                    : 
                    <button className="card__like-button">Cохранить</button>
                }
            </div>

            <div className="card">
                <div className="card__info">
                    <h3 className="card__name">В погоне за Бенкси</h3>
                    <p className="card__duration">27 минут</p>
                </div>
                <a className="card__link" href="https://youtu.be/K521T9HmGyM" target={"_blank"} rel="noreferrer">
                    <img className="card__image" alt="постер" src={poster}/>
                </a>

                {isLike ? 
                    <button className="card__like-button_active" />
                    : 
                    <button className="card__like-button">Cохранить</button>
                }
            </div>

            <div className="card">
                <div className="card__info">
                    <h3 className="card__name">В погоне за Бенкси</h3>
                    <p className="card__duration">27 минут</p>
                </div>
                <a className="card__link" href="https://youtu.be/K521T9HmGyM" target={"_blank"} rel="noreferrer">
                    <img className="card__image" alt="постер" src={poster}/>
                </a>

                {isLike ? 
                    <button className="card__like-button_active" />
                    : 
                    <button className="card__like-button">Cохранить</button>
                }
            </div>

            <div className="card">
                <div className="card__info">
                    <h3 className="card__name">В погоне за Бенкси</h3>
                    <p className="card__duration">27 минут</p>
                </div>
                <a className="card__link" href="https://youtu.be/K521T9HmGyM" target={"_blank"} rel="noreferrer">
                    <img className="card__image" alt="постер" src={poster}/>
                </a>

                {isLike ? 
                    <button className="card__like-button_active" />
                    : 
                    <button className="card__like-button">Cохранить</button>
                }
            </div>

            <div className="card">
                <div className="card__info">
                    <h3 className="card__name">В погоне за Бенкси</h3>
                    <p className="card__duration">27 минут</p>
                </div>
                <a className="card__link" href="https://youtu.be/K521T9HmGyM" target={"_blank"} rel="noreferrer">
                    <img className="card__image" alt="постер" src={poster}/>
                </a>

                {isLike ? 
                    <button className="card__like-button_active" />
                    : 
                    <button className="card__like-button">Cохранить</button>
                }
            </div>

            <div className="card">
                <div className="card__info">
                    <h3 className="card__name">В погоне за Бенкси</h3>
                    <p className="card__duration">27 минут</p>
                </div>
                <a className="card__link" href="https://youtu.be/K521T9HmGyM" target={"_blank"} rel="noreferrer">
                    <img className="card__image" alt="постер" src={poster}/>
                </a>

                {isLike ? 
                    <button className="card__like-button_active" />
                    : 
                    <button className="card__like-button">Cохранить</button>
                }
            </div>
        </div>
    );
}

export default MoviesCard;