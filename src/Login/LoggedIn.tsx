import React, { useEffect } from "react";
import parseDomain from "parse-domain";
import queryString from "query-string";
import {Link} from "react-router-dom";

declare const LOGIN_REDIRECT_DEFAULT_SITE: string;
declare const LOGIN_REDIRECT_WHITELIST: string;

export const isWhitelisted = (url, whitelist) => {
    // TODO: force HTTPS
    const opts = { customTlds: /localhost/ };
    for (let wlUrl of whitelist) {
        const parsedWlUrl = parseDomain(wlUrl, opts);
        const parsed = parseDomain(url, opts);
        if (!parsed) {
            return false;
        }
        if (wlUrl === "*") return true;
        if (parsedWlUrl.tld === "*") return true;
        if (parsedWlUrl.tld !== parsed.tld) continue;
        if (parsedWlUrl.domain === "*") return true;
        if (parsedWlUrl.domain !== parsed.domain) continue;
        if (parsedWlUrl.subdomain === "*") return true;
        if (parsedWlUrl.subdomain !== parsed.subdomain) continue;
        return true;
    }
    return false;
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
    url = isWhitelisted(url, (LOGIN_REDIRECT_WHITELIST || "").split(",")) ? url : LOGIN_REDIRECT_DEFAULT_SITE;
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
        // Logging in
        const query = queryString.stringify({
            jwt: localStorage.getItem("jwt")
        });
        return `${url}#${query}`;
    } else {
        // Logged out
        return url;
    }
}

const LoggedIn = () => {
    useEffect(() => {
        window.location.href = getRedirectUrl();
    });
    return null;
}

export default LoggedIn;