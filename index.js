const Parser = require('./Parser')
const http = require('http')

const host = 'localhost'
const port = 8000

const requestListener = (req, res) => {
  let data = ''
  req.on('data', chunk => {
    data += chunk
  })

  req.on('end', async () => {
    try {
      const result = await Parser.exec(data)
      res.writeHead(200, { 'Access-Control-Allow-Origin': '*' })
      res.end(JSON.stringify({result}))
    } catch (e) {
      res.writeHead(400, { 'Access-Control-Allow-Origin': '*' })
      res.end(JSON.stringify({err: e.message}))
    }
  })
}

const server = http.createServer(requestListener)
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})