/* -------------------- Variables globales que se usaran -------------------- */
const form = document.querySelector("#search-form")
const searchInput = document.getElementById("search-term")
const msg = document.querySelector(".form-msg")
const list = document.querySelector(".cities")

// API KEY
const apiKey = "4ac6a979dd78a61751c5ff144397fd50"

form.addEventListener("submit", e =>{
    e.preventDefault()
    let agregar = true
    msg.textContent = ""
    msg.classList.remove("visible")

    let inputVal = searchInput.value

    /* -- chequear si hay una ciudad que coincida con los criterios de busqueda - */

    const listItemsArray = Array.from(list.querySelectorAll(".cities li"))

    if (listItemsArray.length > 0){
        const filteredArray = listItemsArray.filter(el => {
            let content = ""

            //Se obtiene el nombre de la ciudad y el pais en minuscula
            let cityName = el.querySelector(".city__name").textContent.toLowerCase()
            let cityCountry = el.querySelector(".city__country").textContent.toLowerCase()

            //En el buscador hay dos formatos en el que se puede buscar
            //Verificaremos el primer formato[ciudad, pais]
            if (inputVal.includes(',')){
                //Interesa obtener el primer valor, si el segundo es erroneo
                //Ej: Montevideo, Uyyyyyysyyy

                //La condicion da un arreglo de dos posiciones
                if (inputVal.split(',')[1].length > 2){
                    inputVal = inputVal.spli(',')[0]

                    content = cityName
                }else{
                    //Ambos valores son correctos
                    content = `${cityName},${cityCountry}`
                }
            }else{
                //Segundo Formato seria el simple, la ciudad.
                content = cityName
            }
            return content === inputVal.toLowerCase()
        })
        
        if (filteredArray.length > 0) {
            msg.textContent = `Ya se desplego el clima para ${filteredArray[0].querySelector(".city__name").textContent} ... puedes ser mas especifico aportando el codigo de la ciudad 🤓`
            msg.classList.add("visible")
            form.reset()
            searchInput.focus()
            agregar = false
        }

    }

    if (agregar){
                //ajax
        const url = `http://api.openweathermap.org/data/2.5/forecast?q=${inputVal}&appid=${apiKey}&units=metric`
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            if (data.cod == '404'){
                throw new Error(`${data.cod}, ${data.message}`)
            }

            const {main, weather} = data.list[0]
            const {name, country} = data.city
            const icon = `img/weather/${weather[0]['icon']}.svg`
            const li = document.createElement('li')

            const markup = `
            <figure>
                <img src="./${icon}" alt="${weather[0]['description']}">
            </figure>
                <div>
                    <h2>${Math.round(main.temp)}<sup>°C</sup></h2>
                    <p class="city__conditions">${weather[0]['description'].toUpperCase()}</p>
                    <h3>
                        <span class="city__name">${name}</span>
                        <span class="city__country">${country}</span>
                        </h3>
                </div>
            `
            li.innerHTML = markup
            
            list.appendChild(li)
        })
        .catch(()=> {
            msg.textContent ="Por favor busca un pais valido🤪"
            msg.classList.add('visible')
        })
    }


    form.reset()
    searchInput.focus()
})