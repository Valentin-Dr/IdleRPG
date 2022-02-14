import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setWorking,
  setCurrentResource,
  alertPlayerResource,
  addLogMessage,
  addLevelUpMessage,
  levelUpJob,
  updateExpBar,
  sendResourceToInventory,
  getAllMineResources,
  sendOreToDb,
} from '../../actions/mining';
import '../../styles/allitems.scss'
import './style.scss';

export default function Mining({job}) {
  const {
    isWorking,
    buttonTitle,
    currentResource,
    resources,
    // baseReward,
    actionTime,
    logMessages,
    experience,
    level,
    levelUpReq,
    experiencePercentage,
  } = useSelector((state) => job === 'mining' ? state.mining : state.fishing);

  const { inventory } = useSelector((state) => state.character);

  const dispatch = useDispatch();

  const percentage = (partialValue, totalValue) => {
    return (100 * partialValue) / totalValue;
  } 

  useEffect(() => {
    dispatch(getAllMineResources());
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
        const { name, id, desc } = wr;
        // Calculs des quantités et de l'exp
        const quantity = Math.floor((level / 6) + 1);
        const exp = Math.floor(1 + (wr.attribute[0].value / 8));
        dispatch(sendOreToDb(id, quantity, exp));
        dispatch(sendResourceToInventory(wr, quantity));
        dispatch(addLogMessage(exp, quantity));
      }, actionTime);

      return () => clearInterval(interval)
    }
  }, [isWorking, experience])

  // Choix de la ressource
  const switchResource = (e) => {
    const workingResource = resources.find(resource => resource.name === e.target.className.split(' ')[1]);
    if (level >= workingResource.attribute[0].value) {
      dispatch(setCurrentResource(e.target.className.split(' ')[1], workingResource.attribute[0].value));
    };
  };

  // Remplissage de la liste des ressources
  const fillResources = resources.map(vein =>
  <div className={`${level >= vein.attribute[0].value ? "resource" : "resource--not-allowed"} ${vein.name}`} key={vein.name} onClick={switchResource}>
    <span className="oreTooltipText">{vein.name}<br /> {`Niveau ${vein.attribute[0].value} requis`}</span>
  </div> );

  return (
    <div className="jobContainer">
      <div className="jobMain jobMain-mining">
        <button className="jobStartAction" onMouseDown={buttonOnClick}>{buttonTitle}</button>
        <span id="progressContainer">
          <span id="progress" style={isWorking ? { animation: `playerWorking 2000ms infinite linear`} : {}}></span>
        </span>
        <p className="jobLevel">Niveau {level}</p>
        <div className="playerWorkContainer">
          <div className={`jobPlayer ${isWorking ? "playerMining" : "playerIdle"}`}></div>
          <div className={`currentResource ${currentResource}`}></div>
        </div>
      </div>
      <div className="jobSecondaryContainer">
        <div className="jobSmall jobLogs">{logMessages}</div>
        <div className="jobSmall jobResourcesList">{resources && fillResources}</div>
      </div>
    </div>
  );
}
