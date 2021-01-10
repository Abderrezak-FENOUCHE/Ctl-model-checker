import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import KS from './modules/KS';
import {caseOne} from './modules/CTL_checking_algorithms';

let structureKp = new KS();
console.log("la structure de Kripe =");
console.log(structureKp);

//C'est pour pouvoir la réutiliser sans réecrire toute la ligne a chaque fois _() suffira
const _ = (id) => {
  return document.getElementById(id);
}

let etats = _("etats");
let nouvelEtat = _("nouvelEtat");
nouvelEtat.addEventListener("submit", (event) => {
  event.preventDefault();
  let etat = _("etat").value;

  etats.classList.add('bg-success');
  if (etats.value != '') etats.value += ' , '
  structureKp.S.push(etat);
  etats.value += `${etat}`;
  nouvelEtat.reset();
});

let transitions = _("transitions");
let nouvelleTransition = _("nouvelleTransition");
nouvelleTransition.addEventListener("submit", (event) => {
  event.preventDefault();
  let etatD = _("etatDepart").value;
  let etatA = _("etatArrivee").value;

  transitions.classList.add('bg-success');
  if (transitions.value != '') transitions.value += ' , ';
  transitions.value += `(${etatD},${etatA})`;
  structureKp.R.push([etatD, etatA]);
  nouvelleTransition.reset();
});

let etatInitial = _("etatInitial");
etatInitial.addEventListener("focusout", () => {
  const re = /^[a-zA-Z0-9àéèç]{1,8}$/;
  if (re.test(etatInitial.value)) {
    etatInitial.classList.remove('bg-danger')
    etatInitial.classList.add('bg-success');
    structureKp.Q0 = etatInitial.value;
  }
  else {
    etatInitial.classList.remove('bg-success');
    etatInitial.classList.add('bg-danger')
  }

});

let etatL = _("etatL");
let etatSet = false;
let libTab = [];
etatL.addEventListener("focusout", () => {
  const re = /^[a-zA-Z0-9àéèç]{1,8}$/;
  if (re.test(etatL.value)) {
    etatL.classList.remove('bg-danger')
    etatL.classList.add('bg-success');
    etatSet = true;
  }
  else {
    etatL.classList.remove('bg-success');
    etatL.classList.add('bg-danger')
    etatSet = false;
  }

});

let ajoutProp = _("ajoutProp");
let libSet = false;
let propTab = [];
ajoutProp.addEventListener("click", () => {
  let propVraie = _("propVraie").value;
  let listeProp = _("listeProp");
  const re = /^[a-zA-Z0-9àéèç]{1,8}$/;

  if (re.test(propVraie)) {
    _("propVraie").classList.remove("bg-danger")
    listeProp.classList.add("bg-success")
    if (listeProp.innerText != '') listeProp.innerText += ' , ';
    listeProp.innerText += `${propVraie}`;
    propTab.push(propVraie);
    _("propVraie").value = '';
    libSet = true;
  }
  else {
    _("propVraie").classList.add("bg-danger");
    libSet = false;
  }
});

let libelisation = _("libelisation");
let ajouterLib = _("ajouterLib");
ajouterLib.addEventListener("click", () => {
  if (!libSet || !etatSet) alert("veuillez saisir l'etat et l'ensemble de propriétées d'abord !");

  let etatL = _("etatL");
  let listeProp = _("listeProp");
  if (libelisation.value != '') libelisation.value += ' , ';
  libelisation.value += `L(${etatL.value})={${listeProp.innerHTML}}`;
  etatL.classList.remove("bg-success");
  libTab.push(etatL.value);
  libTab.push(propTab);
  structureKp.L.push(libTab);
  libTab = [];
  propTab = [];
  etatL.value = "";
  listeProp.innerHTML = "";
  _("propVraie").value = "";
});

let valider_ks = _("valider_ks");
valider_ks.addEventListener("click", () => {
  let ks_bloc = _("ks_bloc");
  ks_bloc.innerHTML = `<h6>S = { ${etats.value} }</h6><h6>R = { <p>${transitions.value}</p> }</h6><h6>q0 = ${etatInitial.value} </h6><h6><p>${libelisation.value}</p>`;
  _("ctl_block").removeAttribute("hidden");
  _("msg").setAttribute("hidden","");
  console.log(structureKp);
});

let type_formule =_("type_formule");
let formule_input_bloc=_("formule_choisie");
type_formule.addEventListener("change",()=>{
  _("check_ctl").removeAttribute("disabled");
  switch (type_formule.value) {
    case "1":
      formule_input_bloc.innerHTML='<div  class="form-inline p-3" id="case1"><label for="p"><strong>φ =</strong></label><input type="text" class="form-control col-2" placeholder="propriété" id="p1"></div>';      
      break;
    case "2":
      formule_input_bloc.innerHTML='<div  class="form-inline p-3" id="case2"><label for="p2"><strong>φ = ¬ </strong></label><input type="text" class="form-control col-2 ml-1" placeholder="propriété" id="p2"></div>';
      break;
    case "3":
      formule_input_bloc.innerHTML='<div  class="form-inline p-3" id="case3"><label for="p2"><strong>φ =  </strong></label><input type="text" class="form-control col-2 mr-1" placeholder="propriété" id="pp1"><label for="p2"><strong>  ∧  </strong></label><input type="text" class="form-control col-2 ml-1" placeholder="propriété" id="pp2"></div>';
      break;
    default:
      break;
  }
});

let check_ctl=_("check_ctl");
check_ctl.addEventListener("click",()=>{
  let prop=_("p1");
  let marquage=caseOne(structureKp,prop.value);
  _("marquage").innerHTML="";
  _("reponse").innerHTML="";

    if(marquage.length>0) _("reponse").innerHTML='<span class="badge badge-pill badge-success">La formule est satisfaite par le système !</span>';
    marquage.forEach(m=>{
      if(_("marquage").innerHTML!="")_("marquage").innerHTML+=" , ";
      _("marquage").innerHTML+=` ${m}`;
    });
    console.log(marquage);

});


