// GET /
function home(req, res) {  
  res.render('index');
}

function profile(req, res) {
	res.render('profile');
}

function search(req, res){
	res.render('search');
}

// function searchResults(req, res){
// 	res.render('searchResults');
// }

module.exports = {
  home: home,
  profile: profile,
  search: search,
  // searchResults: searchResults
};
