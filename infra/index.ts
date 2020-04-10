import { fetchMe } from './user/UserClient';

export const infrastructure = {
  user: {
    fetchMe,
  },
};

export type Infrastructure = typeof infrastructure;
