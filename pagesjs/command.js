const injectRecappanier = document.getElementById("injectRecappanier");
const injectRecappanierTotal = document.getElementById(
  "injectRecappanierTotal"
);
let body2 = "";
let addProduitBasket = JSON.parse(localStorage.getItem("produit"));

function tableCreate() {
  var body = document.body, //Change the body element to the element that you want the table to be inserted into
    // on crée un tableau
    tbl = document.createElement("table");

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
