import './style.scss';
import { useSelector } from 'react-redux';

export default function Success() {
  const { level } = useSelector((state) => state.character);
  return (
    <div className="success-container">
      <div className="success-container-title">
        <h2 className="title">
          Succès
        </h2>
      </div>
      <div className="all-success">
        <div className={level >= 10 ? 'success' : 'no-success success'}> Le début d'une aventure
          <div className="success-desc"> atteindre le niveau 10 </div>
        </div>
        <div className={level >= 50 ? 'success' : 'no-success success'}> L'aguerrissement
          <div className="success-desc"> atteindre le niveau 50 </div>
        </div>
        <div className={level >= 100 ? 'success' : 'no-success success'}> Le guerrier vétéran
          <div className="success-desc"> atteindre le niveau 100 </div>
        </div>
        <div className={level >= 200 ? 'success' : 'no-success success'}> Le guerrier légendaire
          <div className="success-desc"> atteindre le niveau 200 </div>
        </div>
      </div>
    </div>
  );
}
