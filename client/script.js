const btnExec = document.getElementById('exec')
const inputQuery = document.getElementById('query')
const rootRes = document.getElementById('res')
//SELECT [innerHTML] FROM https://getbootstrap.com/docs/5.2/examples/ WHERE [h3.h5] LIKE ^navbar
btnExec.addEventListener('click', () => {
  const query = inputQuery.value.trim()
  rootRes.innerHTML = ''
  fetch('http://localhost:8000', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: query
  })
  .then(data => data.json())
  .then(data => {
    rootRes.innerHTML = ''
    if (data.err) throw new Error(data.err)
    const res = data.result

    for (const key of Object.keys(res)) {
      const h3 = document.createElement('h3')
      h3.innerText = key
      const list = document.createElement('div')
      for (const value of res[key]) {
        const div = document.createElement('div')
        div.classList.add('mx-2')
        div.innerText = value
        list.append(div)
      }
      rootRes.append(h3)
      rootRes.append(list)
    }
  })
  .catch(e => {
    const text = document.createElement('div')
    text.classList.add('text-danger', 'fs-3')
    text.innerText = e.message
    rootRes.append(text)
  })
})