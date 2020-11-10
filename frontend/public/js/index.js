console.log("index.js is running")

const url = 'http://localhost:3000'

const something = axios.get('https://api.github.com/users/mapbox')
    .then(function(response) {
        console.log("first axios back")
        console.log(response.data)
        console.log(response.data.starred_url)
    })
    .catch(function(err) {
        console.log(err)
    })

console.log(something)

// Find our form 
const placeForm = document.querySelector('#add-destination') 
 
// Process the sumbission of the form 
placeForm.addEventListener('submit', function(event) {     
    // Stopping the normal action of the form so that we can handle things here     
    event.preventDefault()     
    console.log(event.target)     
    console.log("Submitting the Destination form")         
    var formData = new FormData(placeForm)         
    console.log("form data")      
    // Posting that data to our API     
    axios.post('http://localhost:3000/form', formData) 
})

const renderAllPlaces = function(){
    axios.get('http://localhost:3000/place')
   .then(function(response){
       console.log(response.data)

       const apiDataPlace = document.querySelector('#favourite-png-destination')
       apiDataPlace.innerHTML = ""
       const placeArray = response.data

       placeArray.forEach(function(place){
           const newDivElement = document.createElement('div')
           newDivElement.innerHTML = renderOnePlace(place)
           apiDataPlace.append(newDivElement)
           const delBtn = document.querySelector(`#delete-x-${place._id}`)
           delBtn.addEventListener('click', function(event){
               console.log("Delete clicked")
               console.log(event.target.id)
               const placeId = event.target.id.split("-")
               console.log(placeId)
               deleteAndRerender(placeId[2])

           })

           const editButton = document.querySelector(`#edit-button-${place._id}`)
                const inputTitle = document.querySelector(`#title-edit-${place._id}`)
                const inputClose = document.querySelector(`#input-close-${place._id}`)
                const updateButton = document.querySelector(`#update-button-${place._id}`)
                const inputProvince = document.querySelector(`#input-province-${place._id}`)
                const inputTown = document.querySelector(`#input-town-${place._id}`)
                const inputHotels = document.querySelector(`#input-hotels-${place._id}`)
                const inputSites = document.querySelector(`#input-sites-${place._id}`)
                const inputFestival = document.querySelector(`#input-festival-${place._id}`)
                const inputLeisure = document.querySelector(`#input-leisure-${place._id}`)
                const inputPicture = document.querySelector(`#input-picture-${place._id}`)


                editButton.addEventListener('click', function(e) {
                    console.log("EDIT click")
                    
                    document.getElementById(`title-edit-${place._id}`).style.display = "block";
                })

                inputClose.addEventListener('click', function(e) {
                    console.log("CLOSE click")

                    document.getElementById(`title-edit-${place._id}`).style.display = "none";
                })

                updateButton.addEventListener('click', function(event) {
                    console.log("UPDATE CLICKED")
                    console.log(inputProvince.value)
                    console.log(inputTown.value)
                    console.log(inputHotels.value)
                    axios.patch(`${url}/update/${place._id}`, { province: inputProvince.value, town: inputTown.value, hotels: inputHotels.value, sites: inputSites.value, festival: inputFestival.value, leisure: inputLeisure.value, picture: inputPicture.value })
                        .then(function(place) {
                            console.log(place)
                            renderAllPlaces()
                        })
                        .catch(function(err) {
                            console.log(err)
                        })
                    editButton.classList.remove('vanish')
                    inputTitle.classList.add('vanish')
                })

           console.log(delBtn)
       })
   })
   .catch(function(err){
       console.log(err)
   })
}

const deleteAndRerender = function(placeId){
    axios.delete(`${url}/place/${placeId}`)
       .then(function(place){
           console.log("PLACE DELETED")
           console.log(place)
           renderAllPlaces()
       })
       .catch(function(err){
           console.log("PLACE NOT DELETED")
           console.log(err)
       })
}

const editAndRerender = function(id) {

}

const renderOnePlace = function(placeData) {
    const newHTML = `
    <div style="padding: 0px 100px 0px 100px; width: 800px; background-image:url('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRPdN0KNtTsm-vmffRwm4S6mgQVOainEZnwtQ&usqp=CAU')">
        <hr>
          
        <div class="album-title">
        <img src="${placeData.picture}" length= "200" width="600">
        <div style="width: 500px; height: 250px; background-color: cadetblue; color: black">
        <h5> Province: ${placeData.province} </h5>
        <p> Town: ${placeData.town} </p>
        <p> Hotels: ${placeData.hotels} </p>
        <p> Sites: ${placeData.sites} </p>
        <p> Festival: ${placeData.festival} </p>
        <p> Leisure: ${placeData.leisure} </p>
        
        <button id="delete-x-${placeData._id}"> Delete </button>
        <button class="edit-button" id="edit-button-${placeData._id}"> Edit </button>
        </div>
        
            <div style= "display: none; background-color: grey; height: 320px; width: 400px" class="edit-input vanish" id="title-edit-${placeData._id}">
                <h4>Update Data</h4>
                <p>Province: <input type="text" name="province" value="${placeData.province}" id="input-province-${placeData._id}"><p>
                <p>Town:<input type="text" name="town" value="${placeData.town}" id="input-town-${placeData._id}"></p>
                <p>Hotels:<input type="text" name="hotels" value="${placeData.hotels}" id="input-hotels-${placeData._id}"></p>
                <p>Sites:<input type="text" name="sites" value="${placeData.sites}" id="input-sites-${placeData._id}"></p>
                <p>Festival:<input type="text" name="festival" value="${placeData.festival}" id="input-festival-${placeData._id}"></p>
                <p>Leisure:<input type="text" name="leisure" value="${placeData.leisure}" id="input-leisure-${placeData._id}"></p>
                <p>Picture url:<input type="url" name="picture" value="${placeData.picture}" id="input-picture-${placeData._id}"></p>
                <button id="update-button-${placeData._id}"> Update </button>
                <button id="input-close-${placeData._id}"> Exit </button>
            </div>
            
        </div>
    
        <hr>
    </div>
    `
    return newHTML
}

renderAllPlaces()

