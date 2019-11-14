const usernameElement = document.getElementById("username");
const messageElement = document.getElementById("message");
//find .allMessages div and set to msgContainer variable
const msgContainer = document.querySelector(".allMessages");
const button = document.getElementById("submitButton");
button.addEventListener("click", updateDB);

//Set database object here

const db = firebase.firestore();
const database = firebase.database();

/**
 * Updates the database with the username and message.
 */
function updateDB(event) {
    event.preventDefault();
    const username = usernameElement.value;
    const message = messageElement.value;

    usernameElement.value = "";
    messageElement.value = "";

    console.log(username + " : " + message);

    db.collection("messages").add({
            username: username,
            message: message,
            //add message with time stamp
            created: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function (docRef) {
            //create new p tag
            let newP = document.createElement('p');
            //set innerText to username and message
            newP.innerText = `${username}: ${message}`;
            //append p tag to msgContainer variable
            msgContainer.append(newP);

        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });

}

//refernce the db messages
db.collection('messages')
    //sets order of how responses will be returned 
    .orderBy('created', 'asc')
    .get()
    .then(function(response){
        response.forEach(function(doc){
            let msg = doc.data();
            let newP = document.createElement('p');
            newP.innerText = `${msg.username}: ${msg.message}`;
            msgContainer.append(newP);
        })
    })
