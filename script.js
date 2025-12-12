const button = document.querySelector("button");
const passwordInput = document.getElementById("passwordInput");
const analysisBox = document.getElementById("analysis");

function generateSuggestions(password) {
    const suggestions = [];

    
    const base = password.replace(/[^a-zA-Z]/g, "") || "Secure";

    suggestions.push(base + "!" + Math.floor(Math.random() * 1000));
    suggestions.push(base + "@" + Math.floor(Math.random() * 10000));
    suggestions.push("My" + base + "Password#" + Math.floor(Math.random() * 100));

    return suggestions;
}



button.addEventListener("click", function () {
    const password = passwordInput.value;

    if (password.length === 0) {
        alert("Please enter a password first.");
        return;
    }

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

   
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (hasUppercase) score++;
    if (hasLowercase) score++;
    if (hasNumber) score++;
    if (hasSymbol) score++;

 
    const maxScore = 6;
    const strengthPercent = Math.round((score / maxScore) * 100);
    const suggestions = generateSuggestions(password);

    analysisBox.style.display = "block";

    let suggestionsHTML = "";
    if (strengthPercent <=50) 
    {
        message = "This password is very easy to guess.";
        const suggestions = generateSuggestions(password);
        
        suggestionsHTML = `
        <p><strong>Safer password examples:</strong></p>
        <p>${suggestions[0]}</p>
        <p>${suggestions[1]}</p>
        <p>${suggestions[2]}</p>
    `;
    } 


    if (strengthPercent >= 80) {
        message = "This password is strong and resistant to common attacks.";
    } else if (strengthPercent >= 50) {
        message = "This password is moderately strong but could be improved.";
    }

    analysisBox.innerHTML = `
        <h2>Result</h2>

        <div class="analysis-content">
            <p><strong>Password Strength:</strong> ${strengthPercent}%</p>

            <p><strong>Length:</strong> ${password.length} characters</p>
            <p><strong>Uppercase letters:</strong> ${hasUppercase ? "Yes" : "No"}</p>
            <p><strong>Lowercase letters:</strong> ${hasLowercase ? "Yes" : "No"}</p>
            <p><strong>Numbers:</strong> ${hasNumber ? "Yes" : "No"}</p>
            <p><strong>Symbols:</strong> ${hasSymbol ? "Yes" : "No"}</p>

            <p>${message}</p>

    

            ${suggestionsHTML}
        </div>
    `;
});

