import dayjs from 'dayjs';

export interface IUser {
  id?: number;
  externalUserId?: string | null;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  registeredDate?: dayjs.Dayjs | null;
  lastLoginTime?: dayjs.Dayjs | null;
}

export const defaultValue: Readonly<IUser> = {};
