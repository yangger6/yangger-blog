import {createProxy} from '@/api/BaseService';
import {IPageResult} from '@/interface/IBase';
import {ITheme} from '@/store/profile/types';

export interface IBlogItem {
  id: number;
  currentId: number; // TODO 界面设计上的需要，后期可能会改
  cover: string;
  headImage: string;
  tags: string[];
  hidden: boolean;
  type: number;
  title: string;
  describe: string;
  body: string;
  author: string;
  html: string;
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
