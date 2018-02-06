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
    if (!id) {
        throw "User id is undefined";
    }

    var user = this.db
                    .get('users')
                    .find({'id': id})

    if (!user) {
        throw "User does not exist";
    }

    return user.value();
};

/**
 *
 * @param {User} user
 */
UserRepository.prototype.update = function (user) {
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

    var find = this.db
        .get('users')
        .find({'id': userData.id})

    if(!find){
        throw "User does not exist"
    }

    find.assign(userData)
        .write()
};

/**
 *
 * @param {number} id
 */
UserRepository.prototype.delete = function (id) {
    if(!id) {
        throw "User id is undefined"
    }
    this.db
        .get('users')
        .remove({'id': id})
        .write()
};


module.exports = UserRepository;


