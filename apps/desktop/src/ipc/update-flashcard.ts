import { invoke } from '@tauri-apps/api/core'

interface UpdateFlashcardData {
  id: string
  front: string
  back: string
}

export async function updateFlashcard(data: UpdateFlashcardData) {
  await invoke('update_flashcard', {
    id: data.id,
    front: data.front,
    back: data.back,
  })
}
