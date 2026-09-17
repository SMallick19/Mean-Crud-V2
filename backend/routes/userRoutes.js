
const express = require('express')
const {addUser, getUser, getSingleUser, updateUser, deleteUser} = require("./../handlers/userHandlers")
const router = express.Router()

router.post('/add-users', async(req, res) => {
    await addUser(req.body)
    res.send({
        status: 201,
        message: "user added successfully"
    })
})


router.get('/get-users', async(req, res) => {
    let data = await getUser()
    res.send({
        status: 200,
        message: "users get successfully",
        data: data
    })
})

router.get('/get-user/:id', async(req, res) => {
    let data = await getSingleUser(req.params["id"])
    res.send({
        status: 200,
        message: "users get successfully",
        data: data
    })
})

router.put('/update-user/:id', async(req, res) => {
    await updateUser(req.params["id"], req.body)
    res.send({
        status: 201,
        message: "users Updated successfully"
    })
})


router.delete('/delete-user/:id', async(req, res) => {
    await deleteUser(req.params["id"])
    res.send({
        status: 200,
        message: "users deleted successfully"
    })
})

module.exports = router