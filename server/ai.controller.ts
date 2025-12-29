import { Controller, Post, Body } from '@nestjs/common';
import { geminiService } from '../services/gemini';

@Controller('api/ai')
export class AiController {
  @Post('analyze')
  async analyze(@Body() payload: any) {
    // Expect payload.player to be the player object
    const player = payload.player;
    if (!player) {
      return { error: 'Missing player in request body' };
    }
    const report = await geminiService.generateScoutingReport(player);
    return { report };
  }
}
