document.addEventListener("DOMContentLoaded", function () {
    const openModal = document.getElementById("open-modal");
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("close-modal");

    console.log("modal =>", modal);
    openModal.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });
    modal.addEventListener("click", (event) => {
        const idElementClique = event.target.id;
        console.log("idElementClique =>", idElementClique);
        if (idElementClique === "modal") {
            modal.style.display = "none";
        }
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
            const modal = document.querySelector("#modal-work");
            console.log("data =>", data);
            data.forEach((item) => {
                const figure = document.createElement("figure");
                const image = document.createElement("img");
                image.setAttribute("src", item.imageUrl);
                image.setAttribute("class", "image-galery");
                figure.setAttribute("data-item-categoryId", item.categoryId);
                figure.appendChild(image);
                modal.appendChild(figure);
                console.log("Modal =>", modal);
                const buttonDelete = document.createElement("button");
                buttonDelete.setAttribute("id", "button-delete");

                const deleteImage = document.createElement("img");
                deleteImage.setAttribute(
                    "src",
                    "/assets/icons/icon-delete.svg"
                );
                deleteImage.setAttribute("id", "delete-icon");
                buttonDelete.appendChild(deleteImage);
                figure.appendChild(buttonDelete);
                console.log("buttonDelete =>", buttonDelete);

                buttonDelete.addEventListener("click", function () {
                    figure.remove();
                    document
                        .querySelector("figure[data-item-id='" + item.id + "']")
                        .remove();

                    const apiUrlWorksDelete =
                        "http://localhost:5678/api/works/" + item.id;

                    fetch(apiUrlWorksDelete, {
                        method: "DELETE",
                        headers: new Headers({
                            Authorization:
                                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5OTQ1Mzk1OCwiZXhwIjoxNjk5NTQwMzU4fQ.mwtuvaovEcSQ0Rs5lxJZTgkTdv5nM64kKNxQRtRNN18",
                        }),
                    }).then((response) => {
                        if (!response.ok) {
                            throw new Error("La requête a échoué");
                        }
                        return response.json(); // Parse la réponse en JSON
                    });
                });
            });
        });
});
