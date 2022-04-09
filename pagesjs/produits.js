//variable img bannière
let ImgbanniereVintage = "public/img/camera-vintage.png";

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
//affiche img et text dans bannière vintage
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
      console.log(ProduitsData);
    });
};
// récupère et affiche chaque produit
const ProduitsLists = async () => {
  await RecupProduits();
  document.querySelector(".affichProduits").innerHTML = ProduitsData.map(
    (Produit) => `
  <div id="cam ${Produit._id}" class="bloc-produit">
   <h3 class="bloc-produit_title">${Produit.name}</h3>
   <img class="bloc-produit_img" src="${Produit.imageUrl}" alt="image produit ${
      Produit.name
    }"/> 
   <p class="bloc-produit_descript"> ${Produit.description}</p>
   <p class="bloc-produit_price">${Produit.price
     .toString()
     .replace(/0+$/, "")} Euros </p>
     <button id="${
       Produit._id
     }" class="bloc-produit_buttonenvoie"> voir Le produit</button>
  </div>
  `
    // join pour supprimer virgule entre chaque affichage de produit
  ).join("");
};
ProduitsLists();
