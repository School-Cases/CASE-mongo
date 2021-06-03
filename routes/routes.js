// const express = require('express');
// const {getAll, createOne} = require('../controllers/Quote.js');


// const router = express.Router();

// router.get('/', getAll);

// router.get('/createone', createOne);

// module.exports = {
//     routes: router
// }



// test
const express = require('express');

const {
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
} = require('../controllers/UserController.js');

const {
    getAllTeams,
    createOneTeamView,
    createOneTeam,
    deleteAllTeams,
    deleteTeamById,
    updateTeamById,
    updateTeamView,
    teamDashboard,
    kickMemberById
} = require('../controllers/TeamController.js');

const {
    getAllTeamNews,
    createOneTeamNews,
    deleteAllTeamNews,
    deleteNewsById,
    updateNewsView,
    updateNewsById
} = require('../controllers/NewsController.js');

const { Router } = require('express');

const router = express.Router();

// user

router.get('/', loginView);

router.get('/users', getAllUsers);

router.post('/login', userLogin);

router.get('/logout', userLogout);

router.get('/dashboard/:id', userDashboard);

router.get('/deleteallusers', deleteAllUsers);

router.get('/deleteuser/:id', deleteUserById);

router.post('/createoneuser', createOneUser);

router.get('/createuser', createUserView);

router.get('/update/:id', updateUserView);

router.post('/updatesaveuser/:id', updateUserById);

router.get('/jointeam/:id', joinTeamById);

// team

router.get('/teams', getAllTeams);

router.get('/teamdashboard/:id', teamDashboard);

router.get('/deleteallteams', deleteAllTeams);

router.get('/deleteteam/:id', deleteTeamById);

router.get('/createteam', createOneTeamView);

router.post('/createoneteam', createOneTeam);

router.get('/updateteam/:id', updateTeamView);

router.post('/updatesaveteam/:id', updateTeamById);

router.get('/kickmember/:teamid/:id', kickMemberById);

// news

router.get('/team/:id/news', getAllTeamNews);

router.get('/deleteallteamnews', deleteAllTeamNews);

router.get('/deletenews/:id', deleteNewsById);

router.get('/updatenews', updateNewsView);

router.post('/createteamnews', createOneTeamNews);

router.post('/updatenews/:id', updateNewsById);

module.exports = {
    routes: router
}