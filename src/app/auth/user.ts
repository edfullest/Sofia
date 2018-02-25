export interface Roles{
  professor?: boolean;
  student?: boolean;
}

export interface User{

  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
  roles: Roles;
}
