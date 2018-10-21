import express from 'express';
import UserService from "../services/user_service";
let router = express.Router();
let userService = new UserService();

router.get('/', async (req, res, next) => {
    let users = await userService.getAll();
    res.render('users',{
        layout: 'container',
        container : {
            title: 'User List'
        },
        users
    });
});

router.post('/new', async (req, res, next) => {
    let {name,status,email} = req.body;
    let users = await userService.addUser(name,status,email);
    res.redirect('/users');
});

export default router;
