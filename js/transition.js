let compteur = 0;
let list_aliment = [];

function alimentChange(){
  $("#msg").css('opacity', '0')
}
function formulaire(){
    $('#suivant').on('click',suivant);
    $('#precedent').on('click',precedent);
}

function suivant(){
    if(verification()){
        envoieDonnees();
        compteur++;
        if(compteur==10){
            var adresse = num + " " + rue
            console.log(prenom, nom, tel, adresse, ville, cp)
            $.ajax({
                url: "https://hugopereira.pythonanywhere.com/personne/",
                dataType: "json",
                data: {
                    "prenom": prenom,
                    "nom": nom,
                    "telephone": tel,
                    "adresse": adresse,
                    "ville": ville,
                    "cp": cp
                },
                success: function(result){
                    console.log("Connexion réussie avec Personne")
                },
                complete: function(){

                     $.ajax({
                         url: "https://hugopereira.pythonanywhere.com/getPersonne/" + tel + "/",
                         dataType: "json",
                         success: function (result) {
                             console.log(result)
                             var ID = result[0]['ID']
                             envoieSondage(ID);
                         }
                     })


                },
                type: 'POST'
            })



            $("#form2").css("display", "none")
            $("#resultat").css("display", "block")

        }
        $('#progress_bar').prop("value",compteur+1)
        $(".container>h2").html("Aliment " + (compteur+1))



    }
    else{
        $("#msg").css('opacity', '1')
    }
}
function envoieSondage(num){
    var date = new Date().toISOString().slice(0, 10)
    $.ajax({
        url: "https://hugopereira.pythonanywhere.com/sondage/",
        dataType: "json",
        data: {
            "id_personne": num,
            "date": date.toString(),
            "id_aliment_1": list_aliment[0],
            "id_aliment_2": list_aliment[1],
            "id_aliment_3": list_aliment[2],
            "id_aliment_4": list_aliment[3],
            "id_aliment_5": list_aliment[4],
            "id_aliment_6": list_aliment[5],
            "id_aliment_7": list_aliment[6],
            "id_aliment_8": list_aliment[7],
            "id_aliment_9": list_aliment[8],
            "id_aliment_10": list_aliment[9]
        },
        success: function(result){
            console.log("Connexion réussie avec Sondage")
        },
        /*beforeSend: function() {
            loader.show();
        },
        complete: function(){
            loader.hide();
        },*/
        type: 'POST'
    })
}
function precedent(){
    if(compteur==0){}
    else{
        compteur--;
        $('#progress_bar').prop("value",compteur+1)
        $(".container>h2").html("Aliment " + (compteur+1))
    }

}
function verification(){
    console.log("$('#aliment')[0].value : " + $('#aliment')[0].value)
    if(list_aliment,$('#aliment').val()=="")return false
    else if(exist(list_aliment,$('#aliment')[0].value))return false;
    else return true;
}
function envoieDonnees(){
    list_aliment[compteur] = $('#aliment')[0].value;
    console.log(list_aliment);
}
function exist(table, value){
    let bool = false
    table.forEach(item=>{
        if(item==value) bool = true;
    })
    return bool;
}