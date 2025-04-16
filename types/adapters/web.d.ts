import type { StorageAdapter } from '../types';
export declare class WebStorageAdapter implements StorageAdapter {
    private storage;
    constructor(storage?: Storage);
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
    clear(): Promise<void>;
    keys(): Promise<string[]>;
}
