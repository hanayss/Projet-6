const apiUrlWorks = "http://localhost:5678/api/works";
const apiUrlCategories = "http://localhost:5678/api/categories";

// Effectuer une requête Fetch GET
fetch(apiUrlCategories)
    .then((response) => {
        if (!response.ok) {
            throw new Error("La requête a échoué");
        }
        return response.json(); // Parse la réponse en JSON
    })
    .then((dataCategories) => {
        console.log("dataCategories =>", dataCategories);
        const sectionFilters = document.createElement("section");
        sectionFilters.setAttribute("id", "myFilters");
        // console.log("sectionFilters =>", sectionFilters);
        const buttonAll = document.createElement("button");
        buttonAll.textContent = "Tous";
        // console.log("buttonAll =>", buttonAll);
        buttonAll.classList.add("active");
        buttonAll.addEventListener("click", function () {
            console.log("bouton cliqué");
            const allFigure = document.querySelectorAll(
                "#portfolio .gallery figure"
            );
            allFigure.forEach((figure) => {
                figure.style.display = "block";
            });
            const buttons = sectionFilters.querySelectorAll("button");
            console.log("buttons =>", buttons);
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
            console.log("button =>", button);

            button.addEventListener("click", function () {
                const allFigure = document.querySelectorAll(
                    "#portfolio .gallery figure"
                );
                allFigure.forEach((figure) => {
                    console.log(
                        "figure.dataset =>",
                        figure.dataset.itemCategoryid
                    );
                    console.log("item.id =>", item.id);
                    if (figure.dataset.itemCategoryid === String(item.id)) {
                        figure.style.display = "block";
                    } else {
                        figure.style.display = "none";
                    }
                });
                console.log(item.id);
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
        console.log("sectionPortfolio =>", sectionPortfolio);
    })
    .catch((error) => {
        // Gérez les erreurs ici
        console.error("Erreur lors de la requête Fetch:", error);
    });

// Effectuer une requête Fetch GET
fetch(apiUrlWorks)
    .then((response) => {
        if (!response.ok) {
            throw new Error("La requête a échoué");
        }
        return response.json(); // Parse la réponse en JSON
    })
    .then((data) => {
        // Utilisez les données récupérées (stockées dans la variable "data")

        const portfolioGallery = document.querySelector("#portfolio .gallery");

        data.forEach((item) => {
            console.log("item =>", item);
            const figure = document.createElement("figure");
            const image = document.createElement("img");
            image.setAttribute("src", item.imageUrl);
            // image.src = item.imageUrl;
            image.setAttribute("alt", item.title);
            figure.setAttribute("data-item-categoryId", item.categoryId);
            figure.setAttribute("data-item-id", item.id);
            const figcaption = document.createElement("figcaption");
            figcaption.textContent = item.title;
            figure.appendChild(image);
            figure.appendChild(figcaption);
            portfolioGallery.appendChild(figure);
            console.log("image =>", image);
            console.log("figure =>", figure);
            console.log("figcaption =>", figcaption);
            console.log("portfolioGallery =>", portfolioGallery);
        });

        console.log("data", data);
    })
    .catch((error) => {
        // Gérez les erreurs ici
        console.error("Erreur lors de la requête Fetch:", error);
    });
