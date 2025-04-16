import { Storage } from './core';
import { WebStorageAdapter } from './adapters/web';
import { WechatAdapter } from './adapters/wechat';
import type { StorageConfig, StorageAPI, Platform } from './types';
export declare function createStorage(config?: StorageConfig & {
    platform?: Platform;
}, useSessionStorage?: boolean): StorageAPI;
export { Storage, WebStorageAdapter, WechatAdapter };
export type { StorageConfig, StorageAPI };
