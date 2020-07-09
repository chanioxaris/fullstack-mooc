interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

export const calculateExercises = (hours: Array<number>, target: number): Result => {
    const trainingDays = hours.filter(hour => hour > 0).length;
    const average = hours.reduce((a,b) => a + b, 0)/hours.length;

    let success = false;
    if (average > target) {
        success = true;
    }

    let rating;
    let ratingDescription;
    if (average < target * 0.5) {
        rating = 1;
        ratingDescription = "you should try harder";
    } else if (average < target) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    } else {
        rating = 3;
        ratingDescription = "excellent job";
    }

    return {
        periodLength: hours.length,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};