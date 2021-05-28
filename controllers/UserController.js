// const { Db } = require('mongodb');
const Users = require('../models/UserModel.js');
const Team = require('../models/TeamModel.js');

const deleteAllUsers = (req, res, next) => {
    Users.remove({}).exec();
    res.redirect('/');
}

const getAllUsers = async (req, res, next) => {
    const userList = await Users.find({}).exec();
    // const list = await Nyhet.find({category: "VILL!!"}).exec();


    res.render('index', {
        userList: userList
    });
}

const userDashboard = async (req, res, next) => {
    const user = await Users.findOne({_id: req.params.id});
    const teams = await Team.find({members: req.params.id});
    // const list = await Nyhet.find({category: "VILL!!"}).exec();
    res.render('userDashboard', {
        user: user,
        teams: teams
    });
}

const userLogout = async (req, res, next) => {
    req.session.destroy((error) => {
        res.redirect('/')
    })
}

const userLogin = async (req, res, next) => {
    const user = await Users.findOne({name: req.body.name});
    // const list = await Nyhet.find({category: "VILL!!"}).exec();
    if (user && req.body.password === user.password) {
        req.session.regenerate((error) => {
            req.session.user = user;
            res.redirect('/dashboard/' + user._id);
        });
    } else if (!user) {
        console.log('fail user');
        res.send(`wrong username`)
    } else {
        console.log('fail password');
        res.redirect('/login');
    }
};

const deleteUserById = async (req, res, next) => {
    const id = req.params.id;
    await Users.remove({_id: id}).exec();
    res.redirect('/');
};

const createOneUser = async (req, res, next) => {
    if (await Users.findOne({name: req.body.name})) {
        let workingName = req.body.name + Math.floor(Math.random() * 100);
        res.send('exists alrdy! we suggest: ' + workingName + `<br><a href="/createuser"><div>BACK</div></a>`);
        return;
    }
    if (await Users.findOne({password: req.body.password})) {
        res.send(`password alrdy exists! <br><a href="/createuser"><div>BACK</div></a>`);
        return;
    }

    let user = new Users({
        name: req.body.name,
        password: req.body.password,
    });
        user.save((error, newuser) => {
            if (error) {
                console.log(error);
            }
            res.redirect('/');
            // res.redirect('/dashboard/' + newuser._id);
        });
    

    
};

const loginView = async (req, res, next) => {
    res.render('login', null)
}

const createUserView = async (req, res, next) => {
    res.render('createUser', null);
}

const updateUserView = async (req, res, next) => {
    const id = req.params.id;
    let user = await Users.findById(id);
    res.render('updateUser', {user: user});
}

const updateUserById = async (req, res, next) => {
    const id = req.params.id;
    let user = await Users.findByIdAndUpdate(id, {
        name: req.body.name,
        password: req.body.password,
    });
    res.redirect('/dashboard/' + user._id);
    // user.save((error, newuser) => {
    //     if (error) {
    //         console.log(error);
    //     }
    //     res.redirect('/');
    // });
}

module.exports = {
    getAllUsers,
    createOneUser,
    deleteAllUsers,
    deleteUserById,
    updateUserView,
    updateUserById,
    createUserView,
    userLogout,
    userLogin,
    loginView,
    userDashboard
}