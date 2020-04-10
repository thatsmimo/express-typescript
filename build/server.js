"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const controllers_1 = __importDefault(require("./controllers"));
const app = express_1.default();
/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
// Security
if (process.env.NODE_ENV === "production") {
    app.use(helmet_1.default());
}
app.use("/v1", controllers_1.default);
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});
// Print API errors
app.use((err, req, res, next) => {
    // logger.error(err.message, err);
    return res.status(400).json({
        error: err.message,
    });
});
/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/
const viewsDir = path_1.default.join(__dirname, "views");
app.set("views", viewsDir);
const staticDir = path_1.default.join(__dirname, "public");
app.use(express_1.default.static(staticDir));
const port = 8080; // default port to listen
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map