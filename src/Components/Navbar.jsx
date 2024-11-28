import { Link } from "react-router-dom";
import { RefreshCcw } from "lucide-react";

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
                <div className="container-fluid">
                    <Link className="ms-2 navbar-brand" to="/home">
                        <RefreshCcw className="me-3" />
                        EZconvert
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
