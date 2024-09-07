import { useMutation, useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'phosphor-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { CardPreview } from '@/components/card-preview'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFlashcardInput } from '@/hooks/use-flashcard-input'
import { useValidFlashcardId } from '@/hooks/use-valid-flashcard-id'
import { findFlashcardById } from '@/ipc/find-flashcard-by-id'
import { updateFlashcard } from '@/ipc/update-flashcard'

export const FlashcardDetailsPage = () => {
  const navigate = useNavigate()
  const { flashcardId } = useValidFlashcardId()

  const {
    data: savedFlashcard,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['flashcard-details', flashcardId],
    queryFn: () => findFlashcardById(flashcardId),
  })

  const { flashcard, handleInputChange } = useFlashcardInput(savedFlashcard)
  const { mutateAsync: update } = useMutation({
    mutationFn: updateFlashcard,
    onSuccess: () => {
      if (savedFlashcard) {
        navigate(`/decks/${savedFlashcard.deck_id}`)
      }
    },
    onError: () => {
      toast.error('Error while trying to save flashcard.', {
        description: 'Try again later.',
      })

      navigate(-1)
    },
  })

  async function handleUpdateFlashcard() {
    if (savedFlashcard) {
      await update({
        id: savedFlashcard.id,
        front: flashcard.front,
        back: flashcard.back,
      })
    }
  }

  useEffect(() => {
    if (isError) {
      toast.error('Error loading flashcard.', {
        description: 'Try again later.',
      })

      navigate(-1)
    }
  }, [isError, navigate])

  // TODO: Use skeleton instead.
  if (isLoading) return <h1>Loading...</h1>
  return (
    <div className="p-6">
      <header className="flex justify-between">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </header>

      <h1 className="my-6 text-3xl tracking-tighter">Edit flashcard</h1>

      {/* TODO: Add toolbar */}

      <div className="space-y-2">
        <div>
          <Label htmlFor="front-card">Front</Label>
          <Textarea
            className="mt-1 resize-none"
            placeholder="The front side of your flashcard."
            id="front-card"
            defaultValue={flashcard.front}
            onChange={(event) => handleInputChange(event, 'front')}
          />
        </div>

        <div>
          <Label htmlFor="back-card">Back</Label>
          <Textarea
            className="mt-1 resize-none"
            placeholder="The back side of your flashcard."
            id="back-card"
            defaultValue={flashcard.back}
            onChange={(event) => handleInputChange(event, 'back')}
          />
        </div>
      </div>

      <p className="mb-2 mt-6 text-lg font-medium">Preview</p>
      <div>
        <CardPreview data={flashcard} />
      </div>

      <Button className="mt-6 w-full" onClick={handleUpdateFlashcard}>
        Save
      </Button>
    </div>
  )
}
