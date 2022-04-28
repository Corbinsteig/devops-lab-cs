const express = require('express')
const path = require('path')

const app = express()
app.use(express.json())

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '2b72c7aa82ec46a6a0f120b91e14b806',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')
app.use(rollbar.errorHandler())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
    rollbar.info('html file served successfully.')
})

app.get('/error', (req, res) => {
  try {
    madeUp()
  } catch (err) {
  rollbar.error('invalid function')
  rollbar.critical('invalid function')
  // rollbar.warning("Facebook API unavailable")
  rollbar.info("User logged in")
  // rollbar.debug("Cron job starting")
  }
})


const port = process.env.PORT || 5050

app.listen(port, () => console.log(`Take us to warp ${port}!`))