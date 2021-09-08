export const TITLE_REGEX = /^[~`!@#$%^&*()_+=[\]\\{}|;':", ./<>?a-zA-Z0-9-]+$/;
export const PASSWORD_REGEX =
  /^[~`!@#$%^&*()_+=[\]\\{}|;':",./<>?a-zA-Z0-9-]+$/;
export const MENTION_REGEX = new RegExp(/(@.*?\))/);
export const MENTION_CONTENTS_REGEX = new RegExp(/@\[(.*?)\]\((.*?)\)/);
