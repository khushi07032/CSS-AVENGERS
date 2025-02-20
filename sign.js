// Handle Sliding Effect for Sign In / Sign Up
document.getElementById("signUp").addEventListener('click', () => {
    document.getElementById("container").classList.add("right-panel-active");
});

document.getElementById("signIn").addEventListener('click', () => {
    document.getElementById("container").classList.remove("right-panel-active");
});

// Load existing users from localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];

// Function to handle Sign Up
function signup() {
    let name = document.getElementById("signupName").value;
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;
    
    if (name && email && password) {
        let existingUser = users.find(user => user.email === email);
        if (existingUser) {
            Swal.fire({
                icon: "error",
                title: "User Already Exists!",
                text: "Try logging in instead.",
                confirmButtonColor: "#FF4B2B",
            });
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        Swal.fire({
            icon: "success",
            title: "Account Created!",
            text: "Redirecting to profile...",
            confirmButtonColor: "#FF4B2B",
            timer: 2000,
            showConfirmButton: false
        });

        setTimeout(() => {
            window.location.href = "profile.html"; // Redirect to profile page
        }, 2000);
    } else {
        Swal.fire({
            icon: "warning",
            title: "Incomplete Fields",
            text: "Please fill all the fields.",
            confirmButtonColor: "#FF4B2B",
        });
    }
}

// Function to handle Sign In
function signin() {
    let email = document.getElementById("signinEmail").value;
    let password = document.getElementById("signinPassword").value;

    let user = users.find(user => user.email === email && user.password === password);
    if (user) {
        localStorage.setItem("loggedInUser", email); // Store the logged-in user email
        Swal.fire({
            icon: "success",
            title: `Welcome back, ${user.name}!`,
            confirmButtonColor: "#FF4B2B",
        }).then(() => {
            window.location.href = "profile.html"; // Redirect to profile page
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Invalid Credentials",
            text: "Incorrect email or password.",
            confirmButtonColor: "#FF4B2B",
        });
    }
}


// Google Sign-In Integration
function handleCredentialResponse(response) {
    const data = parseJwt(response.credential);
    Swal.fire({
        icon: "success",
        title: `Welcome, ${data.name}!`,
        text: "Redirecting to profile...",
        confirmButtonColor: "#FF4B2B",
        timer: 2000,
        showConfirmButton: false
    });

    setTimeout(() => {
        window.location.href = "profile.html"; // Redirect to profile page
    }, 2000);
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

    google.accounts.id.renderButton(
        document.getElementById("googleSignUp"),
        { theme: "outline", size: "large" }
    );

    google.accounts.id.renderButton(
        document.getElementById("googleSignIn"),
        { theme: "outline", size: "large" }
    );
};
