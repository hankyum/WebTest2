<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1n--3xaylPcxHI8U6UPsnKjkrXBXk8fny

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

---

## 后端（NestJS + Mongoose + Swagger）📦

如果你想在本地运行后端 API：

1. 安装缺少的依赖（如果尚未安装）：

```bash
npm install class-validator class-transformer @nestjs/mapped-types --save
```

2. 设置 MongoDB 连接（可选环境变量）：

```bash
export MONGODB_URI='mongodb://localhost:27017/hoopsmanager'
```

3. 启动后端（在项目根执行）：

```bash
npm run start:dev
```

4. 打开 Swagger UI 查看并测试 API：

- http://localhost:3000/api/docs

API 包含：
- 球员管理（CRUD）: `/api/players`
- 赛事管理（创建、查询、更新比分）: `/api/games`

