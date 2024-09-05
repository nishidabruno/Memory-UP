import { invoke } from '@tauri-apps/api/core'

interface Flashcard {
  front: string
}

export async function findFlashcardForReview(deckId: string) {
  const flashcard = await invoke<Flashcard>('find_flashcard_for_review', {
    deckId,
  })

  return flashcard
}
