"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("./auth/auth");
const cors_1 = __importDefault(require("cors"));
const getdata_1 = require("./fetch/getdata");
const manage_1 = require("./manage/manage");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/auth", auth_1.userAuth);
app.use("/api/admin", manage_1.admincreatePath);
app.use("/api/user", manage_1.userEnroll);
app.use("/api/fetch", getdata_1.fetchData);
app.get("/", (req, res) => {
    res.json({ msg: "Learning management system by Sushans Londhe" });
});
app.listen(8080, () => {
    console.log("server launced on port 8080 with express");
});
