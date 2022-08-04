import { RequestHandler } from "express";
import { Schema } from "joi";

export const joiHandler = (schema: Schema) => {
  const handlerFn: RequestHandler = (req, res, next) => {
    schema
      .validateAsync(req.body)
      .then((validBody) => {
        req.body = validBody;
        next();
      })
      .catch((err) => {
        const message = err.details.map((d) => d.message).join(",");
        res.status(422).json({ error: message });
      });
  };
  return handlerFn;
};
