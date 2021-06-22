let usernameInput
let passwordInput

async function createMember() {
  usernameInput = document.querySelector('.username-input').value
  passwordInput = document.querySelector('.password-input').value

  // credentialValidiation()
  
  console.log(usernameInput, passwordInput)

  const data = {usernameInput, passwordInput}

  fetch('http://localhost:2485/member', {
    method: 'post',
    headers: {
      'Content-Type':' application/json'
    },
    body: JSON.stringify({
      username: data.usernameInput,
      password: data.passwordInput
    })
  })
}

function credentialValidiation() {
  usernameInput = document.querySelector('#username')

  if (true) {
    console.log(usernameInput.length)

    document.querySelector('.username-input').id = 'username error-warning'
  }
}

document.querySelector('.rules-container').id = 'error-warning'


document.addEventListener('click', event => {
  switch (event.target.id) {
    case "sign-up-button":
      createMember()
      break
  }
})