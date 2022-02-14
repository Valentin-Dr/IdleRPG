// == Import : npm
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
// == Import : local
import './style.scss';
import '../../styles/allitems.scss';
import { useEffect } from 'react';

// == Composant
const NewInventory = () => {
  const dispatch = useDispatch();
  const { inventory } = useSelector((state) => state.character);

  return (
    <div className="inv-container">
      <p>coucou</p>
    </div>
  );
};

// == Export
export default NewInventory;
