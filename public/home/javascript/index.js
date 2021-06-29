const blogsContainer=  document.querySelector('.blogs-container')

async function fetchingMember() {
  const responseFlow = await fetch('http://localhost:2485/member')
  const memberData = await responseFlow.json()

  theMember = memberData[memberData.length - 1]

  document.querySelector('.header-links-account').innerHTML = `${theMember.username}`

}

fetchingMember()

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