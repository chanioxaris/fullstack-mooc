import express from "express";
import patientService from "../services/patientService";
import { toNewPatient, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientService.getAllNonSensitive());
});

router.get("/:id", (req, res) => {
    const patient = patientService.findById(String(req.params.id));

    if (!patient) {
        res.sendStatus(404);
        return;
    }

    res.send(patient);
});

router.post("/", (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);

        const data = patientService.create(newPatient);
        res.json(data);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.post("/:id/entries", (req, res) => {
    try {
        const newEntry = toNewEntry(req.body);

        const data = patientService.addEntry((String(req.params.id)), newEntry);
        if (!data) {
            res.sendStatus(404);
            return;
        }

        res.json(data);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

export default router;