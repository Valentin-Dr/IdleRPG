import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import rebirthfruit from '../../../public/images/rebirthfruit.png';
import { activateRebirth } from '../../actions/rebirth';

import './style.scss';

export default function Rebirth() {
  const dispatch = useDispatch();
  const { rebirthAmount } = useSelector((state) => state.character);
  const levelFight = useSelector((state) => state.character.level);
  const levelMine = useSelector((state) => state.mining.level);
  const levelFish = useSelector((state) => state.fishing.level);
  const totalLevel = levelFight + levelMine + levelFish;
  const calcTotalFruits = rebirthAmount !== 0 ? rebirthAmount * totalLevel : totalLevel;
  const rebirthButton = () => {
    dispatch(activateRebirth(calcTotalFruits));
  }
  return (
    <div className="rebirth-container">
      <h2 className="rebirth-title">Rebirth</h2>
      <div className="rebirth-sub">
        <p>Actuellement, votre niveau global est de <span className="globalLevel">{totalLevel}</span></p>
        <p>A partir du niveau global 100, vous pouvez renaître</p>
        <p>Cela vous procurera divers avantages, cependant</p>
        <p className="warning">Vous perdrez toute la progression de votre personnage, sauf vos fruits de renaissance et vos compétences</p>
        <p>Vous récupérerez un certain nombre de fruits de renaissance, basé sur le niveau global de votre personnage et le nombre de renaissances déjà effectuées</p>
        <p>Si vous renaîssez maintenant, vous obtiendrez :</p>
        <p>{calcTotalFruits}<img src={rebirthfruit} alt="rebirth fruit" /></p>
        {rebirthAmount === 0 && <p>L'accès aux Compétences</p>}
        {rebirthAmount === 0 && <p>L'accès aux Familiers</p>}
        <button className={totalLevel < 100 && "rebirth-notallowed"} onClick={rebirthButton}>Renaître</button>
      </div>
    </div>
  )
}
