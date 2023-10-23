export enum UserUserRole {
	APPLICANT = 'APPLICANT',
	RECRUITER = 'RECRUITER',
}

export enum UserGender {
	MALE = 'MALE',
	FEMALE = 'FEMALE',
}

export enum UserRole {
	USER = 'USER',
	ADMIN = 'ADMIN',
}

export interface User {
	id: number;
	fullName: string;
	email: string;
	image: string;
	phoneNumber: string;
	userRole: UserUserRole;
	gender: UserGender;
	role: UserGender;
	dob: string | Date;
}
