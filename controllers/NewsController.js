
const News = require('../models/NewsModel.js');

const deleteAllTeamNews = (req, res, next) => {
    // Users.remove({}).exec();
    // res.redirect('/');
}

const getAllTeamNews = async (req, res, next) => {
    // const userList = await Users.find({}).exec();
    // const list = await Nyhet.find({category: "VILL!!"}).exec();


    // res.render('index', {
    //     userList: userList
    // });
}

const deleteNewsById = async (req, res, next) => {
    // const id = req.params.id;
    // await News.remove({_id: id}).exec();
    // res.redirect('/');
};

const createOneTeamNews = (req, res, next) => {
    // const body = req.body;
    // const success = require('../models/Quote.js').createOne(body);
    // if (success) {
    //     res.redirect('/');
    // } else {
    //     res.status(400).json({message: "nyhet failed create"})
    // }
    // let user = new Users({
    //     name: req.body.name,
    //     password: req.body.password,
        // team: req.body.team

        // name: "håkan",
        // password: "hehehe",
        // team: ["60ad311702646f4d1c487eab"],
        // admin: ["60ad311702646f4d1c487eab"],
    // });
    // user.save((error, newuser) => {
    //     if (error) {
    //         console.log(error);
    //     }
    //     res.redirect('/');
    // });
    
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