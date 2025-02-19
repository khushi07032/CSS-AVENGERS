// Handle Sliding Effect for Sign In / Sign Up
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// Google Sign-In Integration
function handleCredentialResponse(response) {
    const data = parseJwt(response.credential);
    console.log("User Data:", data);

    // Display user info after login
    alert(`Welcome ${data.name}! You are signed in with Google.`);
}

// Decode JWT Token
function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
}

// Load Google Sign-In
window.onload = function () {
    google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID",
        callback: handleCredentialResponse
    });

    // Render Google Sign-In buttons
    google.accounts.id.renderButton(
        document.getElementById("googleSignUp"),
        { theme: "outline", size: "large" }
    );

    google.accounts.id.renderButton(
        document.getElementById("googleSignIn"),
        { theme: "outline", size: "large" }
    );
};
