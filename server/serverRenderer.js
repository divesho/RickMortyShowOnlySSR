import App from '../src/App';
import Home from '../src/components/Home/Home';
import { ServerStyleSheets } from '@material-ui/core/styles';
import path from 'path'
import fs from 'fs'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import serialize from "serialize-javascript";
import CONFIG from './config';

const processReactComponents = (req, res, next, serverCookies, extraProp) => {

    fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return res.status(500).send('An error occurred')
        }



        const sheets = new ServerStyleSheets();

        const html = ReactDOMServer.renderToString(
            sheets.collect(
                <StaticRouter location={req.url} context={{ server: true, extraProp, serverCookies }} >
                    <App />
                </StaticRouter>
            )
        );

        const css = sheets.toString();

        return res.send(
            data.replace(
                '<div id="root"></div>',
                `<div id="root">${html}</div>
          <script>window.__initData__ = ${serialize({ extraProp, serverCookies })}</script>`
            )
                .replace(
                    '<style id="jss-server-side"></style>',
                    `<style id="jss-server-side">${css}</style>`
                )
        )
    });
}

const serverRenderer = (req, res, next) => {

    console.log('url:', req.url);

    let cookies = req.headers.cookie ? req.headers.cookie.split(';') : [];
    let serverCookie = {};
    cookies.map(cookie => {
        cookie = cookie.split('=');
        let key = cookie[0].toString().trim();
        let value = decodeURIComponent(cookie[1]);

        try {
            value = JSON.parse(value);
        } catch (e) {

        }

        serverCookie[key] = value;
    });

    if (req.url === '/' && cookies.length > 0) {

        let baseURL = CONFIG.INTERNAL_SERVER_URI;

        Home.loadInitData(serverCookie.jwtToken, baseURL)
            .then((result) => {

                processReactComponents(req, res, next, serverCookie, result);
            })
            .catch((err) => {

                console.log("server error: ", err);
                processReactComponents(req, res, next, serverCookie, err);
            });
    } else {
        processReactComponents(req, res, next, serverCookie, null);
    }
}

export default serverRenderer;