"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.links = void 0;
var css_bundle_1 = require("@remix-run/css-bundle");
var react_1 = require("@remix-run/react");
var links = function () { return __spreadArray([], (css_bundle_1.cssBundleHref ? [{ rel: "stylesheet", href: css_bundle_1.cssBundleHref }] : []), true); };
exports.links = links;
function App() {
    return (<html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <react_1.Meta />
        <react_1.Links />
      </head>
      <body>
        <react_1.Outlet />
        <react_1.ScrollRestoration />
        <react_1.Scripts />
        <react_1.LiveReload />
      </body>
    </html>);
}
exports.default = App;
