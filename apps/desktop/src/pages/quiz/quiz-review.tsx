import { useMutation } from '@tanstack/react-query'
import { SignOut } from 'phosphor-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { type Quality, reviewFlashcard } from '@/ipc/review-flashcard'

interface State {
  flashcard: {
    id: string
    deck_id: string
    back: string
  }
}

export const QuizReviewPage = () => {
  const navigate = useNavigate()
  const { flashcard } = useLocation().state as State

  const { mutateAsync: review } = useMutation({
    mutationFn: reviewFlashcard,
    onError: () => {
      toast.error('Erro ao fazer revisão.', {
        description: 'Tente novamente mais tarde.',
      })
      navigate('/')
    },
  })

  async function handleReview(quality: Quality) {
    await review({
      flashcardId: flashcard.id,
      deckId: flashcard.deck_id,
      quality,
    })

    navigate(`/quiz/${flashcard.deck_id}`)
  }

  return (
    <div className="flex h-screen flex-col p-6">
      <div className="flex justify-end">
        <Button variant="destructive" onClick={() => navigate('/')}>
          <SignOut size={18} weight="bold" className="mr-2" />
          Sair
        </Button>
      </div>

      <div className="my-3 flex flex-1 items-center justify-center rounded-md bg-muted">
        <p className="text-2xl">{flashcard.back}</p>
      </div>

      <div className="flex justify-center gap-4">
        <Button onClick={() => handleReview(0)} variant="outline">
          Não lembro
        </Button>
        <Button onClick={() => handleReview(3)} variant="outline">
          Difícil
        </Button>
        <Button onClick={() => handleReview(4)} variant="outline">
          Médio
        </Button>
        <Button onClick={() => handleReview(5)} variant="outline">
          Fácil
        </Button>
      </div>
    </div>
  )
}
