import express from "express";

const app = express();

app.use((req, res, next) => {
  req.header("Referrer-Policy", "no-referrer-when-downgrade");

  next();
});

export default app;
