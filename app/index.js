
import express from "express";
import cors from "cors";
import authroutes from "./routes/auth.routes.js";
import searchroutes from "./routes/search.routes.js";
import { dbConnection } from "./database/config.js";


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = "/api/auth";
    this.searchPath = "/api/search"

    //Connect to database
    this.connectDB();
    // midlewares
    this.middlewares();
    // my routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // read body
    this.app.use(express.json());
    // public directory
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, authroutes);
    this.app.use(this.searchPath, searchroutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on...", this.port);
    });
  }
}

export default Server;