
// var base_url = 'https://novel.musae.cc';
var base_url = 'http://novel.musae.xxx';
let source = wx.getStorageSync('source')
console.log(source)
if(!source){
  source='dingdian';
}

  var config = {
    base_url: base_url,
    apiSourceEnums: base_url + '/api/enums/sources',  
    //用户API
    apiCheckSession: base_url + '/api/wxusers/checkSession',  
    apiCode2Session: base_url + '/api/wxusers/code2session',
    apiAutoRegister: base_url + '/api/wxusers/autoRegister',
    apiGetCurrentUser: base_url + '/api/wxusers/getCurrentUser',
    apiupdateUser: base_url + '/api/wxusers/updateUser',
    apiupdateUserPhone: base_url + '/api/wxusers/updateUserPhone',
    //解析文章API
    apiNovelSearch: base_url + '/api/novel/'+source+'/search',
    apiNovelCatalog: base_url + '/api/novel/'+source+'/catalog',
    apiNovelSaveCatalog: base_url + '/api/novel/'+source+'/saveCatalog',
    apiNovelArticle: base_url + '/api/novel/'+source+'/article',
    apiNovelInfo: base_url + '/api/novel/'+source+'/book_info',
    apiNovelShelf: base_url + '/api/novel/'+source+'/shelf',
    apiNovelAddToShelf: base_url + '/api/novel/'+source+'/shelf/add',
    apiNovelRemoveFromShelf: base_url + '/api/novel/'+source+'/shelf/remove',
    apiNovelCheckInShelf: base_url + '/api/novel/'+source+'/shelf/check',
  
  }


module.exports = config;