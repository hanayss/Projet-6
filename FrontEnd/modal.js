document.addEventListener("DOMContentLoaded", function () {
    const openModal = document.getElementById("open-modal");
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("close-modal");

    openModal.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });
    modal.addEventListener("click", (event) => {
        const idElementClique = event.target.id;
        if (idElementClique === "modal") {
            modal.style.display = "none";
        }
    });
    document
        .querySelector(".button-add-photo")
        .addEventListener("click", () => {
            document.querySelector("#add-file").click();
        });

    document
        .querySelector("#button-add-photo")
        .addEventListener("click", () => {
            document.querySelector(".section-delete").style.display = "none";
            document.querySelector(".section-creation").style.display = "block";
        });

    document.querySelector("#icon-return").addEventListener("click", () => {
        document.querySelector(".section-delete").style.display = "block";
        document.querySelector(".section-creation").style.display = "none";
    });

    const apiUrlWorks = "http://localhost:5678/api/works";

    fetch(apiUrlWorks)
        .then((response) => {
            if (!response.ok) {
                throw new Error("La requête a échoué");
            }
            return response.json(); // Parse la réponse en JSON
        })
        .then((data) => {
            data.forEach((item) => {
                deleteImageGalery(item);
            });
        });
});
