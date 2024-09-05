import { invoke } from '@tauri-apps/api/core'

export async function getCorrectPercentageByDeck(deckId: string) {
  const response = await invoke<number>('get_correct_percentage', { deckId })
  const fixedPercentage = response.toFixed(1)

  return fixedPercentage
}
