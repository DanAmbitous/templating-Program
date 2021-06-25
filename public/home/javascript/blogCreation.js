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

  console.log(titleChecker)

  if (!titleChecker) {
    const data = { title: blogTitle, author: 'The Author', content: blogContent, postedDate: todaysDate()  }

    await fetch('http://localhost:2485/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    document.querySelector('.user-blog-title-informer').textContent = ``
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