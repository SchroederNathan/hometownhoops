import { Link } from "react-router-dom"
import './NotFound.css'

const NotFound = () => {
    return (
        <div className="page-wrap d-flex flex-row align-items-center main">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 text-center">
                        <span className="display-1 d-block">404</span>
                        <div className="mb-3 lead">The page you are looking for was not found.</div>
                        <Link to="/" className="btn btn-link">
                            <button type="button" className="btn btn-dark">
                                Back to Home
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound