import express from 'express'
import cors from 'cors'
import axios from 'axios'

var app = express()
app.use(cors({ credentials: true, origin: true }))
app.use(express.json())

app.get('/citizen', (req, res) => {
    //console.log("request")
    //console.log(req.headers.authorization)
    var url = 'http://172.20.98.31:8080' + '/citizen'

    axios
        .get(url, {
            headers: {
                Authorization: req.headers.authorization,
            },
        })
        .then((response) => {
            res.send(response.data)
        })
})

app.post('/codes/add', (req, res) => {
    var url = 'http://172.20.98.31:8080' + '/codes/add'
    console.log(req.body)
    axios
        .post(
            url,
            {
                code: req.body.code,
            },
            {
                headers: {
                    Authorization: req.headers.authorization,
                },
            }
        )
        .then((response) => {
            res.send(response.data)
        })
        .catch((err) => console.log(err))
    res.send('ok')
})
app.listen(3030, () => console.log(`Example app listening on port 3030!`))
