const form = document.forms[0];

const nameInput = document.getElementById('name');
    const messageNameSpan = document.getElementById('message-name');

    nameInput.addEventListener('input', function (event) {
        const name = event.target.value.trim();
      if (name.length === 0) {
          messageNameSpan.innerText = 'Name не може бути пустим'
           } else {
           messageNameSpan.innerText = '' 
        }
    });

const messageInput = document.getElementById('message');
const messageMessageSpan = document.getElementById('message-message');

messageInput.addEventListener('input', function (event) {
        const message = event.target.value.trim();
  if (message.length < 5) {
          messageMessageSpan.innerText = 'Message не може бути менше 5 символів'
            } else {
           messageMessageSpan.innerText = ''  
        }
});
    
const phoneInput = document.getElementById('phone');
const messagePhoneSpan = document.getElementById('message-phone');

phoneInput.addEventListener('input', function (event) {
  const phone = event.target.value.trim();
  const phonePattern = /^\+380\d*$/; 
  const minLength = 13;

  if (phone.length === 0) {
        messagePhoneSpan.innerText = 'Phone не може бути пустим';
    } else if (!phonePattern.test(phone)) {
        messagePhoneSpan.innerText = 'Номер повинен починатися з +380';
    } else if (phone.length < minLength) {
        messagePhoneSpan.innerText = `Номер повинен містити мінімум ${minLength} символів`;
    } else {
        messagePhoneSpan.innerText = ''; 
    }
});

const emailInput = document.getElementById('email');
    const messageSpan = document.getElementById('message-mail');

    emailInput.addEventListener('input', function (event) {
        const email = event.target.value.trim();
        if (email.includes('@')&&(email.includes('.'))) {
            messageSpan.innerText = ''
        } else {
            messageSpan.innerText = 'Email повинен мати символ "@" та .(крапку)'
        }
    });

form.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const formData = new FormData(form); 

  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }
});
