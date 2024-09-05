import { invoke } from '@tauri-apps/api/core'

interface Flashcard {
  front: string
  back: string
  deckId: string
}

export async function createFlashcard(data: Flashcard) {
  // TODO: return something to make sure IPC call worked.
  await invoke('create_flashcard', {
    front: data.front,
    back: data.back,
    deckId: data.deckId,
  })
}
