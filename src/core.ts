import type { StorageAdapter, StorageAPI, StorageConfig, StorageItem } from './types';
import { isPrimitive, serialize, deserialize } from './utils';

/**
 * 统一存储库实现类，提供跨平台的存储管理功能
 */
export class Storage implements StorageAPI {
  private readonly adapter: StorageAdapter;
  private readonly config: Required<StorageConfig>;

  /**
   * 创建存储库实例
   * @param adapter 平台适配器
   * @param config 配置选项
   */
  constructor(adapter: StorageAdapter, config: StorageConfig = {}) {
    this.adapter = adapter;
    this.config = {
      prefix: config.prefix || '',
      encrypt: config.encrypt || false,
      encryptFn: config.encryptFn || this.defaultEncrypt,
      decryptFn: config.decryptFn || this.defaultDecrypt,
      timeout: config.timeout || 0,
    };
  }

  /**
   * 默认加密方法
   * @param data 要加密的数据
   * @returns 加密后的字符串
   */
  private defaultEncrypt(data: string): string {
    return btoa(encodeURIComponent(data));
  }

  /**
   * 默认解密方法
   * @param data 要解密的数据
   * @returns 解密后的字符串
   */
  private defaultDecrypt(data: string): string {
    return decodeURIComponent(atob(data));
  }

  /**
   * 获取完整的存储键
   * @param key 原始键名
   * @returns 添加前缀后的完整键名
   */
  private getFullKey(key: string): string {
    return `${this.config.prefix}${key}`;
  }

  /**
   * 获取存储项
   * @param key 存储键
   * @returns 存储值或null
   */
  async get<T = any>(key: string): Promise<T | null> {
    const fullKey = this.getFullKey(key);
    const data = await this.adapter.getItem(fullKey);
    if (!data) return null;

    const decrypted = this.config.encrypt ? this.config.decryptFn(data) : data;
    const item: StorageItem<T> = JSON.parse(decrypted);

    if (item.expire && Date.now() > item.expire) {
      await this.remove(key);
      return null;
    }

    return typeof item.value === 'string' ? deserialize<T>(item.value) : item.value;
  }

  /**
   * 设置存储项
   * @param key 存储键
   * @param value 存储值
   * @param expire 过期时间（毫秒）
   */
  async set<T = any>(key: string, value: T, expire?: number): Promise<void> {
    const fullKey = this.getFullKey(key);
    const item: StorageItem<T> = {
      value: isPrimitive(value) ? value : (serialize(value) as T),
      timestamp: Date.now(),
      expire: expire || (this.config.timeout ? Date.now() + this.config.timeout : undefined),
    };

    const data = JSON.stringify(item);
    const encrypted = this.config.encrypt ? this.config.encryptFn(data) : data;
    await this.adapter.setItem(fullKey, encrypted);
  }

  /**
   * 移除存储项
   * @param key 存储键
   */
  async remove(key: string): Promise<void> {
    const fullKey = this.getFullKey(key);
    await this.adapter.removeItem(fullKey);
  }

  /**
   * 清空所有存储项
   */
  async clear(): Promise<void> {
    await this.adapter.clear();
  }

  /**
   * 获取所有存储键
   * @returns 存储键数组
   */
  async keys(): Promise<string[]> {
    const keys = await this.adapter.keys();
    return keys
      .filter((key) => key.startsWith(this.config.prefix))
      .map((key) => key.slice(this.config.prefix.length));
  }

  /**
   * 检查是否存在指定存储项
   * @param key 存储键
   * @returns 是否存在
   */
  async has(key: string): Promise<boolean> {
    const fullKey = this.getFullKey(key);
    const keys = await this.adapter.keys();
    return keys.includes(fullKey);
  }

  /**
   * 获取存储项及其过期信息
   * @param key 存储键
   * @returns 包含值和过期信息的对象
   */
  async getWithExpire<T = any>(key: string): Promise<{ value: T | null; expire?: number }> {
    const fullKey = this.getFullKey(key);
    const data = await this.adapter.getItem(fullKey);
    if (!data) return { value: null };

    const decrypted = this.config.encrypt ? this.config.decryptFn(data) : data;
    const item: StorageItem<T> = JSON.parse(decrypted);

    if (item.expire && Date.now() > item.expire) {
      await this.remove(key);
      return { value: null };
    }

    return { value: item.value, expire: item.expire };
  }
}
