import { response } from "express";

export const register = async (req, res = response) => {
    res.status(200).send({ message: 'ok' })
};
