// const { Db } = require('mongodb');
const TeamModel = require('../models/TeamModel.js');
const { userDashboard } = require('./UserController.js');

const Users = require('../models/UserModel.js');

const deleteAllTeams = (req, res, next) => {
    TeamModel.remove({}).exec();
    res.redirect('/');
}

const getAllTeams = async (req, res, next) => {
    TeamModel.find().lean().exec((error, teamList) => {
        console.log(teamList);
        const joinableTeams = teamList.map((team) => {
            console.log(team.members.includes(req.session.user._id.toString())); 
        })
        console.log(joinableTeams);
        res.render('joinTeam', {    
            user: req.session.user,
            teamList: teamList
        });
    });
    
}

// const teamDashboard = async (req, res, next) => {
//     const team = await TeamModel.findOne({_id: req.params.id});
//     // const list = await Nyhet.find({category: "VILL!!"}).exec();
//     console.log(req.session.user);
//     res.render('userDashboard', {
//         user: user
//     });
// }

const deleteTeamById = async (req, res, next) => {
    const id = req.params.id;
    await TeamModel.remove({_id: id}).exec();
    res.redirect('/');
};

const createOneTeamView = async (req, res, next) => {
    res.render('createTeam', {
        user: req.session.user
    });
}


const createOneTeam = async (req, res, next) => {

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

const updateTeamById = async (req, res, next) => {
    const id = req.params.id;
    let team = await TeamModel.findByIdAndUpdate(id, {
        name: team.name,
        members: team.members,
        news: team.news += {
            title: req.body.title,
            text: req.body.text,
            important: req.body.important
        }
    });
    res.redirect('/');
}

module.exports = {
    getAllTeams,
    createOneTeamView,
    createOneTeam,
    deleteAllTeams,
    deleteTeamById,
    updateTeamById
}