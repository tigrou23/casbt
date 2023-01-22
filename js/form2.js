// VARIABLES
/* Tableau de correspondance groupe - sous-groupe */
let tabGroupe = new Map();
/* Tableau de correspondance id_groupe - libelle */
let groupe = {};
/* Tableau de correspondance id_sgroupe - libelle */
let sgroupe = {};
/* Tableau de correspondance id_aliment - libelle */
let aliment = {};

// FONCTIONS
/** Recupère tous les groupes */
function getGroupe(){
    $.ajax({
        type: 'GET',
        url: "https://hugopereira.pythonanywhere.com/groupe/",
        dataType: "json",
        success: function(result){
          creerObjet(groupe, result)
          result.forEach(item => {
            $('#groupe').append("<option value='" + item.ID + "'>"+item.libelle+"</option>")
          });
        }
    })
}
/** Recupère tous les sous-groupes */
function getSousGroupe(){
  $.ajax({
      type: 'GET',
      url: "https://hugopereira.pythonanywhere.com/sgroupe/",
      dataType: "json",
      success: function(result){
        creerObjet(sgroupe, result)
        triGroupe(result);
      }
  })
}
/** Recupère tous les aliments */
function getAliment(){
  $.ajax({
      type: 'GET',
      url: "https://hugopereira.pythonanywhere.com/aliment/",
      dataType: "json",
      success: function(result){
      }
  })
}
/** Recupère tous les aliments en fonction d'un sous-groupe
 * @param id l'id du sous-groupe
 */
function getAlimentByID(id){
  $.ajax({
    type: 'GET',
    url: "https://hugopereira.pythonanywhere.com/getAliment/"+id+"/",
    dataType: "json",
    async:false,
    success: function(result){
      creerObjet(aliment, result)
    }
})
}
/** Créé un tableau de correspondance
 * @param tableau le tableau de correspondance
 * @param data la donnée contenant l'ID et le Libelle à faire correspondre
 */
function creerObjet(tableau, data){
  data.forEach(item => {
    tableau[item.ID]=item.libelle;
  })
}
/** Fait correspondre le groupe et le sous-groupe
 * @param data la donnée contenant l'id_groupe et l'id_sgroupe à faire correspondre
 */
function triGroupe(data){
  data.forEach(item =>{
    let keyGroupe = new Set();
    if(tabGroupe.has(item.id_groupe)){
      keyGroupe=tabGroupe.get(item.id_groupe);
    }
    keyGroupe.add(item.ID);
    tabGroupe.set(item.id_groupe,keyGroupe);
  });
}
/** Reinitialise les options des sous-groupes */
function effacerSelect(input, str){
  alimentChange();
  input.children().remove();
  input.append("<option value=''>-- Choisir un "+str+" --</option>")
}
/** Rend la selection du sous-groupe possible ou non */
function groupeChange(){
  effacerSelect($('#sous_groupe'), "sous-groupe");
  if($('#groupe')[0].value==""){
    $('#sous_groupe').prop("disabled",true);
  }
  else{
    $('#sous_groupe').prop("disabled",false);
    chargeSousGroupe();
  }
  sgroupeChange();
}
/** Charge les sous-groupes dans le select */
function chargeSousGroupe(){
  let val = $('#groupe')[0].value;
  let array = tabGroupe.get(val);
  for(const item of array.values()){
    $('#sous_groupe').append("<option value='" + item + "'>"+sgroupe[item]+"</option>")
  }
}

/** Rend la selection des aliments possible ou non */
function sgroupeChange(){
  aliment=[];
  effacerSelect($('#aliment'), "aliment");
  if($('#sous_groupe')[0].value==""){
    $('#aliment').prop("disabled",true);
  }
  else{
    $('#aliment').prop("disabled",false);
    chargeAliment();
  }
}
/** Charge les sous-groupes dans le select */
function chargeAliment(){
  let val = $('#sous_groupe')[0].value;
  getAlimentByID(val);
  for(let item in aliment){
    $('#aliment').append("<option value='" + item + "'>"+aliment[item]+"</option>")
  }
}