"use strict";
/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */
Object.defineProperty(exports, "__esModule", { value: true });
var node_stream_1 = require("node:stream");
var node_1 = require("@remix-run/node");
var react_1 = require("@remix-run/react");
var isbot_1 = require("isbot");
var server_1 = require("react-dom/server");
var ABORT_DELAY = 5000;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
    return (0, isbot_1.default)(request.headers.get("user-agent"))
        ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext)
        : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext);
}
exports.default = handleRequest;
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
    return new Promise(function (resolve, reject) {
        var shellRendered = false;
        var _a = (0, server_1.renderToPipeableStream)(<react_1.RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY}/>, {
            onAllReady: function () {
                shellRendered = true;
                var body = new node_stream_1.PassThrough();
                responseHeaders.set("Content-Type", "text/html");
                resolve(new node_1.Response(body, {
                    headers: responseHeaders,
                    status: responseStatusCode,
                }));
                pipe(body);
            },
            onShellError: function (error) {
                reject(error);
            },
            onError: function (error) {
                responseStatusCode = 500;
                // Log streaming rendering errors from inside the shell.  Don't log
                // errors encountered during initial shell rendering since they'll
                // reject and get logged in handleDocumentRequest.
                if (shellRendered) {
                    console.error(error);
                }
            },
        }), pipe = _a.pipe, abort = _a.abort;
        setTimeout(abort, ABORT_DELAY);
    });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
    return new Promise(function (resolve, reject) {
        var shellRendered = false;
        var _a = (0, server_1.renderToPipeableStream)(<react_1.RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY}/>, {
            onShellReady: function () {
                shellRendered = true;
                var body = new node_stream_1.PassThrough();
                responseHeaders.set("Content-Type", "text/html");
                resolve(new node_1.Response(body, {
                    headers: responseHeaders,
                    status: responseStatusCode,
                }));
                pipe(body);
            },
            onShellError: function (error) {
                reject(error);
            },
            onError: function (error) {
                responseStatusCode = 500;
                // Log streaming rendering errors from inside the shell.  Don't log
                // errors encountered during initial shell rendering since they'll
                // reject and get logged in handleDocumentRequest.
                if (shellRendered) {
                    console.error(error);
                }
            },
        }), pipe = _a.pipe, abort = _a.abort;
        setTimeout(abort, ABORT_DELAY);
    });
}
