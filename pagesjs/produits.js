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
