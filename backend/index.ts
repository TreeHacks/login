const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const forceSsl = require('force-ssl-heroku');
const compression = require('compression');

const port = process.env.PORT || 9000;


// Set up the Express app
const app = express();
app.use(forceSsl);
app.use(compression());

// Use body-parser to parse HTTP request parameters
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));


// Starts the Express server, which will run locally @ localhost:9000
if (!module.parent) {
    app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
    });
}

if (process.env.NODE_ENV === "test") {
    // Don't serve files when testing
} else if (process.env.MODE === "PROD") {
    // Set up static files
    app.use("/dist", express.static('build/dist'));

    // Serves the index.html file (our basic frontend)
    app.get('*',(req, res) => {
        res.sendFile('dist/index.html', {root: __dirname});
    });
} else {
    // Dev mode
    const history = require('connect-history-api-fallback');
    const path = require('path');
    const webpack = require("webpack");
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const devConfig = require("../webpack.dev.js");

    devConfig.output.path = path.resolve('./build');
    devConfig.output.publicPath = '/';
    devConfig.entry.app.unshift('webpack-hot-middleware/client?reload=true&timeout=1000');
    devConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    devConfig.module.rules.forEach(r => {
        r.use.forEach(u => {
            if (u.options && u.options.publicPath) {
                u.options.publicPath = "/";
            }
        });
    })

    const compiler = webpack(devConfig);

    app.use(history());

    app.use(webpackDevMiddleware(compiler, {
        publicPath: devConfig.output.publicPath,
        historyApiFallback: true
    }));

    app.use(webpackHotMiddleware(compiler));

}

export default app;