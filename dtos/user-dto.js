module.exports = class UserDto {
	id;
	userName;
	roleList;
	constructor (userInfo){
		this.id = userInfo.id;
		this.userName = userInfo.userName;
		this.roleList = userInfo.roleList;
	}

}