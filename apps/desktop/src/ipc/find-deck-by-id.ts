import { invoke } from '@tauri-apps/api/core'

interface Deck {
  id: string
  title: string
}

export async function findDeckById(id: string) {
  const deck = await invoke<Deck>('find_deck_by_id', {
    id,
  })

  return deck
}
