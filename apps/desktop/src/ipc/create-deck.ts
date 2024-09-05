import { invoke } from '@tauri-apps/api/core'

interface Deck {
  title: string
}

export async function createDeck(data: Deck) {
  await invoke('create_deck', {
    title: data.title,
  })
}
