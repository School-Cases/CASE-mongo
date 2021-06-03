// const { Db } = require('mongodb');
const Users = require('../models/UserModel.js');
const Team = require('../models/TeamModel.js');
// const TeamModel = require('../models/TeamModel.js');

const bcrypt = require('bcryptjs');

const deleteAllUsers = (req, res) => {
    Users.deleteMany({}).exec();
    res.redirect('/');
}

const getAllUsers = async (req, res) => {
    const userList = await Users.find({}).exec();

    res.render('index', {
        userList: userList
    });
}

const userDashboard = async (req, res) => {
    // const user = await Users.findOne({_id: req.params.id});
    const teams = await Team.find({members: req.params.id});
    // const list = await Nyhet.find({category: "VILL!!"}).exec();
    res.render('userDashboard', {
        user: req.session.user,
        teams: teams,
    });
}

const loggedInNav = async (req, res) => {
    res.render('navigationLoggedIn', {
        user: req.session.user
    })
};

const userLogout = async (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/')
    })
}

const userLogin = async (req, res) => {

    const user = await Users.findOne({name: req.body.name});
    if (!user) {
        req.session.message = {type: "Fail", message: "Cant find user: " + req.body.name};
        return res.redirect('/');
    }

    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if (correctPassword) {
        req.session.regenerate((error) => {
            req.session.user = user;
            res.redirect('/dashboard/' + user._id);
        });
    } else {
        req.session.message = {type: "Fail", message: "Wrong password"};
        res.redirect('/');
    }
};

const deleteUserById = async (req, res) => {
    const id = req.params.id;
    await Users.deleteOne({_id: id}).exec();
    res.redirect('/');
};

// flashmsgs
const createOneUser = async (req, res) => {
    if (await Users.findOne({name: req.body.name})) {
        let workingName = req.body.name + Math.floor(Math.random() * 100);
        req.session.message = {type: "Fail", message: "username exists alrdy! we suggest: " + workingName};
        res.redirect('/createuser');
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let user = new Users({
        name: req.body.name,
        password: hashedPassword,
    });
        user.save((error, newuser) => {
            if (error) {
                console.log(error);
            }
            req.session.regenerate((error) => {
                req.session.user = user;
                res.redirect('/dashboard/' + user._id);
            });
        });
    

    
};

const loginView = async (req, res) => {
    res.render('login', {message: req.session.message})
}

const createUserView = async (req, res) => {
    res.render('createUser', {message: req.session.message});
}

const updateUserView = async (req, res) => {
    const id = req.params.id;
    let user = await Users.findById(id);
    res.render('updateUser', {user: user});
}

const updateUserById = async (req, res) => {
    const id = req.params.id;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    let user = await Users.findByIdAndUpdate(id, {
        name: req.body.name,
        password: hashedPassword,
    });
    res.redirect('/dashboard/' + user._id);
}

const joinTeamById = async (req, res) => {
    let team = await Team.findByIdAndUpdate(req.params.id, {
        $push: {
            members: await Users.findById(req.session.user._id)
        }
    });
    let user = await Users.findByIdAndUpdate(req.session.user._id, {
        $push: {
            team: team._id
        }
    }); 
    res.redirect('/dashboard/' + user._id);
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
    userDashboard,
    joinTeamById,
    loggedInNav
}