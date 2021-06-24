const blogsContainer=  document.querySelector('.blogs-container')

async function fetchingBlogs() {
  const responseFlow = await fetch('http://localhost:2485/blog')
  const blogData = await responseFlow.json()

  blogData.forEach(blog => {
    const li = document.createElement('li')
    li.innerHTML = `  <li>
    <div class="blog-container">
      <h2 class="blog-title">${blog.title}</h2>
      <p class="blog-content">${blog.content}</p>
      <sub class="blog-author">${blog.author} <span class="blog-date"><em>${blog.postedDate}</em></span></sub>
    </div>
    </li>`

    blogsContainer.append(li)
  })
}

fetchingBlogs()