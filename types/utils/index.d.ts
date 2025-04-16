/**
 * 判断值是否为基本类型
 * @param value 要判断的值
 * @returns 是否为基本类型
 */
export declare const isPrimitive: (value: any) => boolean;
/**
 * 序列化函数，支持特殊类型的序列化
 * @param value 要序列化的值
 * @returns 序列化后的字符串
 */
export declare const serialize: (value: any) => string;
/**
 * 反序列化函数，支持特殊类型的反序列化
 * @param value 要反序列化的字符串
 * @returns 反序列化后的值
 */
export declare const deserialize: <T>(value: string) => T;
