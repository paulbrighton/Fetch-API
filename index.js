document.getElementById('getText').addEventListener('click', getText)
document.getElementById('getJson').addEventListener('click', getJson)
document.getElementById('getApiData').addEventListener('click', getPosts)
document.getElementById('addPost').addEventListener('submit', addPost)

// Gets text from the sample.txt file using the Fetch API
function getText () {
  fetch('sample.txt')
    .then(function (res) {
      return res.text()
    })
    .then(function (data) {
      document.getElementById('output').innerHTML = data
    })
}

// Outputs the data from users.json file
function getJson () {
  fetch('users.json')
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {
      var output = '<h2>Users</h2>'
      data.forEach(function (user) {
        output += `
          <ul class="list-group mb-5">
            <li class="list-group-item">ID: ${user.id}</li>
            <li class="list-group-item">Name: ${user.name}</li>
            <li class="list-group-item">Email: ${user.email}</li>
          </ul>
        `
      })
      document.getElementById('json-data').innerHTML = output
    })
}

// Outputs the posts from the json placeholder api
function getPosts () {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {
      var output = '<h2>Posts</h2>'
      data.forEach(function (post) {
        output += `
          <div class="card card-body mb-5">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
          </div>
        `
      })
      document.getElementById('api-data').innerHTML = output
    })
}

// Adds a new post to the json placeholder api but only logs it in console
function addPost (e) {
  e.preventDefault()

  var title = document.getElementById('title').value
  var body = document.getElementById('body').value

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ title: title, body: body })
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {
      console.log(data)
      resetForm()
    })
}

function resetForm () {
  document.getElementById('addPost').reset()
}
