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
let panierBanniereQuantite = document.getElementById("panierBanniereQuantite");
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
