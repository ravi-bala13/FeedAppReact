class PostResponse {
  _postId = null;
  _username = null;
  _content = null;
  _likes = 0;
  _isUserLiked = false;

  //   constructor(username, content, likes, isUserLiked) {
  //     this.username = username;
  //     this.content = content;
  //     this.likes = likes;
  //     this.isUserLiked = isUserLiked;
  //   }
  constructor() {}

  set postId(id) {
    this._postId = id;
  }

  get postId() {
    return this._postId;
  }

  set username(username) {
    this._username = username;
  }

  get username() {
    return this._username;
  }

  set content(content) {
    this._content = content;
  }

  get content() {
    return this._content;
  }

  set likes(likes) {
    this._likes = likes;
  }

  get likes() {
    return this._likes;
  }

  set isUserLiked(isUserLiked) {
    this._isUserLiked = isUserLiked;
  }

  get isUserLiked() {
    return this._isUserLiked;
  }
}

module.exports = PostResponse;
