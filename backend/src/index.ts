import Express, { Router } from "express";
import { userAuth } from "./auth/auth";
import cors from "cors";
import { fetchData } from "./fetch/getdata";
import { admincreatePath, userEnroll } from "./manage/manage";
const app = Express();
app.use(Express.json());
app.use(cors());
app.use("/api/auth", userAuth);
app.use("/api/admin", admincreatePath);
app.use("/api/user", userEnroll);
app.use("/api/fetch", fetchData);

app.get("/", (req, res) => {
  res.json({ msg: "Learning management system by Sushans Londhe" });
});

app.listen(8080, () => {
  console.log("server launced on port 8080 with express");
});
