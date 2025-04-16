import type { StorageAdapter } from '../types';
export class WebStorageAdapter implements StorageAdapter {
  private storage: Storage;

  constructor(storage: Storage = localStorage) {
    this.storage = storage;
  }

  async getItem(key: string): Promise<string | null> {
    return this.storage.getItem(key);
  }

  async setItem(key: string, value: string): Promise<void> {
    this.storage.setItem(key, value);
  }

  async removeItem(key: string): Promise<void> {
    this.storage.removeItem(key);
  }

  async clear(): Promise<void> {
    this.storage.clear();
  }

  async keys(): Promise<string[]> {
    return Object.keys(this.storage);
  }
}
