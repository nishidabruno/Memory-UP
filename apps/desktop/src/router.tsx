import { createBrowserRouter } from 'react-router-dom'

import { CreateFlashcard } from './pages/create-flashcard'
import { DeckDetailsPage } from './pages/deck-details'
import { ErrorPage } from './pages/error'
import { FlashcardDetailsPage } from './pages/flashcard-details'
import { HomePage } from './pages/home'
import { QuizPage } from './pages/quiz'
import { QuizReviewPage } from './pages/quiz/quiz-review'
import { Stats } from './pages/stats'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/stats',
    element: <Stats />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'decks/:deckId',
    element: <DeckDetailsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'decks/:deckId/:flashcardId',
    element: <FlashcardDetailsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'createCard/:deckId',
    element: <CreateFlashcard />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'quiz/:deckId/',
    element: <QuizPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'quiz/:deckId/review',
    element: <QuizReviewPage />,
    errorElement: <ErrorPage />,
  },
])
