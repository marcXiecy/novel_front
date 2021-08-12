
// var base_url = 'https://novel.musae.cc';
var base_url = 'http://novel.musae.xxx';
let source = wx.getStorageSync('source')
console.log(source)
if(!source || source == 'xbiquge'){
  var config = {
    base_url: base_url,
    //用户API
    apiCheckSession: base_url + '/api/wxusers/checkSession',  
    apiCode2Session: base_url + '/api/wxusers/code2session',
    apiAutoRegister: base_url + '/api/wxusers/autoRegister',
    apiGetCurrentUser: base_url + '/api/wxusers/getCurrentUser',
    apiupdateUser: base_url + '/api/wxusers/updateUser',
    apiupdateUserPhone: base_url + '/api/wxusers/updateUserPhone',
    //解析文章API
    // apiNovelSearch: base_url + '/api/novel/search',
    // apiNovelCatalog: base_url + '/api/novel/catalog',
    // apiNovelArticle: base_url + '/api/novel/article',
    // apiNovelInfo: base_url + '/api/novel/book_info',
    // apiNovelShelf: base_url + '/api/novel/shelf',
    // apiNovelAddToShelf: base_url + '/api/novel/shelf/add',
    // apiNovelRemoveFromShelf: base_url + '/api/novel/shelf/remove',
    // apiNovelCheckInShelf: base_url + '/api/novel/shelf/check',
    //解析文章API---笔趣阁
    apiNovelSearch: base_url + '/api/novel/biquge/search',
    apiNovelCatalog: base_url + '/api/novel/biquge/catalog',
    apiNovelSaveCatalog: base_url + '/api/novel/biquge/saveCatalog',
    apiNovelArticle: base_url + '/api/novel/biquge/article',
    apiNovelInfo: base_url + '/api/novel/biquge/book_info',
    apiNovelShelf: base_url + '/api/novel/biquge/shelf',
    apiNovelAddToShelf: base_url + '/api/novel/biquge/shelf/add',
    apiNovelRemoveFromShelf: base_url + '/api/novel/biquge/shelf/remove',
    apiNovelCheckInShelf: base_url + '/api/novel/biquge/shelf/check',
  
  }
}
else if(source == 'xbiquge5200'){
  var config = {
    base_url: base_url,
    //用户API
    apiCheckSession: base_url + '/api/wxusers/checkSession',  
    apiCode2Session: base_url + '/api/wxusers/code2session',
    apiAutoRegister: base_url + '/api/wxusers/autoRegister',
    apiGetCurrentUser: base_url + '/api/wxusers/getCurrentUser',
    apiupdateUser: base_url + '/api/wxusers/updateUser',
    apiupdateUserPhone: base_url + '/api/wxusers/updateUserPhone',
     //解析文章API---笔趣阁5200
     apiNovelSearch: base_url + '/api/novel/biquge5200/search',
     apiNovelCatalog: base_url + '/api/novel/biquge5200/catalog',
     apiNovelSaveCatalog: base_url + '/api/novel/biquge5200/saveCatalog',
     apiNovelArticle: base_url + '/api/novel/biquge5200/article',
     apiNovelInfo: base_url + '/api/novel/biquge5200/book_info',
     apiNovelShelf: base_url + '/api/novel/biquge5200/shelf',
     apiNovelAddToShelf: base_url + '/api/novel/biquge5200/shelf/add',
     apiNovelRemoveFromShelf: base_url + '/api/novel/biquge5200/shelf/remove',
     apiNovelCheckInShelf: base_url + '/api/novel/biquge5200/shelf/check',
  }
}

module.exports = config;