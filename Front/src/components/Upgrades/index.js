import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import rebirthFruit from '../../../public/images/rebirthfruit.png';

import './style.scss';
import { getAllUpgrades, levelUpUpgrade } from '../../actions/upgrades';

export default function Upgrades() {
  const dispatch = useDispatch();
  const { upgradesList } = useSelector((state) => state.upgrades);
  const { rebirthFruits, competences } = useSelector((state) => state.character);
  
  useEffect(() => {
    dispatch(getAllUpgrades());
  }, []);
  const upgradeOnClick = (e) => {
    const upgradeId = Number(e.currentTarget.id);
    const targetUpgrade = upgradesList.find((upg) => upg.id === upgradeId);
    dispatch(levelUpUpgrade(upgradeId, targetUpgrade.cost));
  }

  const jsxUpgrades = upgradesList.map((upgrade) => {
    if (competences[0] !== null || competences[1] !== undefined) {
      const unlockedUpg = competences.find((upg) => upg.id === upgrade.id);
      // Renommage pour raccourcir les lignes
      const uU = unlockedUpg;
      console.log(uU);
      if (uU) {
        return (
          <div className="upgrades-block" key={uuidv4()}>
          <h2 className="upgrades-block-title">{uU.name}</h2>
          <div className={uU.name.replace(" ", "").toLowerCase()} />
          <p className="upgrades-block-desc">{uU.desc}</p>
          <h3>Niveau {uU.level_competence}</h3>
          <h3>Effets&nbsp;:</h3>
          {uU.effect_type === "percentage" && (
            <p>{uU.effect_stat} x {(uU.effect + (uU.increment_effect * uU.level_competence))}</p>
          )}
          {uU.effect_type === "raw" && (
            <p>{uU.effect_stat} + {(uU.effect + (uU.increment_effect * uU.level_competence) - uU.effect)}</p>
          )} 
          <button id={uU.id} onClick={upgradeOnClick}>{uU.cost * (uU.level_competence + 1) * uU.increment_cost}<img src={rebirthFruit} alt="fruit de renaissance" /></button>
          {/* <p>Coût&nbsp;: {upgrade.cost}<img src={rebirthFruit} alt="fruit de renaissance" /></p> */}
        </div>
        )
      }
    }
    return (
    <div className="upgrades-block" key={uuidv4()}>
      <h2 className="upgrades-block-title">{upgrade.name}</h2>
      <div className={upgrade.name.replace(" ", "").toLowerCase()} />
      <p className="upgrades-block-desc">{upgrade.desc}</p>
      <h3>Niveau {upgrade.level_competence ? upgrade.level_competence : "0"}</h3>
      <h3>Effets&nbsp;:</h3>
      <p>{upgrade.effect_stat} {upgrade.effect_type === "percentage" ? "x" : "+"} 0</p>
      {/* // todo ajouter onclick */}
      <button id={upgrade.id} onClick={upgradeOnClick}>{upgrade.cost}<img src={rebirthFruit} alt="fruit de renaissance" /></button>
      {/* <p>Coût&nbsp;: {upgrade.cost}<img src={rebirthFruit} alt="fruit de renaissance" /></p> */}
    </div>
    )
  }
    )
  return (
    <div className="upgrades-container">
      <h2 className="upgrades-totalFruits">Vous possédez {rebirthFruits}<img src={rebirthFruit} alt="fruit de renaissance" /></h2>
      {jsxUpgrades}
    </div>
  )
}
