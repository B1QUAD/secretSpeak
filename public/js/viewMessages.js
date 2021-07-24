const messageDisplay = document.querySelector('#message');
const passcodeInput = document.querySelector('#passcode');

const getMessages = () => {
    const messagesRef = firebase.database().ref();
    
    messagesRef.once('value').then((snapshot) => {
        findMessage(snapshot.val());
    });

    // This code would create an event that triggered on DB changes --> not good since it calls findMessage
    // messagesRef.on('value', (snapshot) => {
    //     const data = snapshot.val();
    //     findMessage(data);
    // });
}

// Messages is the 
const findMessage = (messages) => {
    const userGuess = document.querySelector('#passcode').value;
    const passcodeAttempt = new Hashes.SHA512().hex(userGuess);

    for (uKey in messages) {
        const messageData = messages[uKey];
        if (messageData.passcode === passcodeAttempt) {
            console.log(messageData.message);
            renderMessageAsHtml(decryptMsg(messageData.message, userGuess));
            firebase.database().ref(uKey).remove();
            return;
        }
    }
    
    alert(`No matching message for the following:\nPassword: ${userGuess}\nHashed: ${passcodeAttempt}`);
}

// Takes encrypted message and password guess as input
function decryptMsg(encMsg, pwd) {
    var decrypt = CryptoJS.AES.decrypt(encMsg, pwd);
    return decrypt.toString(CryptoJS.enc.Utf8);
}

const renderMessageAsHtml = (message) => {
    // Hide Input Form

    passcodeInput.value = '';

    messageDisplay.innerHTML = message;
}