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

    // Submit to firebase
    firebase.database().ref('test').push({
        message: msgValue,
        passcode: hashedPasscode
    });

    passcodeInput.value = '';
    msgInput.value = '';
}

const sendMessageButton = document.querySelector('#button');
window.onload = () => {
    sendMessageButton.addEventListener('click', submitMessage);
}
