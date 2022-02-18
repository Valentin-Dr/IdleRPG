import './style.scss';
import image1 from '../../assets/Talking.png';
import image2 from '../../assets/Furious.png';
import image3 from '../../assets/wizard.png';
import image4 from '../../assets/Scared.png';
import image5 from '../../assets/Calm.png';
import image6 from '../../assets/frog.png';
import imageSlide1 from '../../assets/metier.png';
import imageSlide2 from '../../assets/image combat.png';
import imageSlide3 from '../../assets/image mobile.png';


export default function Home() {
  return (
    <div className="home">
      <div className="main">
        <div className="lore">
            <h2>Update 0.0.6</h2>
            <h3>18/02/2022</h3>
            <ul>
              <li>Refonte du code de l'onglet Profil</li>
              <li>Fix pêche (la carpe dorée faisait planter)</li>
              <li>Fix combat (Dans certains cas, le niveau n'était pas mis à jour et causait une déconnexion)</li>
            </ul>
          <p>
            L'équipe de dév.
          </p>
        </div>
        <div className="demo-block">
          <div className="frame-wrapper">
            <div className="frame">
              <div className="frame-inner">
                <div className="video">
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/TSYGiQ-1Vi4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              </div>
            </div>
          </div>
          <div className="frame-wrapper">
            <div className="frame">
              <div className="frame-inner">
                <div className="slides">
                  <div className="slide-container">
                    <div className="slide"><img src={imageSlide1} alt="slide métier" /></div>
                    <div className="slide"><img src={imageSlide2} alt="slide combat" /></div>
                    <div className="slide"><img src={imageSlide3} alt="slide mobile" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact">
        <h3>Les développeurs&nbsp;:</h3>
        <div className="dev-group">
          <div className="dev">
            <div className="identity">Derennes Valentin</div>
            <div className="medail-img">
              <img src={image6}/>
            </div>
          </div>
          <div className="dev">
            <div className="identity">a6kc4e</div>
            <div className="medail-img">
              <img src={image2}/>
            </div>
          </div>
          <div className="dev">
            <div className="identity">Jean Trinquet</div>
            <div className="medail-img">
              <img src={image1}/>
            </div>
          </div>
          <div className="dev">
            <div className="identity">Mathias Benmansour</div>
            <div className="medail-img">
              <img src={image3}/>
            </div>
          </div>
          <div className="dev">
            <div className="identity">Castellan</div>
            <div className="medail-img">
              <img src={image5}/>
            </div>
          </div>
        </div>
        <span className="mail">Contactez-nous&nbsp;: Idle.RPG.fr@gmail.com</span>
      </div>
      <div className="update">
        <span className="update-text">Le jeu est encore en cours de création, merci de nous indiquer bugs et suggestions dans le mail ci dessous ...&nbsp;</span>
        <span className="update-text">Le jeu est encore en cours de création, merci de nous indiquer bugs et suggestions dans le mail ci dessous ...&nbsp;</span>
        <span className="update-text">Le jeu est encore en cours de création, merci de nous indiquer bugs et suggestions dans le mail ci dessous ...&nbsp;</span>
      </div>
    </div>
  );
}
