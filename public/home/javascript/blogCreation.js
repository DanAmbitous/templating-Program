async function createBlog() {
  const blogTitle = document.querySelector('#blog-title').value
  const blogContent = document.querySelector('#blog-content').value

  const fetchingData = await fetch('http://localhost:2485/blog') 
  const blogsData = await fetchingData.json()

  let titleChecker = false

  blogsData.forEach(blog => {
    if (blog.title.includes(blogTitle)) {
      titleChecker = true
    } else {
      titleChecker = false
    }
  })

  if (!titleChecker) {
    document.querySelector('.user-blog-title-informer').textContent = ``

    console.log(document.querySelector('#blog-content').value.length)

    const responseFlow = await fetch('http://localhost:2485/member')
    const memberData = await responseFlow.json()
  
    theMember = memberData[memberData.length - 1]

    if (document.querySelector('#blog-content').value.length > 50) {
      const data = { title: blogTitle, author: theMember.username, content: blogContent, postedDate: todaysDate()  }

      await fetch('http://localhost:2485/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      document.querySelector('.user-blog-content-informer').textContent = ``

      window.location.href = "/"
    } else {
      document.querySelector('.user-blog-content-informer').textContent = `Your blog needs at least ${50 - Number(document.querySelector('#blog-content').value.length)} characters more`
    }
  } else {
    document.querySelector('.user-blog-title-informer').textContent = `The title of ${blogTitle} already exists`
  }
}

function todaysDate() {
  let today = new Date()
  // padStart replaces a string with a different character or even adds extra characters 
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
  let dd = String(today.getDate()).padStart(2, '0')
  let mm = String(today.getMonth() + 1).padStart(2, '0')
  let yyyy = today.getFullYear()

  today = mm + '/' + dd + '/' + yyyy

  return today
}

document.addEventListener('click', event => {
  switch (event.target.id) {
    case "post-the-blog":
      createBlog()
      break
  }
})

document.addEventListener('keyup', event => {
  switch (event.target.id) {
    case "blog-content":
      amountOfRequiredCharacters()
      break
  }
})

function amountOfRequiredCharacters() {
  let amountOfCharacters = document.querySelector('#blog-content').value.length

  document.querySelector('.amount-of-characters-required-left').innerHTML = Math.abs(amountOfCharacters - 50)
}