import { Storage } from '../src';
import type { StorageAdapter } from '../src/types';
class MockStorage implements StorageAdapter {
  private store: Record<string, string> = {};

  async getItem(key: string) {
    return this.store[key] || null;
  }

  async setItem(key: string, value: string) {
    this.store[key] = value;
  }

  async removeItem(key: string) {
    delete this.store[key];
  }

  async clear() {
    this.store = {};
  }
  async keys(): Promise<string[]> {
    return Object.keys(this.store);
  }
}


describe('Storage', () => {
  let storage: Storage;

  beforeEach(() => {
    storage = new Storage(new MockStorage());
    storage.clear();
  });

  it('验证存储库能够正确设置和获取值', async () => {
    await storage.set('test', 'value');
    expect(await storage.get('test')).toBe('value');
  });

  it('验证存储库能够正确移除指定的值', async () => {
    await storage.set('test', 'value');
    await storage.remove('test');
    expect(await storage.get('test')).toBeNull();
  });

  it('验证存储库能够正确清空所有存储的值', async () => {
    await storage.set('test1', 'value1');
    await storage.set('test2', 'value2');
    await storage.clear();
    expect(await storage.get('test1')).toBeNull();
    expect(await storage.get('test2')).toBeNull();
  });

  it('验证存储库能够正确处理设置了过期时间的值', async () => {
    await storage.set('test', 'value', Date.now() + 100);
    expect(await storage.get('test')).toBe('value');
    await new Promise(resolve => setTimeout(resolve, 150));
    expect(await storage.get('test')).toBeNull();
  });
});