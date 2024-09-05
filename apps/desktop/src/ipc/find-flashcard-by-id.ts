import { invoke } from '@tauri-apps/api/core'

interface Flashcard {
  id: string
  deck_id: string
  front: string
  back: string
}

export async function findFlashcardById(id: string) {
  const flashcard = await invoke<Flashcard>('find_flashcard_by_id', {
    id,
  })

  return flashcard
}
