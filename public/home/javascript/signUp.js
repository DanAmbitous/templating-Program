let usernameInput
let passwordInput

document.querySelector('.rules-container').classList.add('error-warning')

async function createMember() {
  usernameInput = document.querySelector('#username').value
  passwordInput = document.querySelector('#password').value

  if (usernameInput.length < 3) {
    document.querySelector('.username-message').textContent = "Username can't be less than 3 characters"

    document.querySelector('.password-message').textContent = ""
  } else if (passwordInput.length < 5) {
    document.querySelector('.password-message').textContent = "Password can't be less than 5 characters"

    document.querySelector('.username-message').textContent = ""
  } else {
    document.querySelector('.username-message').textContent = ""
    document.querySelector('.password-message').textContent = ""

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

    window.location.href = "/"
  }
}

document.addEventListener('click', event => {
  switch (event.target.id) {
    case "sign-up-button":
      createMember()
      break
  }
})