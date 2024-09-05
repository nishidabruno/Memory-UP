import { invoke } from '@tauri-apps/api/core'

export type Quality = 0 | 3 | 4 | 5

interface ReviewFlashcard {
  quality: Quality
  flashcardId: string
  deckId: string
}

export async function reviewFlashcard(data: ReviewFlashcard) {
  const response = await invoke<ReviewFlashcard>('review_flashcard', {
    deckId: data.deckId,
    flashcardId: data.flashcardId,
    quality: data.quality,
  })

  return response
}
