# 更新版本号

### 版本号规则
- 主版本号（Major） ：重大更新，可能包含不兼容的 API 变更。
- 次版本号（Minor） ：新增功能，但向下兼容。
- 修订号（Patch） ：修复 bug，向下兼容。
例如：

- 1.0.0 → 1.0.1 ：修复 bug
- 1.0.0 → 1.1.0 ：新增功能
- 1.0.0 → 2.0.0 ：重大更新

```bash
npm version patch # 小版本
npm version minor # 中版本
npm version major # 大版本
```

# 发布
npm publish --access public