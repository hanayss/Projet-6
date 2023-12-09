function addImagePortfolio(work) {
    const portfolioGallery = document.querySelector("#portfolio .gallery");
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.setAttribute("src", work.imageUrl);
    image.setAttribute("alt", work.title);
    figure.setAttribute("data-item-categoryId", work.categoryId);
    figure.setAttribute("data-item-id", work.id);
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;
    figure.appendChild(image);
    figure.appendChild(figcaption);
    portfolioGallery.appendChild(figure);
}

function deleteImageGalery(work) {
    const modal = document.querySelector("#modal-work");
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.setAttribute("src", work.imageUrl);
    image.setAttribute("class", "image-galery");
    image.setAttribute("alt", work.title);
    figure.setAttribute("data-item-categoryId", work.categoryId);
    figure.appendChild(image);
    modal.appendChild(figure);
    const buttonDelete = document.createElement("button");
    buttonDelete.setAttribute("class", "button-delete");

    const deleteImage = document.createElement("img");
    deleteImage.setAttribute("src", "/assets/icons/icon-delete.svg");
    deleteImage.setAttribute("class", "delete-icon");
    buttonDelete.appendChild(deleteImage);
    figure.appendChild(buttonDelete);

    buttonDelete.addEventListener("click", function () {
        figure.remove();
        document
            .querySelector("figure[data-item-id='" + work.id + "']")
            .remove();

        const apiUrlWorksDelete = "http://localhost:5678/api/works/" + work.id;
        const authToken = localStorage.getItem("authToken");
        fetch(apiUrlWorksDelete, {
            method: "DELETE",
            headers: new Headers({
                Authorization: "Bearer " + authToken,
            }),
        }).then((response) => {
            if (!response.ok) {
                throw new Error("La requête a échoué");
            }
        });
    });
}
function clearInputAddWork() {
    const inputFile = document.getElementById("add-file");
    const inputTitle = document.getElementById("title");
    const selectCategories = document.getElementById("category");
    selectCategories.value = "";
    inputTitle.value = "";
    inputFile.value = "";
    document.getElementById("preview-image").style.display = "none";
    document.querySelector(".form-add-photo").style.display = "block";
}
