import React, { useEffect } from "react";
import { LOGIN_REDIRECT_WHITELISTED_DOMAIN, LOGIN_REDIRECT_WHITELISTED_TLD } from "../constants";
import parseDomain from "parse-domain";
import queryString from "query-string";
import {Link} from "react-router-dom";

declare const LOGIN_REDIRECT_DEFAULT_SITE: string;

const isWhitelisted = url => {
    const parsed = parseDomain(url);
    if (!parsed) {
        // localhost: URLs don't get parsed properly.
        return false;
    }
    const {subdomain, domain, tld} = parsed;
    return (domain === LOGIN_REDIRECT_WHITELISTED_DOMAIN && tld === LOGIN_REDIRECT_WHITELISTED_TLD);
}

export const getRedirectUrl = () => {
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

const LoggedIn = () => {
    useEffect(() => {
        window.location.href = getRedirectUrl();
    });
    return <div>You are now logged in.<br />
        <a href={getRedirectUrl()}>Continue to the next page</a> <br />
        <Link to="/logout">Log out</Link>
    </div>;
}

export default LoggedIn;