function cleanWord(word) {
    //remove special characters
    let cleaned = word.replace(/[\W_]+/g, "")

    //capitalizes
    return cleaned[0].toUpperCase() + cleaned.slice(1).toLowerCase();
}
