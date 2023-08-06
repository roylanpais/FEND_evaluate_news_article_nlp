function isUrl(inputURL) {
    // Regular expression to match URLs
    const regex = inputURL.match(/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&/=]*)/i);

    // Check if the regex matches the inputURL
    // If it matches, it's a valid URL, so return true; otherwise, return false.
    return regex !== null;
}

export { isUrl };