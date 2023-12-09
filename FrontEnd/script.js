document.addEventListener("DOMContentLoaded", function () {
    const apiUrlWorks = "http://localhost:5678/api/works";
    const apiUrlCategories = "http://localhost:5678/api/categories";

    const hideBannerEdition = document.querySelector(".edition-banner");
    const loginNav = document.querySelector("nav li.login");
    const logoutNav = document.querySelector("nav li.logout");
    const hideModifier = document.getElementById("open-modal");
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
        loginNav.style.display = "none";
        logoutNav.style.display = "flex";
        hideBannerEdition.style.display = "flex";
        hideModifier.style.display = "flex";

        logoutNav.addEventListener("click", function () {
            const sectionFilters = document.getElementById("myFilters");
            sectionFilters.style.display = "flex";
            localStorage.removeItem("authToken");
            loginNav.style.display = "flex";
            logoutNav.style.display = "none";
            hideBannerEdition.style.display = "none";
            hideModifier.style.display = "none";
        });
    } else {
        loginNav.style.display = "flex";
        logoutNav.style.display = "none";
        hideBannerEdition.style.display = "none";
        hideModifier.style.display = "none";
    }

    // Effectuer une requête Fetch GET
    fetch(apiUrlCategories)
        .then((response) => {
            if (!response.ok) {
                throw new Error("La requête a échoué");
            }
            return response.json(); // Parse la réponse en JSON
        })
        .then((dataCategories) => {
            const sectionFilters = document.createElement("section");
            if (authToken) {
                sectionFilters.style.display = "none";
            }
            sectionFilters.setAttribute("id", "myFilters");
            const buttonAll = document.createElement("button");
            buttonAll.textContent = "Tous";
            buttonAll.classList.add("active");
            buttonAll.addEventListener("click", function () {
                const allFigure = document.querySelectorAll(
                    "#portfolio .gallery figure"
                );
                allFigure.forEach((figure) => {
                    figure.style.display = "block";
                });
                const buttons = sectionFilters.querySelectorAll("button");
                buttons.forEach((button) => {
                    button.classList.remove("active");
                });
                buttonAll.classList.add("active");
            });
            buttonAll.classList.add("active");

            sectionFilters.appendChild(buttonAll);
            dataCategories.forEach((item) => {
                const button = document.createElement("button");
                button.textContent = item.name;

                button.addEventListener("click", function () {
                    const allFigure = document.querySelectorAll(
                        "#portfolio .gallery figure"
                    );
                    allFigure.forEach((figure) => {
                        if (figure.dataset.itemCategoryid === String(item.id)) {
                            figure.style.display = "block";
                        } else {
                            figure.style.display = "none";
                        }
                    });
                    const buttons = sectionFilters.querySelectorAll("button");
                    buttons.forEach((button) => {
                        button.classList.remove("active");
                    });
                    button.classList.add("active");
                });

                sectionFilters.appendChild(button);
            });

            const sectionPortfolio = document.getElementById("portfolio");
            sectionPortfolio.insertBefore(
                sectionFilters,
                sectionPortfolio.querySelector(".gallery")
            );
        })
        .catch((error) => {
            // Gérez les erreurs ici
            console.error("Erreur lors de la requête Fetch:", error);
        });

    fetch(apiUrlWorks)
        .then((response) => {
            if (!response.ok) {
                throw new Error("La requête a échoué");
            }
            return response.json(); // Parse la réponse en JSON
        })
        .then((data) => {
            data.forEach((item) => {
                addImagePortfolio(item);
            });
        })
        .catch((error) => {
            // Gérez les erreurs ici
            console.error("Erreur lors de la requête Fetch:", error);
        });
});
