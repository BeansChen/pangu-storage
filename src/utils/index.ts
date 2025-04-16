// 新增类型守卫和转换逻辑
/**
 * 判断值是否为基本类型
 * @param value 要判断的值
 * @returns 是否为基本类型
 */
export const isPrimitive = (value: any): boolean => {
  const type = typeof value;
  return value === null || (type !== 'object' && type !== 'function');
};

/**
 * 序列化函数，支持特殊类型的序列化
 * @param value 要序列化的值
 * @returns 序列化后的字符串
 */
export const serialize = (value: any): string => {
  // 处理特殊类型
  if (value instanceof Date) return JSON.stringify({ __type: 'Date', value: value.toISOString() });
  if (value instanceof RegExp) return JSON.stringify({ __type: 'RegExp', value: value.toString() });
  if (value instanceof Map)
    return JSON.stringify({
      __type: 'Map',
      value: Array.from(value.entries()),
    });
  if (value instanceof Set) return JSON.stringify({ __type: 'Set', value: Array.from(value) });

  // 处理普通对象/数组
  return JSON.stringify(value);
};

/**
 * 反序列化函数，支持特殊类型的反序列化
 * @param value 要反序列化的字符串
 * @returns 反序列化后的值
 */
export const deserialize = <T>(value: string): T => {
  try {
    const parsed = JSON.parse(value);

    // 处理特殊类型反序列化
    if (parsed?.__type) {
      switch (parsed.__type) {
        case 'Date':
          return new Date(parsed.value) as T;
        case 'RegExp': {
          const match = parsed.value.match(/\/(.*)\/([gimy]*)?/);
          return new RegExp(match[1], match[2]) as T;
        }
        case 'Map':
          return new Map(parsed.value) as T;
        case 'Set':
          return new Set(parsed.value) as T;
      }
    }

    return parsed;
  } catch {
    return value as T; // 返回原始字符串
  }
};
