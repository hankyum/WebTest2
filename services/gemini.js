"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geminiService = exports.GeminiService = void 0;
const genai_1 = require("@google/genai");
class GeminiService {
    constructor() {
        // Fix: Using process.env.API_KEY directly as required by the latest SDK guidelines
        this.ai = new genai_1.GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    async generateScoutingReport(player) {
        const prompt = `请用中文分析以下大学篮球运动员的数据和档案，并提供一份专业的球探报告：
    姓名: ${player.name}
    场上位置: ${player.position}
    年级: ${player.year}
    场均统计: 得分 ${player.stats.ppg}, 篮板 ${player.stats.rpg}, 助攻 ${player.stats.apg}
    
    报告应包含：
    1. 关键优势
    2. 待改进领域
    3. 潜在的职业联赛（如NBA/CBA）模板/参考球员
    4. 建议的训练重点。`;
        try {
            // Fix: Query GenAI with both the model name and prompt directly on ai.models.generateContent
            const response = await this.ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: prompt,
                config: {
                    temperature: 0.7,
                }
            });
            // Fix: Access .text property directly instead of calling it as a function
            return response.text;
        }
        catch (error) {
            console.error("Gemini API Error:", error);
            return "目前无法生成报告，请稍后再试。";
        }
    }
    async getGameStrategy(opponent, ourPlayers) {
        const playerSummaries = ourPlayers.map(p => `${p.name} (${p.position})`).join(", ");
        const prompt = `请用中文针对 "${opponent}" 篮球队制定一套比赛策略。
    我们的关键球员: ${playerSummaries}。
    请提供高层面的进攻和防守战术方案。`;
        try {
            // Fix: Use correct generateContent pattern with model name
            const response = await this.ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: prompt,
            });
            // Fix: Access .text property directly
            return response.text;
        }
        catch (error) {
            console.error("Gemini API Error:", error);
            return "战略分析系统离线。";
        }
    }
}
exports.GeminiService = GeminiService;
exports.geminiService = new GeminiService();
