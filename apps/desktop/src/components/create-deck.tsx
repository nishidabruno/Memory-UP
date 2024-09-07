import { useMutation } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { createDeck } from '@/ipc/create-deck'
import { queryClient } from '@/lib/react-query'

export function CreateDeck() {
  const [deckTitle, setDeckTitle] = useState('')
  const navigate = useNavigate()

  const { mutateAsync: create } = useMutation({
    mutationFn: createDeck,
  })

  async function handleCreateDeck() {
    try {
      await create({ title: deckTitle })

      queryClient.invalidateQueries({ queryKey: ['homepage', 'all-decks'] })
      toast.success('Deck created successfully!', {
        duration: 1500,
        position: 'bottom-left',
      })
      navigate('/')
    } catch (err) {
      toast.error(`Error creating new deck. Try again later. ${err}`)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          New deck
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new deck</DialogTitle>
          <DialogDescription>Enter the name of the new deck</DialogDescription>
        </DialogHeader>

        <Input
          placeholder="Ex: Kanji"
          className="w-full"
          onChange={(e) => setDeckTitle(e.target.value)}
        />
        <DialogClose asChild>
          <Button onClick={() => handleCreateDeck()}>Create</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
