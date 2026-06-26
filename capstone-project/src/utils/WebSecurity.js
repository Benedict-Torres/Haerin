// Clears sensitive data when the user leaves or closes the page
// Used to prevent generated passwords and checker inputs from staying in memory
export function clearSensitiveData() {
    window.addEventListener("pagehide", () => {
        sessionStorage.clear();

        // Clear DOM fields directly
        const generated = document.getElementById("generatedPassword");
        const checker   = document.getElementById("checkPassword");
        if (generated) generated.textContent = "";
        if (checker)   checker.value = "";
    });
}

// Generates a cryptographically secure random number
// Used for password generation instead of Math.random()
// Returns a random number from 0 up to (max - 1)
export function secureRandom(max){
const arr= new Uint32Array(1)
crypto.getRandomValues(arr)
return arr[0]%max

}