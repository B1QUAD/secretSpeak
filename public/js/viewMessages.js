const messageDisplay = document.querySelector('#message');

const getMessages = () => {
    const messagesRef = firebase.database().ref();
    messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        findMessage(data);
    });
}

const findMessage = (messages) => {
    const userGuess = document.querySelector('#passcode').value;
    const passcodeAttempt = new Hashes.SHA512().hex(userGuess);

    for (uKey in messages) {
        const messageData = messages[uKey];
        if (messageData.passcode === passcodeAttempt) {
            console.log(messageData.message);
            renderMessageAsHtml(decryptMsg(messageData.message, userGuess));
            return;
        }
    }
}

// Takes encrypted message and password guess as input
function decryptMsg(encMsg, pwd) {
    var decrypt = CryptoJS.AES.decrypt(encMsg, pwd);
    return decrypt.toString(CryptoJS.enc.Utf8);
}

const renderMessageAsHtml = (message) => {
    // Hide Input Form
    const passcodeInput = document.querySelector('#passcode');
    passcodeInput.value = '';

    messageDisplay.innerHTML = message;
}