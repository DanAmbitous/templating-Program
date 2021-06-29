async function loginMember() {
  const responseFlow = await fetch('http://localhost:2485/member')
  const memberData = await responseFlow.json()

  const usernameInput = document.querySelector('#username').value
  const passwordInput = document.querySelector('#password').value

  memberData.forEach(member => {
    if (member.username === usernameInput && member.password === passwordInput) {

      console.log('Logged in!')
    } else {
      document.querySelector('.general-message').innerHTML = "Your username or password is incorrect"
      console.log(member.username === usernameInput + ` ${member.username}`)
      console.log(member.password === passwordInput)
    }
  })
}

document.addEventListener('click', event => {
  switch (event.target.id) {
    case "login-up-button":
      loginMember()
      break
  }
})