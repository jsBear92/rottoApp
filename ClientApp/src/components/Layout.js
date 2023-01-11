import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">Rotto</Link>
                    </div>
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to="/todo">Todo</Link>
                        </li>
                        <li>
                            <Link to="/map">Map</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <Outlet />
        </>
    )
}

export default Layout;