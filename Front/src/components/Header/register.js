import { useSelector, useDispatch } from "react-redux";
import { subscribeUser, setUpdateField, setModale } from  "src/actions/user";
import "./style.scss";
import background from "src/assets/ImgModal/Modale-Register.png";

export default function Register() {
  const dispatch = useDispatch();
  const { modal, mail, password } = useSelector((state) => state.user);

  const loginUser = (e) => {
    e.preventDefault();
    dispatch(subscribeUser());
  }

  const shutModal = (e) => {
    dispatch(setModale(''));
  };

  const updateField = (e) => {
    dispatch(setUpdateField(e.target.name, e.target.value));
  };
  return (
    <div className="register">
      {modal == "inscription" && (
        <div className="open-register">
          <form className="modale-register" onSubmit={loginUser} encType="multipart/form-data" >
            <div className="close-modal" onClick={shutModal}>X</div>
            <img src={background} alt="Image de fond" />
            <div className="field-wrapper">
              <input
                type="text"
                name="name"
                placeholder="Pseudo"
                onChange={updateField}
              />
            </div>
            <div className="field-wrapper mail">
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                onChange={updateField}
              />
            </div>
            <div className="field-wrapper pwd">
              <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                onChange={updateField}
              />
            </div>
            <div className="field-wrapper">
              <input
                type="password"
                name="confirm-password"
                placeholder="Confirmation du mot de passe"
                onChange={updateField}
              />
            </div>
            <div className="button-wrapper">
              <button type="submit">Valider</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
