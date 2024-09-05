import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export function useValidFlashcardId() {
  const { flashcardId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!flashcardId) {
      navigate('/')
    }
  }, [flashcardId, navigate])

  return { flashcardId: flashcardId as string }
}
