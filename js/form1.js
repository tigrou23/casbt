

$(document).ready(function() {
    submit();
    getGroupe();
    getSousGroupe();

    $('#groupe').change(groupeChange);
    $('#sous_groupe').change(sgroupeChange);
    $('#aliment').change(alimentChange);
    formulaire();
    
})

var prenom;
var nom ;
var tel ;
var num ;
var rue ;
var ville ;
var cp ;
var date;

function containsNumbers(str) {
    return /\d/.test(str);
}
function dateNotExist(date){
    let date1 = Date();
    if(formatDate(date1)<=date)return true;
    return false;
}
function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
}
function getDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('/');
}
function makeGreen(input){input.style.borderColor='greenyellow';}
function makeRed(input){input.style.borderColor='red';}
function passerInformation(prenom_tmp, nom_tmp, tel_tmp, num_tmp, rue_tmp, ville_tmp, cp_tmp, date_tmp){
     prenom = prenom_tmp;
     nom = nom_tmp;
     tel = tel_tmp;
     num = num_tmp;
     rue = rue_tmp;
     ville = ville_tmp;
     cp = cp_tmp;
     date = date_tmp
}
function submit(){
    $('#submit').on('click', function(){
        let bool=true;
        let nom_tmp = document.getElementById('nom');
        let prenom_tmp = document.getElementById('prenom');
        let date_tmp = document.getElementById('date');
        let tel_tmp = document.getElementById('tel');
        let num_tmp = document.getElementById('num')
        let rue_tmp = document.getElementById('rue')
        let cp_tmp = document.getElementById('cp')
        let ville_tmp = document.getElementById('ville')
        if(nom_tmp.value==''||containsNumbers(nom_tmp.value)){makeRed(nom_tmp); bool= false;}
        else{makeGreen(nom_tmp)}
        if(prenom_tmp.value==''||containsNumbers(prenom_tmp.value)){makeRed(prenom_tmp); bool= false;}
        else{makeGreen(prenom_tmp)}
        if(date_tmp.value==''||dateNotExist(date_tmp.value)){makeRed(date_tmp); bool= false;}
        else{makeGreen(date_tmp)}
        if(tel_tmp.value==''||tel_tmp.value.length!=10||isNaN(tel_tmp.value)||document.getElementById('tel').value[0]!=0){makeRed(tel_tmp); bool= false;}
        else{makeGreen(tel_tmp)}
        if(num_tmp.value==''){makeRed(num_tmp); bool= false;}
        else{makeGreen(num_tmp)}
        if(rue_tmp.value==''||containsNumbers(rue_tmp.value)){makeRed(rue_tmp); bool= false;}
        else{makeGreen(rue_tmp)}
        if(cp_tmp.value==''||cp_tmp.value.length!=5||isNaN(cp_tmp.value)){makeRed(cp_tmp); bool= false;}
        else{makeGreen(cp_tmp)}
        if(ville_tmp.value==''||containsNumbers(ville_tmp.value)){makeRed(ville_tmp); bool= false;}
        else{makeGreen(ville_tmp)}
        if(bool){
            $.ajax({
                url: "https://hugopereira.pythonanywhere.com/getPersonne/" + tel_tmp.value.toString() + "/",
                dataType: "json",
                success: function (result) {
                    if(result.length == 0){
                        prenom_tmp = prenom_tmp.value.toString()
                        nom_tmp = nom_tmp.value.toString()
                        tel_tmp = tel_tmp.value.toString()
                        num_tmp = num_tmp.value.toString()
                        rue_tmp = rue_tmp.value.toString()
                        ville_tmp = ville_tmp.value.toString()
                        cp_tmp = cp_tmp.value.toString()
                        date_tmp = date_tmp.value.toString()
                        passerInformation(prenom_tmp, nom_tmp, tel_tmp, num_tmp, rue_tmp, ville_tmp, cp_tmp, date_tmp)
                        $('#form1').css('display','none');
                        $('#form2').css('display','block');
                    }
                    else{
                        alert("Ce numéro de téléphone a déjà été utilisé.")
                    }

                }
            })
        }
    })

}