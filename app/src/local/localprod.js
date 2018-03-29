import Express from 'express'
import path from 'path'

// React setup
import { matchPath } from 'react-router-dom'

// Import required modules
// import { routes } from './src/router'

const buildDir = '../../dist'
const PUBLIC_PATH = '/my-app'

const portToUse = 5000

const routes = [
  {
    exact: true,
    path: '/'
  }
]

console.log('Serving the following routes only:')
routes.forEach(route => {
  route.path = `${PUBLIC_PATH}${route.path}`
  console.log(route.path)
})

// Initialize the Express App
const app = new Express()

app.enable('strict routing')
app.use(PUBLIC_PATH, Express.static(path.join(__dirname + '/' + buildDir)))

app.use((req, res, next) => {
  const matchFound = routes.find(route => {
    const match = matchPath(req.url.replace(/[?].+$/, ''), route)
    return match
  })
  if (matchFound) {
    return res.status(200).sendFile(path.join(__dirname + '/' + buildDir + '/index.html'))
  } else {
    return res.status(404).end()
  }
})

// start app
app.listen(portToUse, (error) => {
  const serverName = 'Prod Code'
  if (!error) {
    console.log(`${serverName} is running on port: ${portToUse}!`) // eslint-disable-line
  }
})

export default app
