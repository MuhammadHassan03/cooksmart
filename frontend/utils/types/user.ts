export interface User {
  id: string;
  fullName: string;
  email: string;
  user_metadata: any;
  preferences?: { diet: string[]; allergies: string[]; cuisines: string[] };
}


