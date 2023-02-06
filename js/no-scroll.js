const header = document.querySelector('header');
const oModals = document.querySelectorAll('.modal_open');
const cModals = document.querySelectorAll('.modal_close');
const closePollButton = document.querySelector("#close-poll");
const pollContainer = document.querySelector("#poll-container");
const popup = document.getElementById("popup");
const close = document.getElementById("close");

document.body.addEventListener('click', function(event){
	oModals.forEach(modal => {
		if(modal.contains(event.target)){
			document.body.classList.add('stop-scrolling');
			header.style.pointerEvents = 'none';
		}
	});

	cModals.forEach(modal => {
		if(modal.contains(event.target)){
			document.body.classList.remove('stop-scrolling');
			header.style.pointerEvents = 'auto';
		}
	});
});

document.getElementById("poll").addEventListener("click", function() {
document.getElementById("bandeau").style.backgroundColor = "darkgray";
});

close.addEventListener("click", function() {
  popup.style.display = "none";
  window.location.href = "./accueil.html";
});