import type { StorageAdapter } from '../types';

declare const wx: any;
export class WechatAdapter implements StorageAdapter {
  async getItem(key: string): Promise<string | null> {
    return new Promise((resolve) => {
      wx.getStorage({
        key,
        success: (res: any) => resolve(res.data),
        fail: () => resolve(null),
      });
    });
  }

  async setItem(key: string, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
      wx.setStorage({
        key,
        data: value,
        success: () => resolve(),
        fail: reject,
      });
    });
  }

  async removeItem(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      wx.removeStorage({
        key,
        success: () => resolve(),
        fail: reject,
      });
    });
  }

  async clear(): Promise<void> {
    return new Promise((resolve, reject) => {
      wx.clearStorage({
        success: () => resolve(),
        fail: reject,
      });
    });
  }

  async keys(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      wx.getStorageInfo({
        success: (res: any) => resolve(res.keys),
        fail: reject,
      });
    });
  }
}
