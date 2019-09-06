import {createProxy} from '@/api/BaseService';
import {IPageResult} from '@/interface/IBase';
import {ITheme} from '@/store/profile/types';

export interface IBlogItem {
  id: number;
  cover: string;
  headImage: string;
  tags: string[];
  hidden: boolean;
  type: number;
  title: string;
  describe: string;
  body: string;
  author: string;
  theme: ITheme;
  createTime: Date;
  updateTime: Date;
}
interface IBlog {
  list(): IPageResult<IBlogItem>;
}
export default createProxy<IBlog, IPageResult<IBlogItem>>({
  basePath: 'blogs',
  requestMethodMap: {
  },
});
