function formatScoreTag(scoreTag) {
    switch (scoreTag) {
        case "P+":
            return "very positive";
        case "P":
            return "positive";
        case "NEU":
            return "neutral";
        case "N":
            return "negative";
        case "N+":
            return "very negative";
        case "NONE":
            return "no sentiment";
        default:
            return "N/A";
    }
}

export {formatScoreTag}