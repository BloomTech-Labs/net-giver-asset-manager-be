const express = require("express");
var bodyParser = require("body-parser");
const server = express();
const Nexmo = require("nexmo");
const cors = require("cors");
const path = require("path");
// path.join(__dirname, "private.key");
const nexmo = new Nexmo({
    apiKey: process.env.apiKey,
    apiSecret: process.env.apiSecret,
    applicationId: process.env.applicationId,
    privateKey: path.join(__dirname, "jwtRS256.key")
});

server.use(cors());

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.get("/", (req, res) => {
    return res.send("GET HTTP method on user resource");
});
server.post("/users", (req, res) => {
    return res.send("POST HTTP method on user resource");
});
server.post("/send_verify_code", (req, res) => {
    let phone_number = req.body.callingCode + req.body.phoneNumber;
    console.log("27", phone_number);
    nexmo.verify.request(
        {
            number: phone_number,
            brand: "Chat app"
        },
        (err, result) => {
            console.log("34", err);
            if (err) {
                return res.status(500).json({ error: err });
            } else {
                let verifyRequestId = result.request_id;
                console.log(verifyRequestId);
                return res.send(verifyRequestId);
            }
        }
    );
});
server.post("/inbound-message", (req, res) => {
    console.log("inbound-message", req.body);
    res.status(200).end();
});
server.post("/message-status", (req, res) => {
    console.log("message-status", req.body);
    res.status(200).end();
});
server.get("/ccc", () => {
    const message = {
        content: {
            type: "text",
            text: "Welcome to Chat App"
        }
    };
    nexmo.channel.send(
        { type: "sms", number: "660844848584" },
        { type: "sms", number: "660844848584" },
        {
            content: {
                type: "text",
                text: "This is an SMS sent from the Messages API"
            }
        },
        (err, data) => {
            console.log(err);
        }
    );
});
server.put("/check_verify_code", (req, res) => {
    //   console.log(req.body);
    let phone_number = req.body.callingCode + req.body.phoneNumber;
    let verifyRequestId = req.body.verfication_id;
    let code = req.body.code;
    console.log(phone_number);
    nexmo.verify.check(
        {
            request_id: verifyRequestId,
            code: code
        },
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            } else {
                const message = {
                    content: {
                        type: "text",
                        text: "Welcome to Chat App"
                    }
                };
                nexmo.channel.send(
                    { type: "sms", number: phone_number },
                    { type: "sms", number: "Chat App" },
                    message,
                    (err, data) => {
                        console.log("85", err);
                    },
                    { useBasicAuth: true }
                );
                return res.send(result);
            }
        }
    );
});

module.exports = server;
