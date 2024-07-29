import { Link } from "react-router-dom"

const NoEvents = (props: any) => {
    return (
        <div className="page-wrap d-flex flex-row align-items-center main mt-5 w-50 mx-auto">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 text-center">
                        <span className="display-3 d-block">{props.title}</span>
                        <div className="mb-3 mt-3 lead">There are no ongoing events at this time, keep an eye out for updates.</div>
                        <Link to="/" className="btn btn-link">
                            <button type="button" className="btn btn-dark mb-5">
                                Back to Home
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoEvents