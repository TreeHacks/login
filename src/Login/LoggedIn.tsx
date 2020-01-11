import React, { useEffect } from "react";
import { logout } from "../store/auth/actions";
import { connect } from "react-redux";
import { LOGIN_REDIRECT_WHITELISTED_DOMAIN, LOGIN_REDIRECT_WHITELISTED_TLD } from "../constants";
import parseDomain from "parse-domain";
import queryString from "query-string";

declare const LOGIN_REDIRECT_DEFAULT_SITE: string;

const mapStateToProps = state => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    logout: () => dispatch(logout())
});

const isWhitelisted = url => {
    const {subdomain, domain, tld} = parseDomain(url);
    return (domain === LOGIN_REDIRECT_WHITELISTED_DOMAIN && tld === LOGIN_REDIRECT_WHITELISTED_TLD);
}

const getRedirectUrl = () => {
    let url = null;
    let search = queryString.parse(window.location.search);
    if (search && search.redirect) {
        // Query string
        url = search.redirect;
    } else if (sessionStorage.getItem("redirect")) {
        // When we redirect back from SAML, we keep the redirect in
        // sessionStorage as it will no longer be in the query string.
        url = sessionStorage.getItem("redirect");
    } else {
        url = LOGIN_REDIRECT_DEFAULT_SITE;
    }
    return isWhitelisted(url) ? url : LOGIN_REDIRECT_DEFAULT_SITE;
}

const LoggedIn = ({ logout }) => {
    useEffect(() => {
        window.location.href = getRedirectUrl();
    });
    return <div>You are now logged in.<br />
        <a href={getRedirectUrl()}>Continue to the next page</a> <br />
        <a href="#" onClick={(e) => {e.preventDefault(); logout()}}>Log out</a>
    </div>;
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn);