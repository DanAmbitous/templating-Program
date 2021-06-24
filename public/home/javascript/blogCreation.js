async function createBlog() {
  const blogTitle = document.querySelector('#blog-title').value
  const blogContent = document.querySelector('#blog-content').value

  const data = { title: blogTitle, author: 'The Author', content: blogContent, postedDate: todaysDate()  }

  await fetch('http://localhost:2485/blog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
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