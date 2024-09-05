import { invoke } from '@tauri-apps/api/core'

export async function getTotalFlashcardsByDeck(deckId: string) {
  const response = await invoke<number>('get_total_flashcards_by_deck', {
    deckId,
  })

  return response
}
