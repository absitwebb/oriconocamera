//-------------------------on déclare variables et constantes-----------------------------------
const injectRecappanier = document.getElementById("injectRecappanier");
const injectRecappanierTotal = document.getElementById(
  "injectRecappanierTotal"
);
const ContainerContact = document.querySelector(".formContact");
const ContainerValidCommande = document.querySelector(".ValidCommand");
let body2 = "";
const titletable = [
  "Article",
  "Choix objectif",
  "Quantité",
  "Prix Unitaire",
  "Prix total",
];
let contact;
//--------------on va chercher les produits du localstorage------------------------------------
let addProduitBasket = JSON.parse(localStorage.getItem("produit"));
//------------------------------------------------------------
//variable img bannière
let ImgbanniereCommande = "public/img/commander.png";
//affiche img et text dans bannière vintage
affichImgBanniere(ImgbanniereCommande);
AffichTextBanniere("Votre commande");
//------------------------------------------------------------
// fonction création d'un tableau des produits commandés
function tableCreate() {
  var body = document.body,
    // on crée un tableau
    tbl = document.createElement("table");
  // --on crée ligne et cellules pout les titres----------
  var tr = tbl.insertRow();
  for (var i = 0; i < titletable.length; i++) {
    var td = tr.insertCell();
    td.appendChild(document.createTextNode(titletable[i]));
    td.style.background = "rgb(114, 113, 113)";
    td.style.color = "white";
    td.style.fontSize = "2.5rem";
  }
  //on crée lignes et cellules et on met les produits du localstorage
  for (var i = 0; i < addProduitBasket.length; i++) {
    // on insert une nouvelle ligne dans le tableau
    var tr = tbl.insertRow();
    // on insert une nouvelle cellule
    var td = tr.insertCell();
    // on met du contenu dans la cellule
    td.appendChild(document.createTextNode(addProduitBasket[i].name));
    td = tr.insertCell();
    // on met du contenu dans la cellule
    td.appendChild(document.createTextNode(addProduitBasket[i].lentillechoix));
    // on met du contenu dans la cellule
    td = tr.insertCell();
    td.appendChild(document.createTextNode(addProduitBasket[i].quantite));
    td = tr.insertCell();
    td.appendChild(
      document.createTextNode(`
       ${addProduitBasket[i].price.toString().replace(/00/, "")} €`)
    );
    td = tr.insertCell();
    td.appendChild(
      document.createTextNode(`
        ${
          addProduitBasket[i].price.toString().replace(/00/, "") *
          addProduitBasket[i].quantite
        } €`)
    );
  }

  body2 = body.appendChild(tbl);
  injectRecappanier.appendChild(body2);
}

tableCreate();
refSomProduits();
//------------------------------------------------------------
// vérification formulaire
let FormContactid2 = document.forms["formContactid"];
let error = document.querySelectorAll(".errorform");
let inputsForm = document
  .getElementById("formContactid")
  .getElementsByTagName("input");
let erreurtext;

// on regarde se qui est taper dans le formulaire
FormContactid2.addEventListener("submit", (e) => {
  e.preventDefault();
  // variable qui récupère email
  let email = inputsForm["Email"].value;
  // variable qui récupère nom
  let NameForm = inputsForm["nom"].value;
  // variable qui récupère prénom
  let FirstNameForm = inputsForm["prenom"].value;
  let CityForm = inputsForm["ville"].value;
  let AdressForm = inputsForm["adresse"].value;

  // on fait une boucle pour vérifier tous les champs
  for (let i = 0; i < inputsForm.length; i++) {
    // si les champs sont vides
    if (!inputsForm[i].value) {
      error[i].innerHTML = `erreur, veillez remplir le champs correctement`;
    }
    //------sinon--------------
    else {
      //on vérifie si le mail est valide
      if (checkEmail(email)) {
        error[i].classList.add("errorformValid");
        error[i].innerHTML = ` ok`;
      } else {
        error[i].innerHTML = `erreur, adresse mail non valide`;
      }
      // on vérifie si le nom utilisateur est correcte
      if (checkName(NameForm)) {
        error[i].classList.add("errorformValid");
        error[i].innerHTML = ` ok`;
      } else {
        error[i].innerHTML = `erreur, Nom non valide`;
      }
      // on vérifie si le prénom utilisateur est correcte
      if (checkName(FirstNameForm)) {
        error[i].classList.add("errorformValid");
        error[i].innerHTML = ` ok`;
      } else {
        error[i].innerHTML = `erreur, prénom non valide`;
      }
      // on vérifie si la ville est correcte est correcte
      if (checkName(CityForm)) {
        error[i].classList.add("errorformValid");
        error[i].innerHTML = ` ok`;
      } else {
        error[i].innerHTML = `erreur, prénom non valide`;
      }
      // on vérifie si l'adresse est correcte
      if (checkAdress(AdressForm)) {
        error[i].classList.add("errorformValid");
        error[i].innerHTML = ` ok`;
      } else {
        error[i].innerHTML = `erreur, adresse non valide`;
      }
      // on test l'ensemble du formulaire
      if (
        checkName(NameForm) &&
        checkName(FirstNameForm) &&
        checkAdress(AdressForm) &&
        checkName(CityForm)
      ) {
        // si la condition est ok on crée un objet avec toutes les
        // données du formulaire
        contact = {
          firstName: FirstNameForm,
          lastName: NameForm,
          address: AdressForm,
          city: CityForm,
          email: email,
        };
      }
    }
  }

  //-------------------------------------------------------------------
  // envoi du formulaire au server
  //on récupère les produits du localstorage
  const recuProducts = JSON.parse(localStorage.getItem("produit"));
  //on crée des variables
  let products = [];
  let Resproduct;
  // on fait une boucle pour récupérer les id des produits
  for (i = 0; i < recuProducts.length; i++) {
    products.push(recuProducts[i]._id);
  }
  // on met contact et product dans un objet
  const envoiCommand = {
    contact,
    products,
  };
  // envoie formulaire et prodit vers serveur
  const envoiServ = fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    body: JSON.stringify(envoiCommand),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      Resproduct = data;
      console.log(Resproduct);
      ContainerContact.classList.add("formContactNone");
      ContainerValidCommande.innerHTML = `
      <h3> Madame Monsieur ${Resproduct.contact.lastName}</h3>
      `;
    })

    .catch((err) => console.log("ereur:" + err));
});
