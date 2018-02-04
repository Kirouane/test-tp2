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
    if(!id)
        throw 'Parameter id is required';

    var finded = this.db.get('users')
            .find({ id: id })

    return finded.value();
};

/**
 *
 * @param {User} user
 */
UserRepository.prototype.update = function (user) {
     if(!user)
        throw 'Parameter user is required';

    this.db
        .get('users')
        .find({ id: user.id })
        .assign(user)
        .write()

};

/**
 *
 * @param {number} id
 */
UserRepository.prototype.delete = function (id) {

};


module.exports = UserRepository;


