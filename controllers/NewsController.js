
const News = require('../models/NewsModel.js');
const TeamModel = require('../models/TeamModel.js');

const deleteAllTeamNews = (req, res, next) => {
    // Users.remove({}).exec();
    // res.redirect('/');
}

const getAllTeamNews = async (req, res, next) => {

}

const deleteNewsById = async (req, res, next) => {
    const id = req.params.id;
    let news = await News.findById(id).exec();
    await TeamModel.findOne(news.teamref, (error, team) => {
        let index = team.news.findIndex(t => t._id === id);
        team.news.splice(index, 1);
        team.save();
    }) 
    await News.deleteOne({_id: id}).exec();
    res.redirect('/teamdashboard/' + news.teamref)
};

const createOneTeamNews = async (req, res, next) => {
    let news = new News({
        title: req.body.title,
        text: req.body.text,
        important: req.body.important,
        teamref: req.body.teamref
    });

    await TeamModel.findByIdAndUpdate(req.body.teamref, {
        $push: {
            news: news
        }
    })
    // res.render('teamDashboard', {
    //     news: news,
    // })
    news = news.save();
    res.redirect('/teamdashboard/' + req.body.teamref);
}

const updateNewsView = async (req, res, next) => {
    // const id = req.params.id;
    // let user = await Users.findById(id);
    // res.render('updateUser', {user: user});
}

const updateNewsById = async (req, res, next) => {
    // const id = req.params.id;
    // let user = await Users.findByIdAndUpdate(id, {
    //     name: req.body.name,
    //     password: req.body.password,

    // });
    // res.redirect('/');
    // user.save((error, newuser) => {
    //     if (error) {
    //         console.log(error);
    //     }
    //     res.redirect('/');
    // });
}

module.exports = {
    getAllTeamNews,
    createOneTeamNews,
    deleteAllTeamNews,
    deleteNewsById,
    updateNewsView,
    updateNewsById
}