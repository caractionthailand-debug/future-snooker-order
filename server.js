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
                    Authorization:
                        `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
                }
            }
        );

        console.log("ส่งเข้า LINE แล้ว");

        res.json({
            success: true
        });

    } catch (error) {

        console.log(
            error.response?.data || error.message
        );

        res.status(500).json({
            success: false
        });

    }

});