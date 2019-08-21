export interface ProfileState {
  error: boolean;
  schema: ISchema;
}
export interface ISchema {
  dominant: string;
  secondary: string;
  openPage: boolean;
}
// mutations
export const DOMINANT_CHANGE =  'DOMINANT_CHANGE';
export const SECONDARY_CHANGE = 'SECONDARY_CHANGE';
export const OPENPAGE_CHANGE = 'OPENPAGE_CHANGE';
