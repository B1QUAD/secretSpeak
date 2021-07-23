const passcodeInput = document.querySelector('#passcode');
const msgInput = document.querySelector('#message');
const maxLen = 255;
// Matches passcode with atleast one uppercase and number
const regex = /^(?=.*[A-Z]+)(?=.*[0-9]+).*$/;


const submitMessage = () => {
    console.log('Running');
    
    const passcodeValue = passcodeInput.value;
    const msgValue = msgInput.value;

    
    // Check length
    if (msgValue.length > 255) {
        alert(`Message can't be longer than ${maxLen}`);
        return;
    } // Test password strength
    else if (!regex.test(passcodeValue)) {
        alert('Passcode must contain at least one capital letter and a number');
        return;
    }

    // Hash with SHA512
    var hashedPasscode = new Hashes.SHA512().hex(passcodeValue);
    console.log('oof');
    console.log(hashedPasscode);
    console.log(passcodeValue);

    // Encrypt message
    var encryptedMessage = encryptMsg(msgValue, passcodeValue);

    // Submit to firebase
    firebase.database().ref().push({
        message: encryptedMessage,
        passcode: hashedPasscode
    });

    passcodeInput.value = '';
    msgInput.value = '';
}

const sendMessageButton = document.querySelector('#button');
window.onload = () => {
    sendMessageButton.addEventListener('click', submitMessage);
}

// Secret should be unhashed password
function encryptMsg(msg, secret) {
    var encrypted = CryptoJS.AES.encrypt(msg, secret); // Encrypts message with secret (unhashed passcode)
    return encrypted.toString(); // Returns the encrypted message as a string
}
