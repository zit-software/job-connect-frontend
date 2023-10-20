export interface User {
	id: number;
	fullName: string;
	email: string;
	image: string;
	phoneNumber: string;
	userRole: 'APPLICANT' | 'RECRUITER';
	gender: 'MALE' | 'FEMALE';
	role: 'USER' | 'ADMIN';
	dob: string | Date;
}
