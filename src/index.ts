import { Storage } from './core';
import { WebStorageAdapter } from './adapters/web';
import { WechatAdapter } from './adapters/wechat';
import type { StorageConfig, StorageAPI, Platform } from './types';

export function createStorage(
  config?: StorageConfig & { platform?: Platform },
  useSessionStorage = false
): StorageAPI {
  const platform = detectPlatform(config?.platform);
  const storage = useSessionStorage ? sessionStorage : localStorage;
  let adapter;
  switch (platform) {
    case 'wechat':
      adapter = new WechatAdapter();
      break;
    case 'alipay':
      // 实现类似微信的适配器
      throw new Error('Alipay adapter not implemented');
    default:
      adapter = new WebStorageAdapter(storage);
  }
  return new Storage(adapter, config);
}

function detectPlatform(platform?: Platform): Exclude<Platform, 'auto'> {
  if (platform && platform !== 'auto') return platform;

  if (typeof wx !== 'undefined' && wx.getSystemInfo) return 'wechat';
  if (typeof my !== 'undefined' && my.getSystemInfo) return 'alipay';

  return 'web';
}

export { Storage, WebStorageAdapter, WechatAdapter };
export type { StorageConfig, StorageAPI };
