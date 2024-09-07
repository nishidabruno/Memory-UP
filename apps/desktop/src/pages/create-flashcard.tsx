import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ArrowLeft } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { CardPreview } from '@/components/card-preview'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFlashcardInput } from '@/hooks/use-flashcard-input'
import { useValidDeckId } from '@/hooks/use-valid-deck-id'
import { createFlashcard } from '@/ipc/create-flashcard'

const flashcardSchema = z.object({
  front: z.string().min(1, { message: 'Enter at least 1 character.' }),
  back: z.string().min(1, { message: 'Enter at least 1 character.' }),
})

type Flashcard = z.infer<typeof flashcardSchema>

export const CreateFlashcard = () => {
  const navigate = useNavigate()
  const { deckId } = useValidDeckId()
  const { flashcard, handleInputChange } = useFlashcardInput()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Flashcard>({
    resolver: zodResolver(flashcardSchema),
  })

  const { mutateAsync: registerFlashcard } = useMutation({
    mutationFn: createFlashcard,
    onError: () => {
      toast.error('Error while trying create a new flashcard.', {
        description: 'Try again later.',
      })

      navigate(-1)
    },
  })

  const handleCreateCard = async (data: Flashcard) => {
    await registerFlashcard({
      deckId,
      ...data,
    })
    toast.success('New flashcard created!')
    navigate(-1)
  }

  return (
    <div className="p-6">
      <header className="flex justify-between">
        <Button variant="outline" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </header>

      <h1 className="my-6 text-3xl tracking-tighter">New flashcard</h1>

      {/* TODO: Add toolbar */}

      <form onSubmit={handleSubmit(handleCreateCard)}>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between">
              <Label htmlFor="front-card">Front</Label>
              <p className="text-sm text-destructive">
                {errors.front?.message}
              </p>
            </div>
            <Textarea
              className="mt-1 resize-none"
              placeholder="The front side of your flashcard."
              id="front-flashcard"
              {...register('front')}
              onChange={(event) => handleInputChange(event, 'front')}
            />
          </div>

          <div>
            <div className="flex justify-between">
              <Label htmlFor="back-card">Back</Label>
              <p className="text-sm text-destructive">{errors.back?.message}</p>
            </div>
            <Textarea
              className="mt-1 resize-none"
              placeholder="The back side of your flashcard."
              id="back-flashcard"
              {...register('back')}
              onChange={(event) => handleInputChange(event, 'back')}
            />
          </div>
        </div>

        <p className="mb-2 mt-6 text-lg font-medium">Preview</p>
        <div>
          <CardPreview data={flashcard} />
        </div>

        <Button className="mt-6 w-full" type="submit">
          Create flashcard
        </Button>
      </form>
    </div>
  )
}
