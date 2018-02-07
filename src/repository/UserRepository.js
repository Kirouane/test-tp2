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
        .write();
};

/**
 *
 * @param {number} id
 * @return User
 */
UserRepository.prototype.findOneById = function (id) {
    if(id === undefined){
        throw 'id parameter is undefined';
    }

    if(!(typeof id === "number") || Math.floor(id) !== id || id < 0){
        throw 'Invalid id parameter';
    }

    return this.db
        .get('users')
        .find({'id' : id})
        .value();
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


