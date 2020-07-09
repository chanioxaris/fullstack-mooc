import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hell Full Stack");
});

app.get("/bmi", (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || height <= 0 || isNaN(weight) || weight <= 0) {
        res.statusCode = 400;
        res.json({
            error: "malformed parameters"
        });

        return;
    }

    res.json({
        height: height,
        weight: weight,
        bmi: calculateBmi(height, weight)
    });
});

app.post("/exercises", (req, res) => {
    const target: number = req.body.target;
    const dailyExercisesBody = req.body.daily_exercises;

    if (target === undefined || dailyExercisesBody === undefined) {
        res.statusCode = 400;
        res.json({
            error: "parameters missing"
        });
        return;
    }
    if (isNaN(target) || target <= 0) {
        res.statusCode = 400;
        res.json({
            error: "malformed parameters"
        });
        return;
    }
    if (dailyExercisesBody.length < 7) {
        res.statusCode = 400;
        res.json({
            error: "malformed parameters"
        });
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dailyExercises = dailyExercisesBody.map((exec: any) => {
        if (isNaN(Number(exec))) {
            res.statusCode = 400;
            res.json({
                error: "malformed parameters"
            });
            return;
        }

        return Number(exec);
    });

    res.json(calculateExercises(dailyExercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});