/* eslint-disable no-console */
import "@/middlewares/type";
import app from "@/app";
import env from "@/env";

const port = env.PORT;

const server = app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
});

process.on("SIGTERM", () => {
    console.log("SIGTERM signal received: closing HTTP server");
    server.close(() => {
        console.log("HTTP server closed");
    });
});
