import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export function useValidDeckId() {
  const { deckId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!deckId) {
      navigate('/')
    }
  }, [deckId, navigate])

  return { deckId: deckId as string }
}
