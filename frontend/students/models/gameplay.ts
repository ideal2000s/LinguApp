export interface IGameplayCreateResponse {
  gameplay: IGameplay;
  words: Array<IGameplayWord>;
}

export interface IGameplayFinishRequest {
  gameplay: IFinishGameplay;
}

export interface IGameplay {
  id: number;
  gameType: tGameplayGameType;
}

export interface IGameplayParams {
  timeSpent: number;
  xpEarned: number;
  attempts: number;
}

export interface IFinishGameplay {
  timeSpent: number;
  attempts: number;
  xpEarned: number;
}

export interface IGameplayWord {
  id: number;
  body: string;
  frequency: number;
  wordTranslation: string | null;
  imageURL: string | null;
  audioURL: string | null;
}

export const GAMEPLAY_GAME_TYPES = ['Nodes', 'Waterfall', 'MatchWords'] as const;
export type tGameplayGameType = typeof GAMEPLAY_GAME_TYPES;
