# Login

Treehacks login used for SSO.

## Usage

Login - Go to https://login.treehacks.com

Login with redirect - Go to https://login.treehacks.com/?redirect=https://mentor.treehacks.com

Logout - Go to https://login.treehacks.com/logout

Verification - Go to https://login.treehacks.com/verify?username=910e6571-c11e-4c83-9e27-cf220bdd6e41&code=315131

## Environment variables

This whitelist includes all URLs that the user can be redirected to after the login/logout process completes, and is there for security reasons. To set up the whitelist, use a comma-separated list of addresses in the LOGIN_REDIRECT_WHITELIST variable. To match a domain, enter that domain. To match any subdomain, use a wildcard -- for example, `*.treehacks.com`. We only support wildcard matching on a direct subdomain (i.e., we support `*.treehacks.com` but not `*.dev.treehacks.com`).

## Local setup
1. Download the appropriate `.env` file with the proper environment variables set, and put it in your working directory.
1. Run `npm install`
1. Run `npm start`
1. Open http://localhost:9000 in your browser.

## Running tests
Application will deploy to Heroku only if tests pass.
Run `npm test` to run tests.

Run `npm test -- -u` to update snapshots.
