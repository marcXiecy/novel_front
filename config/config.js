
// var base_url = 'https://novel.musae.cc';
var base_url = 'http://novel.musae.xxx';
const config = {
  base_url: base_url,
  //用户API
  apiCode2Session: base_url + '/api/wxusers/code2session',
  apiAutoRegister: base_url + '/api/wxusers/autoRegister',
  apiGetCurrentUser: base_url + '/api/wxusers/getCurrentUser',
  apiupdateUser: base_url + '/api/wxusers/updateUser',
  apiupdateUserPhone: base_url + '/api/wxusers/updateUserPhone',
  //解析文章API
  apiNovelSearch: base_url + '/api/novel/search',
  apiNovelCatalog: base_url + '/api/novel/catalog',
  apiNovelArticle: base_url + '/api/novel/article',
  apiNovelInfo: base_url + '/api/novel/book_info',
  apiNovelShelf: base_url + '/api/novel/shelf',
  apiNovelAddToShelf: base_url + '/api/novel/shelf/add',
  apiNovelRemoveFromShelf: base_url + '/api/novel/shelf/remove',
  apiNovelCheckInShelf: base_url + '/api/novel/shelf/check',
}

module.exports = config;