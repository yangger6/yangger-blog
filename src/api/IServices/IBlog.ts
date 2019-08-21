import {createProxy} from '@/api/BaseService';

interface IBlog {
  list(): void;
}
export default createProxy<IBlog, any>({
  basePath: 'blogs',
  requestMethodMap: {
  },
});
