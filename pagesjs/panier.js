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
                <p class="CprimaryText">${produit.price
                  .toString()
                  .replace(/00/, "")}€</p>
                <p>Ref:<br/>${produit._id}</p>
                <p class="ColorGreen">en stock</p>
              </div>
              <!--_____________ block 3 change produit___________-->
              <div id="panier-produit_change">
                <div class="change-select">
                  <button class="bouton-moins" data-id="${
                    produit._id
                  }" data-lentille="${produit.lentillechoix}" >-</button>
                  <span class="produit-quantité">${produit.quantite}</span>
                 
                  <button class="bouton-plus" data-id="${
                    produit._id
                  }" data-lentille="${produit.lentillechoix}">+</button>
                </div>
               <!--____on calcule la quantité de produit avec le prix___________-->
                <div class="change-price"><p>${
                  produit.quantite * produit.price.toString().replace(/00/, "")
                }€</p></div>
                <div><i class=" bouton-corbeille fas fa-trash-alt gris data-id="${
                  produit._id
                }" data-id="${produit.lentillechoix}"></i></div>
             
             </div>
                        </div>
         
    `
      )
      .join("");
    // bouton + pour rajouter produit
    buttonPlusQuantite();
    // bouton minimum quantité
    buttonMinQuantite();
    return;

    // sinon  pas de produits
  } else {
    formContact.classList.add("affichcontactnone");
    suitecommande.addEventListener("click", () => {
      alert("Ajoutez des produits au panier");
    });
  }
};
// fonction pour afficher le produit
basketaffich();

// fonction pour ajout produit avec le bouton +
const buttonPlusQuantite = async (basketaffich) => {
  await basketaffich;
  // on recupère tous les boutons +
  let plus = document.querySelectorAll(".bouton-plus");
  //on fait une boucle pour écouter tous les boutons +
  plus.forEach((Bplus) => {
    Bplus.addEventListener("click", () => {
      //on fait une boucle for pour chaque produit du tableau
      for (i = 0; i < addProduit.length; i++) {
        if (
          //on compare si id et lentille son pareil entre localstorage et bouton plus
          addProduit[i]._id == Bplus.dataset.id &&
          addProduit[i].lentillechoix == Bplus.dataset.lentille
        ) {
          return (
            addProduit[i].quantite++,
            // on rajoute le produit dans localstorage
            localStorage.setItem("produit", JSON.stringify(addProduit)),
            // on affiche la nouvelle quantié dans la page
            (document.querySelectorAll(".produit-quantité")[i].textContent =
              addProduit[i].quantite),
            //on affiche le nouveau prix dans la page
            (document.querySelectorAll(".change-price")[i].textContent = `
             ${
               addProduit[i].quantite *
               addProduit[i].price.toString().replace(/00/, "")
             }€`),
            // affiche la quantité total des produits dans le panier
            ajoutpanierQauntiteTotal()
          );
        }
      }
    });
  });
};
// affiche la quantité total des produits dans le panier
ajoutpanierQauntiteTotal();

//fonction pour supprimer si juste 1 produit dans le panier
const buttonMinQuantite = async (basketaffich) => {
  await basketaffich;
  let moins = document.querySelectorAll(".bouton-moins");

  moins.forEach((negat) => {
    negat.addEventListener("click", () => {
      let totalAddProduit = addProduit.length;
      for (i = 0; i < totalAddProduit; i++) {
        console.log(totalAddProduit);
        // si la quantité dans produit est égal à 1
        // et si le totale de produits dans le localstorage est égal à 1
        if (addProduit[i].quantite == 1 && totalAddProduit == 1) {
          return (
            //on supprime le produit du localstorage
            localStorage.removeItem("produit"),
            //on recharche la page
            (location.href = "panier.html")
          );
        }
        if (addProduit[i].quantite == 1 && totalAddProduit != 1) {
          // splice permet de supprimer un produit du tableau
          addProduit.splice(i, 1);
          localStorage.setItem("produit", JSON.stringify(addProduit));
          (location.href = "panier.html"), console.log("moins");
        }
        if (
          addProduit[i]._id == negat.dataset.id &&
          addProduit[i].lentillechoix == negat.dataset.lentille
        ) {
          addProduit[i].quantite--,
            localStorage.setItem(
              "produit",
              JSON.stringify(addProduit),
              (document.querySelectorAll(".produit-quantité")[i].textContent =
                addProduit[i].quantite),
              //on affiche le nouveau prix dans la page
              (document.querySelectorAll(".change-price")[i].textContent = `
             ${
               addProduit[i].quantite *
               addProduit[i].price.toString().replace(/00/, "")
             }€`),
              console.log("moins--")
            );
        }
      }
    });
  });
};
