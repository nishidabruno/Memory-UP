import { useQuery } from '@tanstack/react-query'
import { FadersHorizontal } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { findFlashcardsLeftForReview } from '@/ipc/find-flashcards-left-for-review'
import { getCorrectPercentageByDeck } from '@/ipc/get-correct-percentage'
import { getTotalFlashcardsByDeck } from '@/ipc/get-total-flashcards-by-deck'

import { Button } from './ui/button'

interface DeckCardProps {
  data: {
    title: string
    id: string
  }
}

export const DeckCard = ({ data }: DeckCardProps) => {
  const navigate = useNavigate()

  const { data: correctPercentage } = useQuery({
    queryKey: ['deck-card', 'correct-percentage', { id: data.id }],
    queryFn: () => getCorrectPercentageByDeck(data.id),
  })
  const { data: totalFlashcardsByDeck } = useQuery({
    queryKey: ['deck-card', 'total-flashcards-by-deck', { id: data.id }],
    queryFn: () => getTotalFlashcardsByDeck(data.id),
  })
  const { data: flashcardsLeftForReview } = useQuery({
    queryKey: [
      'deck-card',
      'dialog',
      'flashcards-left-for-review',
      { id: data.id },
    ],
    queryFn: () => findFlashcardsLeftForReview(data.id),
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="min-w-[253px] cursor-pointer transition-colors hover:bg-secondary/20">
          <CardHeader>
            <p className="text-sm font-medium text-muted-foreground">
              {flashcardsLeftForReview} left
            </p>
            <h2 className="text-xl font-bold text-primary">{data.title}</h2>
          </CardHeader>

          <CardContent>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Total flashcards:
              </span>
              <span className="text-sm text-primary">
                {totalFlashcardsByDeck}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Hit:</span>
              <span className="text-sm text-primary">{correctPercentage}%</span>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data.title}</DialogTitle>
          <DialogDescription>
            Start your studies here. Click edit for more details.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col">
          <div className="flex">
            <span className="text-muted-foreground">
              Total flashcards:&nbsp;
            </span>
            <span className="text-primary">{totalFlashcardsByDeck}</span>
          </div>
          <div className="flex">
            <span className="text-muted-foreground">
              Flashcards left for today:&nbsp;
            </span>
            <span className="text-primary">{flashcardsLeftForReview}</span>
          </div>
          <div className="flex">
            <span className="text-muted-foreground">Hit:&nbsp;</span>
            <span className="text-primary">{correctPercentage}%</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <Button onClick={() => navigate(`/quiz/${data.id}`)}>Start!</Button>
          <Button
            variant="secondary"
            onClick={() => navigate(`/decks/${data.id}`)}
          >
            <FadersHorizontal className="mr-2 h-4 w-4" weight="bold" />
            Edit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
