let ProduitValidData = [];
let ImgbanniereCommande = "public/img/commander.png";
//variable img bannière
let ImgbanniereVintage = "public/img/camera-vintage.png";
//affiche img et text dans bannière vintage
affichImgBanniere(ImgbanniereCommande);
AffichTextBanniere("Commander");

// on récupère l'adresse url et id
let parametre = new URL(document.location).searchParams;
let id = parametre.get("id");

//récupère data du produit dans lien flex
const RecupProduitValid = async () => {
  // attention pour url on utilise guillemets du 7
  await fetch(`http://localhost:3000/api/cameras/${id}`)
    .then((res) => res.json())
    .then((data) => {
      ProduitValidData = data;
      //console.log(ProduitValidData);
    })
    .catch((err) => console.log("ereur:" + err));
};
// récupère et affiche le produit selectionné

const affichProduitValid = async () => {
  await RecupProduitValid();
  document.querySelector(".affichProduits").innerHTML = `
 <!--________________container produit_______________________-->
  <div class="container-produit">
  <!--________________bloc produit_______________________-->
 <div id="cam ${ProduitValidData._id}" class="bloc-produit">
     <h3 class="bloc-produit_title">${ProduitValidData.name}</h3>
   <img class="bloc-produit_img" src="${
     ProduitValidData.imageUrl
   }" alt="image produit ${ProduitValidData.name}"/> 
   <p class="bloc-produit_descript"> ${ProduitValidData.description}</p>
   <p class="bloc-produit_price">${ProduitValidData.price
     .toString()
     .replace(/0+$/, "")} Euros </p>
          </div>
  <!--________________bloc options_______________________-->
  <div class="bloc-options"  >
  <div class="bloc-choose" >
  <label for="lentilles">Choisir la lentille</label>
  <select name="lentilles" id="lentilles">
  </select>
  </div>
  <!--________________button valider_______________________-->
  <button id="${ProduitValidData._id}" class="buttonValid">Valider</button>
  </div>
  </div>
  `;
};
affichProduitValid();
