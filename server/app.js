const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

app.get('/',(req,res) => {
    const data = "Hello from the react server"
    res.json(data)
})



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started at: \http://localhost:${PORT}`);
});