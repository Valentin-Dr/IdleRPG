import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Craft from "src/components/Craft";
import Fight from "src/components/Fight";
import NotFound from "src/components/NotFound";
import NotAuthorize from 'src/components/NotAuthorize'
import Home from "src/components/Home";
import Menu from "../Menu";
import Header from "../Header";
import Shop from "../Shop";
import Fishing from "../Fishing";
import Mining from "../Mining";


import "./style.scss";
import Inventory from "../Character";
import BtnDark from "../BtnDark/BtnDark";
import { checkUser } from 'src/actions/user';


// == Composant
const App = () => {
  const { logged, darkMode } = useSelector((state) => (state.user));
  // const audio = new Audio('https://api.soundcloud.com/tracks/1018153165');
  // audio.volume = 0.10;
  // audio.play();
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(checkUser());
  }, []);

  return (
    <div className={darkMode ? "app dark" : "app"}>

      <BtnDark/>
      
      
      <Header/>
      <Menu />
      <div className="background-bg"></div>
      {/* <h1>Jeu IDLE</h1> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        { logged && 
        (
        <>
          <Route path="/shop" element={<Shop />} />
          <Route exact path="/inventory" element={<Inventory />} />
          <Route exact path="/fighting" element={<Fight />} />
          <Route path="/craft" element={<Craft />} />
          <Route path="/jobs/mining" element={<Mining job="mining" />} />
          <Route path="/jobs/fishing" element={<Fishing job="fishing" />} />
        </>
        )
        }
        { !logged &&
         (
          <>
            <Route path="/shop" element={<NotAuthorize />} />
            <Route exact path="/inventory" element={<NotAuthorize />} />
            <Route exact path="/fighting" element={<NotAuthorize />} />
            <Route path="/craft" element={<NotAuthorize />} />
            <Route path="/jobs/mining" element={<NotAuthorize job="mining" />} />
            <Route path="/jobs/fishing" element={<NotAuthorize job="fishing" />} />
          </>
          )
        }
        <Route path="*" element={<NotFound />} />

      </Routes>
    </div>
  );
}
// == Export
export default App;
