import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import rebirthFruit from '../../../public/images/rebirthfruit.png';

import './style.scss';

export default function Upgrades() {
  const dispatch = useDispatch();
  const { upgradesList } = useSelector((state) => state.upgrades);
  const { rebirthFruits } = useSelector((state) => state.character);
  console.log(upgradesList);
  const jsxUpgrades = upgradesList.map((upgrade) => 
    <div className="upgrades-block" key={uuidv4()}>
      <h2 className="upgrades-block-title">{upgrade.name}</h2>
      <div className={upgrade.name.replace(" ", "")} />
      <p className="upgrades-block-desc">{upgrade.desc}</p>
      <h3>Effets&nbsp;:</h3>
      <p>{upgrade.effectStat} {upgrade.effectType === "percentage" ? "x" : "+"} {upgrade.effect}</p>
      {/* // todo ajouter onclick */}
      <button>{upgrade.cost}<img src={rebirthFruit} alt="fruit de renaissance" /></button>
      {/* <p>Coût&nbsp;: {upgrade.cost}<img src={rebirthFruit} alt="fruit de renaissance" /></p> */}
    </div>
    )
  return (
    <div className="upgrades-container">
      <h2 className="upgrades-totalFruits">Vous possédez {rebirthFruits}<img src={rebirthFruit} alt="fruit de renaissance" /></h2>
      {jsxUpgrades}
    </div>
  )
}
