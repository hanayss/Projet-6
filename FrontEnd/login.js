document.addEventListener("DOMContentLoaded", function () {
    const apiUrlLogin = "http://localhost:5678/api/users/login";

    const loginForm = document.getElementById("login");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginStatus = document.getElementById("login-status");

    console.log("loginForm =>", loginForm);
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        const data = {
            email: email,
            password: password,
        };

        console.log(data);

        fetch(apiUrlLogin, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.userId && result.token) {
                    window.location.href = "index.html";
                } else {
                    loginStatus.textContent =
                        "E-mail ou mot de passe incorrect";
                }
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la communication avec l'API : " + error
                );
            });
    });
});
