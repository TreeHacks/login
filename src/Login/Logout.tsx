import React, { useEffect } from "react";
import { logout } from "../store/auth/actions";
import { connect } from "react-redux";
import { getRedirectUrl } from "./LoggedIn";

const mapStateToProps = state => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    logout: () => dispatch(logout())
});

const Logout = ({ logout }) => {
    useEffect(() => {
        logout();
        // todo: automatically redirect? how do we know when logout() is finished?
    });
    return <div>You are now logged out.<br />
        <a href={getRedirectUrl()}>Continue to the next page</a> <br />
    </div>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);