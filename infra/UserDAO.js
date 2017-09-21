class UserDAO {
  constructor(user, connect) {
    this._User = user;
    this._connect = connect;
  }

  register(args, callback){
    this._connect();

    this._User.register(new this._User({username: args.user}), args.pswd, callback)
  }
}

module.exports = function() {
    return UserDAO
}
