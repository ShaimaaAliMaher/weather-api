let form = document.getElementById('form1')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    weatherFun()
    form.reset()
})
const errorF = document.getElementById('error')
const locationF = document.getElementById('location')
const weatherF = document.getElementById('wether')
const longtiudeF = document.getElementById('longitude')
const latitudeF = document.getElementById('latitude')
const cityF = document.getElementById('city')
const tempF = document.getElementById('temp')
const par = document.getElementById('paragraph')


let weatherFun = async () => {
    try {
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:5000/weather?address=' + address)
        const data = await res.json()
        console.log(data)
        if (data.error) {
            par.style.display="block"
            errorF.innerText ='Error: '+ data.error ,
            locationF.innerText = ''
            weatherF.innerText = ''
            longtiudeF.innerText = ''
            latitudeF.innerText = ''
            cityF.innerText = ''
            tempF.innerText = ''
        }
        else { 
            par.style.display = "block"
            errorF.innerText = ''
            setTimeout(() => {locationF.innerText =   'location : ' + data.location},500) 
             setTimeout(() => { cityF.innerHTML = 'city : ' + data.city},1000)
            setTimeout(() => {longtiudeF.innerText = 'longitide : ' + data.longtiude},1500)
            setTimeout(() => { latitudeF.innerText = 'latitude : ' + data.latitude },2000)
            setTimeout(() => { weatherF.innerText = 'weather :' + data.weather },2500)
            setTimeout(() => { tempF.innerHTML =' temperature : ' + data.temp +'c'},3000)
   
        }
    }
    catch (e) {
        console.log(e)
    }
}
//<i class="fas fa-map-marker-alt"></i>
// <i class="far fa-city"></i>
//<i class="fas fa-paperclip"></i>
// <i class="fas fa-sun-cloud"></i>
//<i class="fas fa-thermometer-three-quarters"></i>