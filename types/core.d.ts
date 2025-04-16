import type { StorageAdapter, StorageAPI, StorageConfig } from './types';
/**
 * 统一存储库实现类，提供跨平台的存储管理功能
 */
export declare class Storage implements StorageAPI {
    private readonly adapter;
    private readonly config;
    /**
     * 创建存储库实例
     * @param adapter 平台适配器
     * @param config 配置选项
     */
    constructor(adapter: StorageAdapter, config?: StorageConfig);
    /**
     * 默认加密方法
     * @param data 要加密的数据
     * @returns 加密后的字符串
     */
    private defaultEncrypt;
    /**
     * 默认解密方法
     * @param data 要解密的数据
     * @returns 解密后的字符串
     */
    private defaultDecrypt;
    /**
     * 获取完整的存储键
     * @param key 原始键名
     * @returns 添加前缀后的完整键名
     */
    private getFullKey;
    /**
     * 获取存储项
     * @param key 存储键
     * @returns 存储值或null
     */
    get<T = any>(key: string): Promise<T | null>;
    /**
     * 设置存储项
     * @param key 存储键
     * @param value 存储值
     * @param expire 过期时间（毫秒）
     */
    set<T = any>(key: string, value: T, expire?: number): Promise<void>;
    /**
     * 移除存储项
     * @param key 存储键
     */
    remove(key: string): Promise<void>;
    /**
     * 清空所有存储项
     */
    clear(): Promise<void>;
    /**
     * 获取所有存储键
     * @returns 存储键数组
     */
    keys(): Promise<string[]>;
    /**
     * 检查是否存在指定存储项
     * @param key 存储键
     * @returns 是否存在
     */
    has(key: string): Promise<boolean>;
    /**
     * 获取存储项及其过期信息
     * @param key 存储键
     * @returns 包含值和过期信息的对象
     */
    getWithExpire<T = any>(key: string): Promise<{
        value: T | null;
        expire?: number;
    }>;
}
