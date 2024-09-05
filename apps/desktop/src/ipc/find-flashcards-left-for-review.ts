import { invoke } from '@tauri-apps/api/core'

export async function findFlashcardsLeftForReview(deckId: string) {
  const response = await invoke<number>('find_flashcards_left_for_review', {
    deckId,
  })

  return response
}
