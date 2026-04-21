// ---------------------------------------------
// PPL WORKOUT GENERATOR (Adaptive)
// ---------------------------------------------

export function generatePPLWorkout(sex, strengthProfile) {

    // ---------------------------------------------
    // 1RM values from strength questionnaire
    // ---------------------------------------------
    const bench1RM = strengthProfile.bench1RM;
    const squat1RM = strengthProfile.squat1RM;
    const dead1RM = strengthProfile.dead1RM;

    // ---------------------------------------------
    // Load calculator (percentage of 1RM)
    // ---------------------------------------------
    function load(percent, oneRM) {
        return Math.round(oneRM * percent);
    }

    // ---------------------------------------------
    // SEX-BASED EMPHASIS
    // ---------------------------------------------
    const isFemale = sex === "female";

    // Female: more glutes/legs, higher volume tolerance
    // Male: more chest/arms, slightly lower leg volume

    const pushVolume = isFemale ? 3 : 4;
    const pullVolume = isFemale ? 3 : 4;
    const legVolume  = isFemale ? 5 : 4;

    // ---------------------------------------------
    // EXERCISE DATABASE
    // ---------------------------------------------
    const PUSH = [
        { name: "Bench Press", load: load(0.70, bench1RM), reps: 8, sets: pushVolume },
        { name: "Incline Dumbbell Press", load: "RPE 7", reps: 10, sets: pushVolume },
        { name: "Shoulder Press", load: "RPE 7", reps: 8, sets: pushVolume },
        { name: "Lateral Raises", load: "Light", reps: 15, sets: pushVolume + 1 },
        { name: "Tricep Pushdowns", load: "Moderate", reps: 12, sets: pushVolume }
    ];

    const PULL = [
        { name: "Barbell Row", load: load(0.65, bench1RM), reps: 8, sets: pullVolume },
        { name: "Lat Pulldown", load: "RPE 7", reps: 10, sets: pullVolume },
        { name: "Seated Cable Row", load: "RPE 7", reps: 10, sets: pullVolume },
        { name: "Face Pulls", load: "Light", reps: 15, sets: pullVolume + 1 },
        { name: "Bicep Curls", load: "Moderate", reps: 12, sets: pullVolume }
    ];

    const LEGS = isFemale
        ? [
            { name: "Back Squat", load: load(0.70, squat1RM), reps: 8, sets: legVolume },
            { name: "Hip Thrust", load: load(0.75, dead1RM), reps: 10, sets: legVolume + 1 },
            { name: "Romanian Deadlift", load: load(0.60, dead1RM), reps: 10, sets: legVolume },
            { name: "Bulgarian Split Squat", load: "Bodyweight/Light", reps: 12, sets: legVolume },
            { name: "Glute Kickbacks", load: "Light", reps: 15, sets: legVolume + 1 }
        ]
        : [
            { name: "Back Squat", load: load(0.75, squat1RM), reps: 6, sets: legVolume },
            { name: "Deadlift", load: load(0.70, dead1RM), reps: 5, sets: legVolume - 1 },
            { name: "Leg Press", load: "Heavy", reps: 10, sets: legVolume },
            { name: "Hamstring Curls", load: "Moderate", reps: 12, sets: legVolume },
            { name: "Calf Raises", load: "Moderate", reps: 15, sets: legVolume }
        ];

    // ---------------------------------------------
    // RETURN FULL PPL PROGRAM
    // ---------------------------------------------
    return {
        push: PUSH,
        pull: PULL,
        legs: LEGS
    };
}
