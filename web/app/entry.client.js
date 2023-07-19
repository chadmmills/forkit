"use strict";
/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@remix-run/react");
var react_2 = require("react");
var client_1 = require("react-dom/client");
(0, react_2.startTransition)(function () {
    (0, client_1.hydrateRoot)(document, <react_2.StrictMode>
      <react_1.RemixBrowser />
    </react_2.StrictMode>);
});
