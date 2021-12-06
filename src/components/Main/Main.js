import './Main.css';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Header from '../Header/Header'
import Footer from '../Footer/Footer';
import Portfolio from '../Portfolio/Portfolio';

function Main({ loggedIn }) {
    return (
        <div className="main">
            <Header loggedIn={loggedIn}/>
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
            <Footer />
        </div>
    )
}

export default Main;