let locationButton=document.getElementById("get-location");
let locationDiv=document.getElementById("location-details");

locationButton.addEventListener("click", () => {
   if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(showLocation, checkError);
   }else{
       locationDiv.innerText="El buscador no encontro la localización";
   }
});
const checkError = (error) => {
       switch(error.code){
           case error.PERMISSION_DENIED:
               locationDiv.innerText = "Debes permitir el acceso a tu ubicación.";
               break;
           case error.POSITION_UNAVAILABLE:
               locationDiv.innerText = "No hay información de esta ubicación.";
               break;
           case error.TIMEOUT:
               locationDiv.innerText = "Ha finalizado el tiempo de espera.";
       }
   }
var loc;
const showLocation = async(position) =>{
   let response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`);
   let data = await response.json();
   console.log(data.address.city);
   console.log(data.address.country);
   locationDiv.innerText=`${data.address.city}, ${data.address.country}`;
   document.getElementById("mostrar").style.display = 'block';
   document.getElementById("lugar").value = document.getElementById("location-details").textContent;
};
