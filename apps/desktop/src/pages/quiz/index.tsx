import { useQuery } from '@tanstack/react-query'
import { SignOut } from 'phosphor-react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { findFlashcardForReview } from '@/ipc/find-flashcard-for-review'

export const QuizPage = () => {
  const { deckId } = useParams()
  const navigate = useNavigate()

  // GC needs to be 0 since no specific id is provided
  // to queryKey + there is no need to cache.
  const {
    data: flashcard,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ['quiz', 'card-for-review'],
    queryFn: () => findFlashcardForReview(deckId as string),
    gcTime: 0,
  })

  function reviewQuiz() {
    navigate(`/quiz/${deckId}/review`, {
      state: { flashcard },
    })
  }

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao fazer revisão.', {
        description: 'Tente novamente mais tarde.',
      })
      navigate('/')
    }
    if (isSuccess && !flashcard) {
      toast.info('Todos flashcards completados!')
      return navigate('/')
    }
  }, [isError, isSuccess, flashcard, navigate])

  return (
    <div className="flex h-screen flex-col p-6">
      <div className="flex justify-end">
        <Button variant="destructive" onClick={() => navigate('/')}>
          <SignOut size={18} weight="bold" className="mr-2" />
          Sair
        </Button>
      </div>

      <div className="my-3 flex flex-1 items-center justify-center rounded-md bg-muted">
        <p className="text-3xl">{flashcard?.front}</p>
      </div>

      <Button onClick={reviewQuiz}>Revelar</Button>
    </div>
  )
}
