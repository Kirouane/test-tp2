/**
 *
 * @param db
 * @constructor
 */
var UserRepository = function (db) {
    this.db = db;
};

/**
 *
 * @param {User} user
 */
UserRepository.prototype.create = function (user) {
    if (!user) {
        throw 'User object is undefined';
    }

    if (!user.id || !user.firstname || !user.lastname || !user.birthday) {
        throw 'User object is missing information';
    }

    var userData = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        birthday: user.birthday
    };

    this.db
        .get('users')
        .push(userData)
        .write()
};

/**
 *
 * @param {number} id
 * @return User
 */
UserRepository.prototype.findOneById = function (id) {

    if(!id) throw "Missing user ID";

    console.log("SEARCHING FOR USER WITH ID : " + id);
    var user = this.db.get('users').find({id: id}).value();
    if(user != null) return user;
    throw "Requested user doesn't exist";
};

/**
 *
 * @param {User} user
 */
UserRepository.prototype.update = function (user) {

};

/**
 *
 * @param {number} id
 */
UserRepository.prototype.delete = function (id) {

};


module.exports = UserRepository;


