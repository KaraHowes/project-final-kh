import mongoose from "mongoose"

export const MemberSchema = new mongoose.Schema({
	membername: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	accessToken: {
		type: String,
		default: () => crypto.randomBytes(128).toString('hex'),
	},
	email: {
		type: String,
		required: true,
		trim: true,
	},
	location: {
		type: String,
		
	},
	status: {
		type: String,
		reuired: true,
	}
	
});
