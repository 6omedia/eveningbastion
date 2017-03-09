module.exports = {

	get_config_vars: function(){
		return {
			env_database: "mongodb://localhost:27017/eveningbastion",
			env_bucket: '6omedia',
			env_aws_access_key: '',
			env_aws_secret_key: '',
			env_port: '3000'
		}
	}

};