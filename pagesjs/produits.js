//variable img bannière
let ImgbanniereVintage = "public/img/camera-vintage.png";
let panierBanniereQuantite = document.getElementById("panierBanniereQuantite");
//affiche img et text dans bannière vintage
// fonctions du fichier fonctions.js
affichImgBanniere(ImgbanniereVintage);
AffichTextBanniere("Vintage");

//requete flex produits
let ProduitsData = [];
//récupère data dans lien flex
const RecupProduits = async () => {
  await fetch("http://localhost:3000/api/cameras")
    .then((res) => res.json())
    .then((data) => {
      ProduitsData = data;
    })
    .catch((err) => console.log("ereur:" + err));
};
// récupère et affiche chaque produit
const ProduitsLists = async () => {
  await RecupProduits();
  document.querySelector(".affichProduits").innerHTML = ProduitsData.map(
    (Produit) => `
  <div id="cam ${Produit._id}" class="bloc-produit">
  <a href="/valid-produit.html?id=${Produit._id}">
   <h3 class="bloc-produit_title">${Produit.name}</h3>
   <img class="bloc-produit_img" src="${Produit.imageUrl}" alt="image produit ${
      Produit.name
    }"/> 
   <p class="bloc-produit_descript"> ${Produit.description}</p>
   <p class="bloc-produit_price">${Produit.price
     .toString()
     .replace(/0+$/, "")} Euros </p>
     
 </a>
     </div>
  `
    // join pour supprimer virgule entre chaque affichage de produit
  ).join("");
};
ProduitsLists();

//-----------afficher quantité panier dans bannière------------
// on va chercher les produits dans le localstorage
function ajoutpanierQauntiteTotal() {
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
      panierBanniereQuantite.textContent = `${eval(
        appareilQauntiteTotal.join("+")
      )}`;
    });
  } else {
    panierBanniereQuantite.classList.remove("panierbannierequantite");
    panierBanniereQuantite.classList.add("panierbannierevide");
  }
}
ajoutpanierQauntiteTotal();
