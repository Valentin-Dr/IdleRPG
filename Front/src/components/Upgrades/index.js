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
  }, [])
  console.log(upgradesList);
  const upgradeOnClick = (e) => {
    const upgradeId = Number(e.currentTarget.id);
    const targetUpgrade = upgradesList.find((upg) => upg.id === upgradeId);
    console.log(upgradeId);
    console.log(targetUpgrade);
    dispatch(levelUpUpgrade(upgradeId, targetUpgrade.cost));
  }
  
  // const checkContains = (obj, arr) => {
  //   for (let i = 0; i < arr.length; i++) {
  //     if (arr[i].id === obj.id) {
  //       return true;
  //     } else {
  //       return false;
  //     };
  //   };
  // };

  // const test = upgradesList.filter(function(elem) {
  //   return competences.indexOf(elem) > -1;
  // });

  // console.log(test);

  // let lockedUpgrades = upgradesList.map((upgrade, i) => {
  //   const test = competences.find((elem) => elem.id !== upgrade.id);
  //   console.log(test);
  // });

  // console.log(lockedUpgrades);

  // useEffect(() => {
  //   const isSameUpgrade = (a, b) => a.id === b.id;
  
  //   const leftDiff = (left, right, compare) =>
  //   left.filter(leftValue =>
  //     !right.some(rightValue =>
  //       compare(leftValue, rightValue)));
  
  //   const lockedUpgrades = leftDiff(upgradesList, competences, isSameUpgrade);
  
  //   console.log("LOCKED", lockedUpgrades);
  // }, [upgradesList]);

  // useEffect(() => {
  //   if (competences[0] !== null) {
  //     const locked = upgradesList.filter(a => !competences.some(b => b.id === a.id));
  //     const unlocked = upgradesList.filter(c => competences.some(d => d.id === c.id));
  //     console.log(locked);
  //     console.log(unlocked);
  //   }
  // },[upgradesList, competences])

  const jsxUpgrades = upgradesList.map((upgrade) =>
    <div className="upgrades-block" key={uuidv4()}>
      <h2 className="upgrades-block-title">{upgrade.name}</h2>
      <div className={upgrade.name.replace(" ", "").toLowerCase()} />
      <p className="upgrades-block-desc">{upgrade.desc}</p>
      <h3>Niveau {upgrade.level_competence ? upgrade.level_competence : "0"}</h3>
      <h3>Effets&nbsp;:</h3>
      <p>{upgrade.effect_stat} {upgrade.effect_type === "percentage" ? "x" : "+"} {upgrade.effect}</p>
      {/* // todo ajouter onclick */}
      <button id={upgrade.id} onClick={upgradeOnClick}>{upgrade.cost}<img src={rebirthFruit} alt="fruit de renaissance" /></button>
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
