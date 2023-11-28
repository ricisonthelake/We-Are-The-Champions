/*
The following imports the javascript functions that 
    a) initializes the firebase database app
    b) gets the database named in the databaseURL below
*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// ************************************************************************************

/* Link the firebase database to the script */
const appSettings = {
    databaseURL: "https://endorsements-mobile-app-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings) /* Initialize the app with the firebase configuration settings */
const database = getDatabase(app) /* Use the configuration info stored in "app" to get the desired database */
const endorsementListInDB = ref(database, "endorsement_list") /* place the database data in node endorsements in endorsementsInDB */

/* firebase database is now ready to use */
// ************************************************************************************
const toInputFieldEl = document.getElementById("to_input_field")
const endorsementInputFieldEl = document.getElementById("endorsement_input_field")
const fromInputFieldEl = document.getElementById("from_input_field")

const publishButtonEl = document.getElementById("publish_button")
const endorsementListEl = document.getElementById("endorsement_list")

publishButtonEl.addEventListener("click", function () {

    console.log("In publishButtonEl")

    let endorsementInputValue = endorsementInputFieldEl.value
    let fromInputValue = fromInputFieldEl.value
    let toInputValue = toInputFieldEl.value
    let endorsement = [endorsementInputValue, fromInputValue, toInputValue]

    console.log("endorsement: " + endorsement)

    push(endorsementListInDB, endorsement)

    
    clearEndorsementInputFields()

})

onValue(endorsementListInDB, function (snapshot) {
    console.log("in onValue")

    if (snapshot.exists()) {
        console.log("snapshot does exists")

        let endorsementsArray = Object.entries(snapshot.val())
        console.log("Before reversal " + endorsementsArray)
        endorsementsArray.reverse()
        console.log("After reversal " + endorsementsArray)

        clearEndorsementListEl()

        for (let i = 0; i < endorsementsArray.length; i++) {
                    
            console.log("i = " + i)
            console.log("endorsementsArray = " + endorsementsArray[i][1][1])
            let toInputValue = endorsementsArray[i][1][2]
            let endorsementInputValue = endorsementsArray[i][1][0]
            let fromInputValue = endorsementsArray[i][1][1]
            
            displayEndorsement(toInputValue, endorsementInputValue, fromInputValue)
    
        }
         
    } else {
        console.log("snapshot does not exists")
        endorsementListEl.innerHTML = "Write something nice about someone"
    }
})

function clearEndorsementListEl() {
    endorsementListEl.innerHTML = ""
}


function clearEndorsementInputFields() {

    endorsementInputFieldEl.value = ""
    fromInputFieldEl.value = ""
    toInputFieldEl.value = ""

}


function displayEndorsement(toValue, endorsementValue, fromValue) {
    console.log("in displayEndorsement")
    console.log("toValue = " + toValue)
    console.log("endorsementValue = " + endorsementValue)
    console.log("fromValue = " + fromValue)



    endorsementListEl.innerHTML +=
        `<ul class="endorsement">
        <li class="toField"> To ${toValue} </li>
        <li>${endorsementValue}</li>
        <li class="fromField">From ${fromValue}</li></ul>`



}