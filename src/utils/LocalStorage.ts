const SPLIT_STR = '@';
const localStorage = window.localStorage;
interface IObject {
  [key: string]: any;
}
const DATA_PROCESS_MAPPING: IObject = {
  number: {
    save : (data: number) => data,
    parse: (data: string) => Number.parseFloat(data),
  },
  object: {
    save : (data: object) => JSON.stringify(data),
    parse: (data: string) => JSON.parse(data),
  },
  default: {
    save : (data: any) => data,
    parse: (data: any) => data,
  },
};
class LocalStorage {
  getProcess(type: string): any {
    return DATA_PROCESS_MAPPING[type] || DATA_PROCESS_MAPPING[String('default')];
  }
  get(key: string) {
    const stringData = localStorage.getItem(key);
    if (stringData) {
      const dataArray: any[] = stringData.split('@');
      let data;
      const now = Date.now();
      if (dataArray.length > 2 && dataArray[2] < now) { // 缓存过期
        localStorage.removeItem(key);
        return null;
      } else {
        data = this.getProcess(dataArray[0]).parse(dataArray[1]);
        return data;
      }
    }
    return null;
  }
  put(key: string, value: any, expired?: number) { // expired 过期时间 单位天 默认是100 上线测试没问题替换旧的设值
    const type = typeof value;
    const process = this.getProcess(type);
    if (!expired) { // 默认不传 不过期
      value = type + SPLIT_STR + process.save(value);
    } else {
      const time = expired * 24 * 60 * 60 * 1000 + new Date().getTime();
      value = type + SPLIT_STR + process.save(value) + SPLIT_STR + time;
    }
    localStorage.setItem(key, value);
  }
  clear() {
    localStorage.clear();
  }
  remove(key: string) {
    localStorage.removeItem(key);
  }
}
export default new LocalStorage();
