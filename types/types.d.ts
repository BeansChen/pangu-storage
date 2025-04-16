export interface StorageConfig {
    prefix?: string;
    encrypt?: boolean;
    encryptFn?: (data: string) => string;
    decryptFn?: (data: string) => string;
    timeout?: number;
}
export interface StorageItem<T = any> {
    value: T;
    expire?: number;
    timestamp: number;
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
    getWithExpire<T = any>(key: string): Promise<{
        value: T | null;
        expire?: number;
    }>;
}
export type Platform = 'web' | 'wechat' | 'alipay' | 'auto';
