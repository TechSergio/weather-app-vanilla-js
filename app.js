/* -------------------- Variables globales que se usaran -------------------- */
const form = document.querySelector("#search-form")
const searchInput = document.getElementById("search-term")
const msg = document.querySelector(".form-msg")
const list = document.querySelector(".cities")

// API KEY
const apiKey = "4ac6a979dd78a61751c5ff144397fd50"

form.addEventListener("submit", e =>{
    e.preventDefault()

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
    }
})