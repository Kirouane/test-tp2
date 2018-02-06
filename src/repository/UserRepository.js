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
        throw 'User id is undefined';
    }
    if (!this.db
        .get('users')
        .find({id: id})
        .value()){
            throw "User id doesn't exist";
    }
    return this.db
        .get('users')
        .find({id: id})
        .value()
};

/**
 *
 * @param {User} user
 * @return user
 */
UserRepository.prototype.update = function (user) {
    if (!user) {
        throw 'User object is undefined';
    }
    if (!user.id) {
        throw 'User id is undefined';
    }    
    if (!user.firstname && !user.lastname && !user.birthday) {
        throw 'Need at least one user information to update';
    }
    if (!this.db
        .get('users')
        .find({id: user.id})
        .value()){
            throw "User id doesn't exist";
    }

    if (user.firstname){
        this.db
        .get('users')
        .find({id: user.id})
        .assign({firstname: user.firstname})
        .write()
    }
    if (user.lastname){
        this.db
        .get('users')
        .find({id: user.id})
        .assign({lastname: user.lastname})
        .write()
    }
    if (user.birthday){
        this.db
        .get('users')
        .find({id: user.id})
        .assign({birthday: user.birthday})
        .write()
    }

    return this.db
        .get('users')
        .find({id: user.id})
        .value()

};

/**
 *
 * @param {number} id
 */
UserRepository.prototype.delete = function (id) {
    var user = this.findOneById(id);
    return this.db
        .get('users')
        .remove(user)
        .write()
};


module.exports = UserRepository;


