document.addEventListener("DOMContentLoaded", function () {
    const inputFile = document.getElementById("add-file");
    const form = document.getElementById("form-add-photo");
    const inputTitle = document.getElementById("title");
    const selectCategories = document.getElementById("category");
    const activateButtonValidate = document.querySelector(
        '#form-add-photo input[type="submit"]'
    );
    const errorMessage = document.getElementById(
        "error-message-form-add-image"
    );

    inputFile.addEventListener("change", checkFile);
    form.addEventListener("input", checkInputs);
    form.addEventListener("submit", sendForm);
    function checkFile() {
        if (inputFile.files && inputFile.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageUrl = e.target.result;
                previewImage(imageUrl);
            };

            reader.readAsDataURL(inputFile.files[0]);
        } else {
        }
    }
    function previewImage(imageUrl) {
        const sectionPreviewImg = document.getElementById("preview-image");
        const img = document.createElement("img");
        img.src = imageUrl;
        sectionPreviewImg.appendChild(img);
        document.getElementById("preview-image").style.display = "block";
        document.querySelector(".form-add-photo").style.display = "none";
    }

    function checkInputs() {
        const inputTitleValue = inputTitle.value.trim();
        const selectCategoriesValue = selectCategories.value.trim();
        activateButtonValidate.disabled =
            inputTitleValue === "" ||
            selectCategoriesValue === "" ||
            !inputFile.files[0];
    }

    function sendForm(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("image", inputFile.files[0]);
        formData.append("title", inputTitle.value);
        formData.append("category", selectCategories.value);
        const apiUrlNewWork = "http://localhost:5678/api/works/";
        const authToken = localStorage.getItem("authToken");
        fetch(apiUrlNewWork, {
            method: "POST",
            headers: new Headers({
                Authorization: "Bearer " + authToken,
            }),
            body: formData,
        })
            .then((response) => {
                if (!response.ok || response.status !== 201) {
                    throw new Error("La requête a échoué");
                }
                return response.json(); // Parse la réponse en JSON
            })
            .then((data) => {
                addImagePortfolio(data);
                deleteImageGalery(data);
                selectCategories.value = "";
                inputTitle.value = "";
                inputFile.files.length = 0;
                document.getElementById("preview-image").style.display = "none";
                document.querySelector(".form-add-photo").style.display =
                    "block";
                document.querySelector(".section-delete").style.display =
                    "block";
                document.querySelector(".section-creation").style.display =
                    "none";
            })
            .catch((err) => {
                errorMessage.textContent = "Une erreur est survenue, réessayez";
            });
    }
});
