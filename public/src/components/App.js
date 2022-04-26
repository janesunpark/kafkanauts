"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_query_1 = require("react-query");
const Dashboard_1 = __importDefault(require("./Dashboard"));
const Home_1 = __importDefault(require("./Home"));
require("./style.scss");
const queryClient = new react_query_1.QueryClient();
function App() {
    return (react_1.default.createElement(react_query_1.QueryClientProvider, { client: queryClient },
        react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(react_router_dom_1.Routes, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(Home_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/dashboard", element: react_1.default.createElement(Dashboard_1.default, null) })))));
}
exports.default = App;
