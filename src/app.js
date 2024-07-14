// API = "https://aladhan.com/prayer-times-api"


function fillPrayerTime (id, time){
    document.getElementById(id).innerHTML = time;
}

function getPrayerTimingsByCity (city) {
    let url = "http://api.aladhan.com/v1/timingsByCity?&country=EG&method=5&midnightMode=1&city="+city;
    axios.get(url)
    .then((response) => {
        let prayersList = document.querySelectorAll("h4");
        let timings = response.data.data.timings;
        prayersList.forEach(e => fillPrayerTime(e.id,timings[e.id]));
    })
    .catch(error => alert(error))
}

function updateClock() {
    const clockElement = document.getElementById('time');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clockElement.innerText = `${hours}:${minutes}:${seconds}`;
    clockElement.innerText += hours>11 ? " PM" : " AM";
}

let availableCities = [
    "Cairo", "Alexandria", "Sinai", "Matrouh"
]


window.onload = () => {
    

    // Update the clock every second
    setInterval(updateClock, 1000);


    getPrayerTimingsByCity("Cairo");
    for (let city of availableCities) {
        const optionContent = `
        <option>${city}</option>
        `;
        document.getElementById("selector").innerHTML += optionContent;
    }
    

    const selectElement = document.getElementById('selector');

    selectElement.addEventListener("change", () => {
        let title = document.getElementById("city");
        let currCity = selectElement.options[selectElement.selectedIndex].innerText;
        
        title.innerHTML = currCity;
        getPrayerTimingsByCity(currCity);
    })
}
