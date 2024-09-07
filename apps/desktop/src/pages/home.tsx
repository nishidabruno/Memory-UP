import { useQuery } from '@tanstack/react-query'

import { CreateDeck } from '@/components/create-deck'
import { DeckCard } from '@/components/deck-card'
import { Sidebar } from '@/components/sidebar'
import { ToggleTheme } from '@/components/toggle-theme'
import { Skeleton } from '@/components/ui/skeleton'
import { findAllDecks } from '@/ipc/find-all-decks'

export const HomePage = () => {
  const { data: decks, isLoading } = useQuery({
    queryKey: ['homepage', 'all-decks'],
    queryFn: findAllDecks,
  })

  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="ml-14 flex-1 p-6">
        <div className="flex justify-between">
          <strong className="text-xl text-foreground/90">
            Hey, good to see you again!
          </strong>
          <div className="flex gap-2">
            <CreateDeck />
            <ToggleTheme />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          {isLoading
            ? [...Array(8)].map((_, index) => (
                <Skeleton key={index} className="h-[165px] w-[250px]" />
              ))
            : decks?.map((deck) => <DeckCard key={deck.id} data={deck} />)}
        </div>
      </main>
    </div>
  )
}
