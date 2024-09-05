import { invoke } from '@tauri-apps/api/core'

interface Deck {
  title: string
  id: string
}

export async function findAllDecks() {
  const decks = await invoke<Deck[]>('find_all_decks')

  return decks
}
