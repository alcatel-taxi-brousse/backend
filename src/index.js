import { app } from "./app.js"

import { PORT } from "./config.js"

const server = app.listen(PORT, () => {
  const host = server.address().address
  const port = server.address().port
  console.log(`Server started on  http://${host}:${port}`)
})
