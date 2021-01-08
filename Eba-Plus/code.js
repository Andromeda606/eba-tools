if(document.getElementById("joinMeeting").classList.contains("disabled")){
    document.getElementById("joinMeeting").classList.remove("disabled");
    document.getElementsByClassName("live-active")[1].innerHTML="<h2 class=\"text-success dis-none\" id=\"process-started\" style=\"display: block;\"><i class=\"fas fa-exclamation-circle\"></i> Canlı\n					dersin başladı.</h2>\n				<h2 class=\"text-warning dis-none\" id=\"process-future\" style=\"display: none;\"> Sıradaki canlı dersine <span id=\"timer\"></span>\n					kaldı.</h2>";
    //Canlı Ders başlamadı.
}
$("#active-brand-button").show();
document.getElementById("active-brand-button").innerHTML = "Akademik desteğe giriş yap";
