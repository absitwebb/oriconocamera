//variables

//variable supprimer avec la poubelle
let sommeProduct = [];
// variable ajout quantité total produits dans panier de la bannière
let panierBanniereQuantite = document.getElementById("panierBanniereQuantite");
//-----------------------------------------------------------
//fonction pour afficher img dans bannière
function affichImgBanniere(imgBanniere) {
  let boxImgBanniere = document.createElement("img");
  boxImgBanniere.src = imgBanniere;
  document.querySelector(".bannierename").appendChild(boxImgBanniere);
}
function AffichTextBanniere(TextBanniere) {
  let boxTextBanniere = document.createElement("h1");
  boxTextBanniere.innerHTML = ` ${TextBanniere}`;
  document.querySelector(".bannierename").appendChild(boxTextBanniere);
}
//--------------------------------------------------------
// fonction pour ajouter la quantité total des produits
// dans panier de la bannière

function ajoutpanierQauntiteTotal() {
  // on va chercher les produits dans le localstorage
  let produitLocal = JSON.parse(localStorage.getItem("produit"));
  // on crée un tableau pour stocké la quantité de produits qu'on va trouver
  let appareilQauntiteTotal = [];

  // on fait une boucle pour chercher la quantité de produits
  // on met cette quantié dans un tableau
  if (produitLocal) {
    produitLocal.forEach((appareil) => {
      appareilQauntiteTotal.push(appareil.quantite);
      // on supprimer la class panierbannierevide
      // on ajout ou modifie la class de id panierbannierequantite
      panierBanniereQuantite.classList.remove("panierbannierevide");
      panierBanniereQuantite.classList.add("panierbannierequantite");

      // on affiche le resultat du tableau dans la page
      // eval et le + dans join permet d'additionner le tableau
      return (panierBanniereQuantite.textContent = `${eval(
        appareilQauntiteTotal.join("+")
      )}`);
    });
  } else {
    return (panierBanniereQuantite.textContent = `vide`);
  }
}

//------------------------supprimer produit dans panier avec la poubelle-----------
const removeProduit = async (basketaffich) => {
  await basketaffich;
  // on crée une variable ou l'on met tous les boutons poubelle
  let poubelles = document.querySelectorAll(".bouton-poubelle");

  // bouble pour écouter les clics
  poubelles.forEach((poubelle) => {
    poubelle.addEventListener("click", () => {
      let totalAddProduitPoubelle = addProduit.length;

      // si il y a qu'un produit dans le localstorage tout supprimer
      if (totalAddProduitPoubelle == 1) {
        return localStorage.removeItem("produit");
      } else {
        // on va filtrer les éléments du tableau(localstorage)
        // et on les compare avec les éléments du clic (poubelle)
        // et renvoi (true) tous les produits qui sont différents du produit cliqué
        sommeProduct = addProduit.filter((el) => {
          if (
            poubelle.dataset.id != el._id ||
            poubelle.dataset.lentille != el.lentillechoix
          ) {
            return true;
          }
        });
        // on remet à jour le localstorage avec les produits selectionnés avec filter
        // et le produit cliqué et donc non sélectionné à été supprimé
        localStorage.setItem("produit", JSON.stringify(sommeProduct));
        location.href = "panier.html";
      }
    });
  });
};

//-----------------------------bouton  plus -----------------------------------
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

//-------------------------------------bouton moins -------------------------------
//fonction pour supprimer produit dans le panier
const buttonMinQuantite = async (basketaffich) => {
  await basketaffich;
  // on crée une variable avec tous les boutons moins
  let moins = document.querySelectorAll(".bouton-moins");
  // on crée une boucle pour écouter tous les click des boutons moins
  moins.forEach((negat) => {
    negat.addEventListener("click", () => {
      // variable avec la totalité des produits
      let totalAddProduit = addProduit.length;
      // on crée une boucle pour vérifier à quel produit correspond le click
      for (i = 0; i < totalAddProduit; i++) {
        //----------------première condition de vérification--------------------
        // si la quantité dans produit est égal à 1---------------------
        // et si le total de produits dans le localstorage est égal à 1
        if (addProduit[i].quantite == 1 && totalAddProduit == 1) {
          return (
            //on supprime le produit du localstorage
            localStorage.removeItem("produit"),
            //on recharche la page
            (location.href = "panier.html")
          );
        }
        //----------------deuxième condition de vérification--------------------
        //si la quantité dans produit est égal à 1
        // et si il y à plusieurs produits
        // et que si produit du localstorage est égal au produit sur lequel on a cliqué
        // et si l'option lentille du produit du localstorage est égal à l'option lentille au produit sur lequel on a cliqué
        if (
          addProduit[i].quantite == 1 &&
          totalAddProduit != 1 &&
          addProduit[i]._id == negat.dataset.id &&
          addProduit[i].lentillechoix == negat.dataset.lentille
        ) {
          // splice permet de supprimer un produit du tableau
          addProduit.splice(i, 1);
          localStorage.setItem("produit", JSON.stringify(addProduit));
          location.href = "panier.html";
        }
        //--------------------troisième condition de vérification-----------------------
        // si produit du localstorage est égal au produit sur lequel on a cliqué
        // et si l'option lentille du produit du localstorage est égal à l'option lentille au produit sur lequel on a cliqué
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
             }€`)
            );
        }
      }
    });
  });
};
