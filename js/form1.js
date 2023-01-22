

$(document).ready(function() {
    submit();
    getGroupe();
    getSousGroupe();

    $('#groupe').change(groupeChange);
    $('#sous_groupe').change(sgroupeChange);
    $('#aliment').change(alimentChange);
    formulaire();
    
})
function verificationPersonne(){
    let bool=true;
    let nom = document.getElementById('nom');
    let prenom = document.getElementById('prenom');
    let date = document.getElementById('date');
    let tel = document.getElementById('tel');
    let num = document.getElementById('num')
    let rue = document.getElementById('rue')
    let cp = document.getElementById('cp')
    let ville = document.getElementById('ville')
    if(nom.value==''||containsNumbers(nom.value)){makeRed(nom); bool= false;}
    else{makeGreen(nom)}
    if(prenom.value==''||containsNumbers(prenom.value)){makeRed(prenom); bool= false;}
    else{makeGreen(prenom)}
    if(date.value==''||dateNotExist(date.value)){makeRed(date); bool= false;}
    else{makeGreen(date)}
    if(tel.value==''||tel.value.length!=10||isNaN(tel.value)||document.getElementById('tel').value[0]!=0){makeRed(tel); bool= false;}
    else{makeGreen(tel)}
    if(num.value==''){makeRed(num); bool= false;}
    else{makeGreen(num)}
    if(rue.value==''||containsNumbers(rue.value)){makeRed(rue); bool= false;}
    else{makeGreen(rue)}
    if(cp.value==''||cp.value.length!=5||isNaN(cp.value)){makeRed(cp); bool= false;}
    else{makeGreen(cp)}
    if(ville.value==''||containsNumbers(ville.value)){makeRed(ville); bool= false;}
    else{makeGreen(ville)}
    return bool;
}
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
function makeGreen(input){input.style.borderColor='greenyellow';}
function makeRed(input){input.style.borderColor='red';}
function submit(){
    $('#submit').on('click', function(){
        if(verificationPersonne()){
            prenom = prenom.value.toString()
            nom = nom.value.toString()
            tel = tel.value.toString()
            num = num.value.toString()
            rue = rue.value.toString()
            ville = ville.value.toString()
            cp = cp.value.toString()
            $('#form1').css('display','none');
            $('#form2').css('display','block');
        }
    })

}