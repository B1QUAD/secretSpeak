const getMessages = () => {
    const messagesRef = firebase.database().ref();
    messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        findMessage(data);
    });
}

const findMessage = (messages) => {
    const passcodeAttempt =
        new Hashes.SHA512().hex(document.querySelector('#passcode').value);

    for (uKey in messages) {
        const messageData = messages[uKey];
        if (messageData.passcode === passcodeAttempt) {
            renderMessageAsHtml(messageData.message)
        }
    }
}

const renderMessageAsHtml = (message) => {
    // Hide Input Form
    const passcodeInput = document.querySelector('#passcodeInput');
    passcodeInput.style.display = 'none';
    // Render messageas HTML
    const messageDiv = document.querySelector('#message');
    messageDiv.innerHTML = message;
}