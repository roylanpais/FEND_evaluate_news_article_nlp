import { handleSubmit } from "../client/js/formHandler";

// Mock the DOM elements and functions for testing
document.body.innerHTML = `
    <form id="form">
        <input type="text" id="url" value="" />
        <button type="submit" id="submitBtn">Submit</button>
    </form>
    <div id="results"></div>
    <div id="polarity"></div>
    <div id="agreement"></div>
    <div id="subjectivity"></div>
    <div id="confidence"></div>
    <div id="irony"></div>
    <div id="text"></div>
`;

// Mock the Client object
const Client = {
    isUrl: jest.fn((input) => input.startsWith("http")),
};

describe("Testing the submit functionality", () => {
    test("handleSubmit function is defined", () => {
        expect(handleSubmit).toBeDefined();
    });

    test("handleSubmit calls Client.isUrl function with the correct argument", () => {
        const inputURL = "https://example.com";
        document.getElementById("url").value = inputURL;

        handleSubmit(new Event("submit"));

        expect(Client.isUrl).toHaveBeenCalledWith(inputURL);
    });

    test("handleSubmit updates the UI with error message for invalid URL", () => {
        const invalidURL = "invalid-url";
        document.getElementById("url").value = invalidURL;

        handleSubmit(new Event("submit"));

        expect(document.getElementById("results").innerHTML).toBe("Please insert a valid URL.");
    });

    test("handleSubmit calls postData and updates UI with valid data", async () => {
        const validURL = "https://example.com";
        document.getElementById("url").value = validURL;

        // Mock the postData function and its resolved value
        const postDataMock = jest.fn(() => Promise.resolve({ /* mock response data */ }));
        jest.mock("../client/js/formHandler", () => ({
            postData: postDataMock,
        }));

        await handleSubmit(new Event("submit"));

        expect(postDataMock).toHaveBeenCalledWith("http://localhost:8081/api", { url: validURL });
        expect(document.getElementById("polarity").innerHTML).toContain("Polarity:");
        expect(document.getElementById("agreement").innerHTML).toContain("Agreement:");
        expect(document.getElementById("subjectivity").innerHTML).toContain("Subjectivity:");
        expect(document.getElementById("confidence").innerHTML).toContain("Confidence:");
        expect(document.getElementById("irony").innerHTML).toContain("Irony:");
        expect(document.getElementById("text").innerHTML).toContain("Text:");
    });

    test("handleSubmit resets UI for null data from postData", async () => {
        const validURL = "https://example.com";
        document.getElementById("url").value = validURL;

        // Mock the postData function and its resolved value as null
        const postDataMock = jest.fn(() => Promise.resolve(null));
        jest.mock("../client/js/formHandler", () => ({
            postData: postDataMock,
        }));

        await handleSubmit(new Event("submit"));

        expect(postDataMock).toHaveBeenCalledWith("http://localhost:8081/api", { url: validURL });
        expect(document.getElementById("polarity").innerHTML).toBe("");
        expect(document.getElementById("agreement").innerHTML).toBe("");
        expect(document.getElementById("subjectivity").innerHTML).toBe("");
        expect(document.getElementById("confidence").innerHTML).toBe("");
        expect(document.getElementById("irony").innerHTML).toBe("");
        expect(document.getElementById("text").innerHTML).toBe("");
    });

    test("handleSubmit logs an error for postData rejection", async () => {
        const validURL = "https://example.com";
        document.getElementById("url").value = validURL;

        // Mock the postData function and its rejected value
        const error = new Error("Failed to fetch data");
        const postDataMock = jest.fn(() => Promise.reject(error));
        jest.mock("../client/js/formHandler", () => ({
            postData: postDataMock,
        }));

        const consoleErrorSpy = jest.spyOn(console, "error");

        await handleSubmit(new Event("submit"));

        expect(postDataMock).toHaveBeenCalledWith("http://localhost:8081/api", { url: validURL });
        expect(consoleErrorSpy).toHaveBeenCalledWith("Error while handling form submission:", error);
    });
});
