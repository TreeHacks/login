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
        // todo: hacky fix. we should redirect only when we we know that logout() has finished.
        //setTimeout(() => {
         //   window.location.href = //"login.treehacks.com" //getRedirectUrl();
        //}, 500);
    });
    console.log(getRedirectUrl());
    return <div>You are now logged out.<br />
        <a href={getRedirectUrl()}>Continue to the next page</a> <br />
    </div>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
