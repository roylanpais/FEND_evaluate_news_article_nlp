// Import the formatScoreTag function from the "./formatScoreTag" module
import { formatScoreTag } from "./formatScoreTag";

// Function to handle form submission
async function handleSubmit(event) {
    event.preventDefault();

    // Get the text entered into the form field
    const formText = document.getElementById("url").value;

    // Check if the entered text is a valid URL using the Client.isUrl() function
    const isUrl = Client.isUrl(formText);
    console.log("Form Submitted");

    try {
        // Check if the text is a valid URL and update the UI accordingly
        if (isUrl) {
            const data = await postData("http://localhost:8081/api", { url: formText });
            // Once data is fetched, update the UI with the received data
            updateUI(data);
        } else {
            // If the text is not a valid URL, reset the UI and display an error message
            resetUI();
            document.getElementById("results").innerHTML = "Please insert a valid URL.";
        }
    } catch (error) {
        console.log("Error while handling form submission:", error);
    }
}

// Function to post data to the server
async function postData(url = "", data = {}) {
    try {
        // Fetch data from the server using POST method and JSON data
        const res = await fetch(url, {
            method: "POST",
            credentials: "same-origin",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        // Check if the server response is successful
        if (!res.ok) {
            throw new Error(`Failed to fetch data from ${url}. Status: ${res.status}`);
        }

        // Parse the response data as JSON and return it
        return await res.json();
    } catch (error) {
        // Handle errors while fetching data
        console.log("Error while fetching data:", error);
        throw error;
    }
}
// Function to update the UI with the received data
function updateUI(data) {
    try {
        // Reset the DOM elements
        resetUI();

        // Update the DOM with the received data
        document.getElementById("polarity").innerHTML = `Polarity: ${formatScoreTag(data.score_tag)}`;
        document.getElementById("agreement").innerHTML = `Agreement: ${data.agreement}`;
        document.getElementById("subjectivity").innerHTML = `Subjectivity: ${data.subjectivity}`;
        document.getElementById("confidence").innerHTML = `Confidence: ${data.confidence}`;
        document.getElementById("irony").innerHTML = `Irony: ${data.irony}`;

        // Concatenate all the text from the sentence_list array with line breaks
        const allText = data.sentence_list.map((sentence) => sentence.text).join("\n");
        document.getElementById("text").innerHTML = `Text:\n${allText}`;
    } catch (error) {
        // Handle errors while updating the UI
        console.log("Error while updating UI:", error);
    }
}


// Function to reset the UI
function resetUI() {
    // Reset the innerHTML of various DOM elements to clear the UI
    const elements = ["results", "polarity", "agreement", "subjectivity", "confidence", "irony", "text"];
    elements.forEach((element) => {
        document.getElementById(element).innerHTML = "";
    });
}

// Export the handleSubmit function to use it in other files
export { handleSubmit };