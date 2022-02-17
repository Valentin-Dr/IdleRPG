import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setWorking,
  setCurrentResource,
  alertPlayerResource,
  addLogMessage,
  addLevelUpMessage,
  levelUpJob,
  getAllFishResources,
  sendFishToDb,
} from '../../actions/fishing';
import { sendResourceToInventory } from '../../actions/mining';
import '../../styles/allitems.scss';
import '../Mining/style.scss';

export default function Fishing({job}) {
  const {
    isWorking,
    buttonTitle,
    currentResource,
    resources,
    baseReward,
    actionTime,
    logMessages,
    experience,
    level,
    levelUpReq,
  } = useSelector((state) => job === 'mining' ? state.mining : state.fishing);

  const { inventory } = useSelector((state) => state.character);

  const dispatch = useDispatch();

  const percentage = (partialValue, totalValue) => {
    return (100 * partialValue) / totalValue;
  } 

  useEffect(() => {
    dispatch(getAllFishResources());
  }, []);

  // Click bouton pour lancer l'action
  const buttonOnClick = () => {
    
    if (currentResource) {
      dispatch(setWorking());
    }
    else
    {
      dispatch(alertPlayerResource());
    }
  };

  // Pour afficher les logs
  // https://devtrium.com/posts/set-interval-react
  // Et gérer la montée de niveau
  useEffect(() => {
    if (isWorking) {
      const interval = setInterval(() => {
        const workingResource = resources.find(resource => resource.name === currentResource);
        const wr = workingResource;
        const { id } = wr;
        // Calculs des quantités et de l'exp
        const quantity = Math.floor((level / 6) + 1);
        const exp = Math.floor(1 + (wr.attribute[0].value / 8));
        dispatch(sendFishToDb(id, quantity, exp));
        dispatch(sendResourceToInventory(wr, quantity));
        dispatch(addLogMessage(exp, quantity));
      }, actionTime);

      return () => clearInterval(interval)
    }
  }, [isWorking, experience])

  // Choix de la ressource
  const switchResource = (e) => {
    console.log(inventory);
    const workingResource = resources.find(resource => resource.name.replace(/['"]+/g, "").replace(/\s/g, "") === e.target.className.split(' ')[1]);
    if (level >= workingResource.attribute[0].value) {
      dispatch(setCurrentResource(e.target.className.split(' ')[1], workingResource.attribute[0].value )); // EXP GAGNÉE
    }
  }

  // Remplissage de la liste des ressources
  const fillResources = resources.map(fish =>
  <div className={`${level >= fish.attribute[0].value ? "resource" : "resource--not-allowed"} ${fish.name.replace(/['"]+/g, "").replace(/\s/g, "")}`} key={fish.name} onClick={switchResource}>
    <span className="oreTooltipText">{fish.name}<br /> {`Niveau ${fish.attribute[0].value} requis`}</span>
  </div> );

  return (
    <div className="jobContainer">
      <div className="jobMain jobMain-fishing">
        <button className="jobStartAction" onMouseDown={buttonOnClick}>{buttonTitle}</button>
        <span id="progressContainer">
          <span id="progress" style={isWorking ? { animation: `playerWorking 2000ms infinite linear`} : undefined}></span>
        </span>
        <p className="jobLevel">Niveau {level}</p>
        <div className="playerWorkContainer">
          <div className={`jobPlayer ${isWorking ? "playerFishing" : "playerIdle"}`}></div>
          <div className={`fishingResource ${currentResource}`}></div>
        </div>
      </div>
      <div className="jobSecondaryContainer">
        <div className="jobSmall jobLogs">{logMessages}</div>
        <div className="jobSmall jobResourcesList">{fillResources}</div>
      </div>
    </div>
  );
}
