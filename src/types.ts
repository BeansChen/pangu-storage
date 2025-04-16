export interface StorageConfig {
  prefix?: string; // 存储键前缀
  encrypt?: boolean; // 是否启用加密
  encryptFn?: (data: string) => string; // 自定义加密函数
  decryptFn?: (data: string) => string; // 自定义解密函数
  timeout?: number; // 默认过期时间（毫秒）
}

export interface StorageItem<T = any> {
  value: T; // 存储的值
  expire?: number; // 过期时间戳
  timestamp: number; // 存储时间戳
}

export interface StorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
  keys(): Promise<string[]>;
}

export interface StorageAPI {
  get<T = any>(key: string): Promise<T | null>;
  set<T = any>(key: string, value: T, expire?: number): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
  keys(): Promise<string[]>;
  has(key: string): Promise<boolean>;
  getWithExpire<T = any>(key: string): Promise<{ value: T | null; expire?: number }>;
}

export type Platform = 'web' | 'wechat' | 'alipay' | 'auto';
