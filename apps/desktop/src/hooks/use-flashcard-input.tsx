import { useEffect, useState } from 'react'

interface Flashcard {
  front: string
  back: string
}

export const useFlashcardInput = (initialData?: Flashcard) => {
  const [flashcard, setFlashcard] = useState<Flashcard>({
    front: '',
    back: '',
  })

  useEffect(() => {
    if (initialData) {
      setFlashcard(initialData)
    }
  }, [initialData])

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    type: keyof Flashcard,
  ) =>
    setFlashcard((prevState) => ({
      ...prevState,
      [type]: event.target.value,
    }))

  return { flashcard, handleInputChange }
}
