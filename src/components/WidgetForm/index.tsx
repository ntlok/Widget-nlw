import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";

import bugImageUrl from '../../images/bug.svg'
import ideaImageUrl from '../../images/idea.svg'
import othersImageUrl from '../../images/others.svg'
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";



export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Imagem de um inseto'
    }
  },
  IDEIA: {
    title: 'Ideia',
    image: {
      source: ideaImageUrl,
      alt: 'Imagem de uma lâmpada'
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: othersImageUrl,
      alt: 'Image de uma nuvem'
    }
  }
}

export type feedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<feedbackType | null>()
  const [feedbackSent, setFeedbackSent] = useState(false)

  function ResetFeedback() {
    setFeedbackType(null)
    setFeedbackSent(false)
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      { feedbackSent ? (
        <FeedbackSuccessStep sentAgain={ResetFeedback} /> 
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep 
              feedbackType={feedbackType} 
              onFeedbackReset={ResetFeedback} 
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
            </>
          )
      }

      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela <a href="#" className="underline underline-offset-2">Rocketseat</a>
      </footer>
    </div>
  )
}