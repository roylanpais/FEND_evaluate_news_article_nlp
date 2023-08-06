import { formatScoreTag } from "../client/js/formatScoreTag";

describe("Score Tag is formatted correctly", () => {

    test(`Score Tag "P+" becomes "very positive"`, () => {
        expect(formatScoreTag("P+")).toBe("very positive");
    });

    test(`Score Tag "P" becomes "positive"`, () => {
        expect(formatScoreTag("P")).toBe("positive");
    });

    test(`Score Tag "NEU" becomes "neutral"`, () => {
        expect(formatScoreTag("NEU")).toBe("neutral");
    });

    test(`Score Tag "N" becomes "negative"`, () => {
        expect(formatScoreTag("N")).toBe("negative");
    });

    test(`Score Tag "N+" becomes "very negative"`, () => {
        expect(formatScoreTag("N+")).toBe("very negative");
    });

    test(`Score Tag "NONE" becomes "no sentiment"`, () => {
        expect(formatScoreTag("NONE")).toBe("no sentiment");
    });

    test(`No Score Tag becomes "N/A"`, () => {
        expect(formatScoreTag(null)).toBe("N/A");
    });
});
