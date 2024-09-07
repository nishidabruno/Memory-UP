import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Plus } from 'phosphor-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useValidDeckId } from '@/hooks/use-valid-deck-id'
import { findDeckById } from '@/ipc/find-deck-by-id'
import { findFlashcardsByDeckId } from '@/ipc/find-flashcards-by-deck-id'
import { convertToFurigana } from '@/utils/convert-to-furigana'

export const DeckDetailsPage = () => {
  const { deckId } = useValidDeckId()
  const navigate = useNavigate()

  const { data: deck, isError: isErrorDeck } = useQuery({
    queryKey: ['deck-details-deck'],
    queryFn: () => findDeckById(deckId),
  })
  const { data: flashcards, isError: isErrorFlashcards } = useQuery({
    queryKey: ['deck-details-flashcards'],
    queryFn: () => findFlashcardsByDeckId(deckId),
  })

  useEffect(() => {
    if (isErrorDeck || isErrorFlashcards) {
      toast.error('Erro ao carregar deck. ', {
        description: 'Tente novamente mais tarde.',
      })
      navigate(-1)
    }
  }, [isErrorDeck, isErrorFlashcards, navigate])

  return (
    <div className="p-6">
      <header className="flex justify-between">
        <Button variant="outline" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Button onClick={() => navigate(`/createCard/${deckId}`)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New flashcard
        </Button>
      </header>

      <h1 className="my-6 text-3xl tracking-tighter">{deck?.title}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Front</TableHead>
            <TableHead>Back</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {flashcards?.map((flashcard) => (
            <TableRow
              key={flashcard.id}
              onClick={() => navigate(`${flashcard.id}`)}
              className="cursor-pointer text-base"
            >
              <TableCell className="max-w-[313px] overflow-hidden text-ellipsis whitespace-nowrap">
                {flashcard.front}
              </TableCell>
              <TableCell
                className="max-w-[313px] overflow-hidden text-ellipsis whitespace-nowrap"
                dangerouslySetInnerHTML={{
                  __html: convertToFurigana(flashcard.back),
                }}
              ></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
