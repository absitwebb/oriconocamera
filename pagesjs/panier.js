//variable panier
let formContact = document.querySelector(".formContact");
let suitecommande = document.getElementById("suitecommande");
let blocPanierTitle = document.getElementById("blocPanier-title");
let injectJS = document.getElementById("injectJS");

//variable img bannière
let ImgbanniereCommande = "public/img/panier.png";
//affiche img et text dans bannière vintage
affichImgBanniere(ImgbanniereCommande);
AffichTextBanniere("Votre panier");

//on va chercher dans le localstorage le produit
// on le transforme en objet (parse)
let addProduit = JSON.parse(localStorage.getItem("produit"));

// on vérifie si il y à un produit
const basketaffich = async () => {
  // si addProduit est vrai
  if (addProduit) {
    await addProduit;

    // on cache le formulaire
    formContact.classList.add("affichcontactnone");
    //on affiche le formulaire lorsqu'on clique sur le bouton continuer du récapitulatif
    suitecommande.addEventListener("click", () => {
      formContact.classList.remove("affichcontactnone");
    });
    // si produit dans le panier on chande de titre
    blocPanierTitle.innerHTML = `<h2 id="titre-panier">Panier</h2>`;
    // on affiche les éléments du produit

    injectJS.innerHTML = addProduit
      .map(
        (produit) =>
          `
           
            <div id="panier-produit">
     
              <!--_____________block 1 image____________-->
              <div id="panier-produit_image">
                <img src="${produit.imageUrl}" alt="appareil ${produit.name}" />
              </div>
              <!--_____________ block 2 produit___________-->
              <div id="panier-produit_ref">
                <h2> ${produit.name}</h2>
                 <p>${produit.lentillechoix}</p>
                <p>${produit.price.toString().replace(/00/, "")}€</p>
                <p>Ref:<br/>${produit._id}</p>
                <p>en stock</p>
              </div>
              <!--_____________ block 3 change produit___________-->
              <div id="panier-produit_change">
                <div class="change-select">
                  <button class="bouton-val" data-id="${produit._id} data-id='${
            produit.lentillechoix
          }" >-</button>
                  <span class="produit-quantité">${produit.quantite}</span>
                  <button class="bouton-val" data-id="${produit._id} data-id='${
            produit.lentillechoix
          }">+</button>
                </div>
               <!--____on calcule la quantité de produit avec le prix___________-->
                <div class="change-price"><p>${
                  produit.quantite * produit.price.toString().replace(/00/, "")
                }€</p></div>
                <div><i class=" bouton-corbeille fas fa-trash-alt gris data-id="${
                  produit._id
                } data-id="${produit.lentillechoix}"></i></div>
             
             </div>
                        </div>
          


    `
      )
      .join("");

    return;
    // sinon  pas de produits
  } else {
    formContact.classList.add("affichcontactnone");
    suitecommande.addEventListener("click", () => {
      alert("Ajoutez des produits au panier");
    });
  }
};
basketaffich();
