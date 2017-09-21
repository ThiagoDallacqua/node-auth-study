class CommentDAO {
  constructor(comment, connect) {
    this._Comment = comment;
    this._connect = connect;
  }

  create(args, callback){
    this._connect();

    this._Comment.create(new this._Comment(args, callback))
  }

  list(args, callback){
    this._connect();

    this._Comment.find({"user.id": {$eq: args}}, callback);
  }
}

module.exports = function() {
    return CommentDAO
}
