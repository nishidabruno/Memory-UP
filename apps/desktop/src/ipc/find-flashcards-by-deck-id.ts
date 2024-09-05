import { invoke } from '@tauri-apps/api/core'

interface Flashcard {
  id: number
  front: string
  back: string
}

export async function findFlashcardsByDeckId(deckId: string) {
  const flashcards = await invoke<Flashcard[]>('find_flashcards_by_deck_id', {
    deckId,
  })

  return flashcards
}
