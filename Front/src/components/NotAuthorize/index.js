import './style.scss'

function NotAuthorize() {
  return (
        <div className="errorpage-content">
        <div className="error-title">
            <h1 className="error_401">401</h1>
            <div className="background-401" /> 
        </div>
        <div className="error-subtitle">
            <h2>Veuillez vous connecter pour accéder à cette page</h2>
        </div>
        </div>
  )
}

export default NotAuthorize;
