export interface IServiceProxyOptions {
  basePath: string;
  requestMethodMap?: {
    [key: string]: string,
  };
}
