var db = require('./db');

module.exports= {
	
	validate: function(us, callback){
		var sql ="SELECT * FROM us where uname=? and password=?";
		db.getResults(sql, [us.uname,us.password], function(results){
            if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	
	insert: function(us, callback){
		var sql = "insert into us values(?,?,?,?,?)";
		db.execute(sql, [null, us.uname, us.contno,us.password, us.type], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getByUname: function(uname, callback){
		var sql = "select * from uss where uname=?";
		db.getResults(sql, [uname], function(results){
			if(results.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	

	getType: function(us, callback){
		var sql = "select * from us where uname=?";
		db.getResults(sql, [us.uname], function(results){
			if(results.length > 0){
				callback(true);
			}else{
				callback(null);
			}
		});
	}
}