# Login

Treehacks login used for SSO.

## Usage

Go to https://login.treehacks.com

Go to https://login.treehacks.com/?redirect=https://mentor.treehacks.com

Go to https://login.treehacks.com/logout

## Local setup
1. Download the appropriate `.env` file with the proper environment variables set, and put it in your working directory.
1. Run `npm install`
1. Run `npm start`
1. Open http://localhost:9000 in your browser.

## Running tests
Application will deploy to Heroku only if tests pass.
Run `npm test` to run tests.

Run `npm test -- -u` to update snapshots.
