import { isUrl } from "../client/js/urlChecker";

describe("check if URL is valid", () => {
    
    test(`URL with "www." and ".com" format returns true`, () => {
        expect(isUrl("www.url1.com")).toBe(true);
    });

    test(`URL with "https://" prefix returns true`, () => {
        expect(isUrl("https://www.url2.com")).toBe(true);
    });

    test(`URL without prefix returns true`, () => {
        expect(isUrl("url3.com")).toBe(true);
    });

    test(`URL without prefix and suffix returns false`, () => {
        expect(isUrl("url4com")).toBe(false);
    });

    test(`URL with spaces in the name returns false`, () => {
        expect(isUrl("www.u r l 5.com")).toBe(false);
    });
});
