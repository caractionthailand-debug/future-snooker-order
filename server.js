const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/menu.html", (req, res) => {
    res.sendFile(__dirname + "/menu.html");
});

app.get("/admin.html", (req, res) => {
    res.sendFile(__dirname + "/admin.html");
});

app.get("/admin-menu.html", (req, res) => {
    res.sendFile(__dirname + "/admin-menu.html");
});

app.post("/webhook", (req, res) => {
    console.log("LINE Webhook ทำงาน");
    console.log(JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

app.post("/send-line", async (req, res) => {
    try {
        const { message } = req.body;

        await axios.post(
            "https://api.line.me/v2/bot/message/push",
            {
                to: process.env.LINE_GROUP_ID,
                messages: [
                    {
                        type: "text",
                        text: message
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
                }
            }
        );

        console.log("ส่งเข้า LINE แล้ว");
        res.json({ success: true });

    } catch (error) {
        console.log(error.response?.data || error.message);
        res.status(500).json({ success: false });
    }
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});