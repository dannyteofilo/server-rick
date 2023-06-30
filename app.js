import dotenv from "dotenv";
dotenv.config();

import Server from "./app/index.js";
const server = new Server();

server.listen();