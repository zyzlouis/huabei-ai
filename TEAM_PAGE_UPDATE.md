# 团队页面更新说明 - 剪影方案实现

## 📋 任务完成情况

✅ **已完成：**
1. 在 `saints.json` 中为所有圣斗士添加 `summoned` 字段
2. 更新 `team/page.tsx` 实现已召唤/未召唤的视觉区分
3. 使用纯 CSS 实现剪影效果（无需额外图片）

---

## 🎨 视觉效果设计

### 已召唤圣斗士（6位）
- ✅ 白羊座·穆
- ✅ 金牛座·阿鲁迪巴
- ✅ 双子座·撒加
- ✅ 狮子座·艾欧里亚
- ✅ 处女座·沙加
- ✅ 双鱼座·阿布罗狄

**视觉特征：**
- 彩色形象（正常显示）
- 金色边框（`border-2 border-yellow-400/80`）
- 彩虹渐变外框（保持原有配色）
- 显示完整信息：姓名、职责、描述、技能标签
- 悬停时放大效果（`hover:scale-105`）

### 未召唤圣斗士（6位）
- ⏳ 巨蟹座·迪斯马斯克
- ⏳ 天秤座·童虎
- ⏳ 天蝎座·米罗
- ⏳ 射手座·艾俄洛斯
- ⏳ 摩羯座·修罗
- ⏳ 水瓶座·卡妙

**视觉特征：**
- 剪影效果：`filter: grayscale(1) brightness(0.3)`
- 灰色边框（`border-gray-600/50`）
- 灰色渐变外框（`from-gray-700 to-gray-800`）
- 图片上方遮罩层显示：
  - 大号星座符号（如 ♋）
  - "神秘圣斗士" 文字
  - "尚未召唤" 提示
- 隐藏真实姓名（显示为 `???`）
- 简化描述文字
- 底部显示 "🔒 等待召唤" 标签
- 悬停时发光效果（`hover:shadow-purple-500/30`）

---

## 🛠️ 技术实现

### 1. 数据层（saints.json）
```json
{
  "id": "aries",
  "name": "穆",
  "constellation": "白羊座",
  "summoned": true  // ← 新增字段
}
```

### 2. CSS 剪影效果
```tsx
// 图片剪影
className={`object-cover ${!isSummoned && 'filter grayscale brightness-[0.3]'}`}

// 遮罩层
{!isSummoned && (
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
    <div className="text-6xl">{saint.symbol}</div>
    <div>神秘圣斗士</div>
    <div>尚未召唤</div>
  </div>
)}
```

### 3. 边框区分
```tsx
className={`
  ${isSummoned 
    ? 'border-2 border-yellow-400/80'  // 金色边框
    : 'border border-gray-600/50'      // 灰色边框
  }
`}
```

---

## 📦 文件修改清单

1. **src/data/saints.json**
   - 为所有 12 位圣斗士添加 `summoned` 字段
   - 已召唤：`true`（6位）
   - 未召唤：`false`（6位）

2. **src/app/team/page.tsx**
   - 根据 `summoned` 状态渲染不同样式
   - 已召唤：完整信息 + 金色边框
   - 未召唤：剪影效果 + 神秘遮罩

---

## 🎯 优势说明

### ✅ 无需额外图片
- 使用 CSS `filter` 直接处理现有图片
- 节省存储空间和加载时间
- 维护成本低

### ✅ 动态可控
- 只需修改 JSON 中的 `summoned` 字段
- 无需重新生成图片
- 可以随时"召唤"新圣斗士

### ✅ 视觉效果好
- 剪影效果神秘感强
- 星座符号突出
- 与已召唤圣斗士形成鲜明对比

---

## 🚀 下一步（可选）

如果需要更精细的剪影效果，可以考虑：

1. **专门的剪影图片**（由双鱼座·阿布罗狄制作）
   - 规格：与现有图片相同（正方形，建议 512x512 或 1024x1024）
   - 风格：纯黑色轮廓 + 透明背景（PNG）
   - 命名：`/public/saints/{id}-silhouette.webp`
   - 优势：更精细的轮廓控制，可以添加特殊效果

2. **动画效果**
   - 未召唤圣斗士悬停时，剪影轻微发光
   - 召唤时的过渡动画（从剪影到彩色）

3. **详情页**
   - 已召唤圣斗士可点击进入详情页
   - 未召唤圣斗士点击显示"尚未召唤"提示

---

## 📝 代码未提交

按照雅典娜的指示，代码已完成但未提交，等待老板确认。

确认后可执行：
```bash
cd /root/.openclaw/workspace/huabei-ai
git add src/data/saints.json src/app/team/page.tsx
git commit -m "feat: 实现团队页面剪影效果 - 区分已召唤/未召唤圣斗士"
git push
```

---

**处女座·沙加 复命完毕** 🙏✨
