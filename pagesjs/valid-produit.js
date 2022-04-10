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
RecupProduitValid();
