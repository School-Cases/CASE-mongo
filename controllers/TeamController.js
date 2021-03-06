// const { Db } = require('mongodb');
const TeamModel = require('../models/TeamModel.js');
const {
    userDashboard
} = require('./UserController.js');

const Users = require('../models/UserModel.js');
const News = require('../models/NewsModel.js');

const deleteAllTeams = (req, res) => {
    TeamModel.deleteMany({}).exec();
    res.redirect('/');
}

const getAllTeams = async (req, res) => {
    const teamList = await TeamModel.find({
        members: {
            $ne: req.session.user._id
        }
    }).exec();
    res.render('joinTeam', {
        user: req.session.user,
        teamList: teamList
    });
}

const teamDashboard = async (req, res) => {
    const allNews = await News.find({}).exec();
    const team = await TeamModel.findOne({
        _id: req.params.id
    });
    let teammembers = await Users.find({
        team: team._id
    }).exec();
    res.render('teamDashboard', {
        team: team,
        user: req.session.user,
        allNews: allNews,
        teammembers: teammembers
    });
}

const deleteTeamById = async (req, res) => {
    const id = req.params.id;
    await Users.find({
        team: id
    }, (error, users) => {
        users.forEach(user => {
            let index = user.team.findIndex(t => t._id === id);
            user.team.splice(index, 1);
            user.save();
        })
    });
    await TeamModel.deleteOne({
        _id: id
    }).exec();
    res.redirect('/dashboard/' + req.session.user._id);
};

const createOneTeamView = async (req, res) => {
    res.render('createTeam', {
        user: req.session.user
    });
}


const createOneTeam = async (req, res) => {

    let team = new TeamModel({
        name: req.body.name,
        admin: req.body.userId,
        members: req.body.userId,
    });

    await Users.findByIdAndUpdate(req.body.userId, {
        $push: {
            team: team._id
        }
    })
    res.render('userDashboard', {
        team: team,
    })
    team = team.save();

    res.redirect('/dashboard/' + req.session.user._id);
}

const updateTeamById = async (req, res) => {
    const id = req.params.id;
    let team = await TeamModel.findByIdAndUpdate(id, {
        name: req.body.name
    });
    res.redirect('/teamdashboard/' + id);
}

const updateTeamView = async (req, res) => {
    const id = req.params.id;
    let team = await TeamModel.findById(id);
    let teammembers = await Users.find({
        team: id
    }).exec();
    res.render('updateTeam', {
        user: req.session.user,
        team: team,
        teammembers: teammembers
    });
}

const kickMemberById = async (req, res) => {
    const id = req.params.id;
    await TeamModel.findById(req.params.teamid, (error, team) => {
        let index = team.members.findIndex(m => m._id === id);
        team.members.splice(index, 1);
        team.save();
    })
    await Users.findById(id, (error, user) => {
        let index = user.team.findIndex(t => t._id === req.params.teamid);
        user.team.splice(index, 1);
        user.save();
    })
    res.redirect('/updateteam/' + req.params.teamid)
}

module.exports = {
    getAllTeams,
    createOneTeamView,
    createOneTeam,
    deleteAllTeams,
    deleteTeamById,
    updateTeamById,
    teamDashboard,
    updateTeamView,
    kickMemberById
}