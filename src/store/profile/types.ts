export interface ProfileState {
  error: boolean;
  openPage: boolean;
  theme: ITheme;
  blogId: number;
}
export interface ITheme {
  dominant: number[];
  secondary: number[];
}
// mutations
export const DOMINANT_CHANGE =  'DOMINANT_CHANGE';
export const SECONDARY_CHANGE = 'SECONDARY_CHANGE';
export const OPENPAGE_CHANGE = 'OPENPAGE_CHANGE';
export const BLOGID_CHANGE = 'BLOGID_CHANGE';
export const THEME_CHANGE = 'THEME_CHANGE';
