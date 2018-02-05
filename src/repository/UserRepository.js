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
  return this.db.get('users')
          .find({ id: id })
          .value()
};

/**
 *
 * @param {User} user
 */
UserRepository.prototype.update = function (user) {
  usr = this.db.get('users')
          .find({ id: id })
  usr.firstname = user.firstname;
  usr.lastname = user.lastname;
  usr.birthday = user.birthday;
  usr.write();
};

/**
 *
 * @param {number} id
 */
UserRepository.prototype.delete = function (id) {
  this.db.get('users')
          .remove({ id: id })
          .write();
};


module.exports = UserRepository;