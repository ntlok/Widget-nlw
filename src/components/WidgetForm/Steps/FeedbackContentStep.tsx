import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { feedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenShotButton } from "../ScreenShootButton";



interface FeedbackContentStepProps {
  feedbackType: feedbackType;
  onFeedbackReset: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({ feedbackType, onFeedbackReset, onFeedbackSent }: FeedbackContentStepProps) {
  const feedbackTypeInfo = feedbackTypes[feedbackType]
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [sendingFeedbackMessage, setSendingfeedbackMessage] = useState(false)

  async function handleSubmitFeedback(event: FormEvent) {
    try {
      event.preventDefault()
      setSendingfeedbackMessage(true)

      const result = await api.post('/', {
        type: feedbackType,
        comment,
        screenshot
      })

      setSendingfeedbackMessage(false)
      onFeedbackSent()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <header>

        <button 
          className="absolute left-5 top-5 text-zinc-400 hover:text-zinc-100"
          onClick={() => onFeedbackReset()}
        >
          <ArrowLeft weight="bold" />
        </button>

        <span className="text-xl leading-6 flex">
          <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="mr-2 w-6 h-6"/>
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form className=" py-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          className="bg-transparent min-w-[304px] w-full min-h-[112px] text-sm placeholder:text-zinc-400
            text-zinc-100 border-zinc-600 resize-none rounded focus:border-brands-500
            focus:ring-brands-500 focus:ring-1 scrollbar scrollbar-thumb-zinc-700 scrollbar-thin scrollbar-track-transparent"
          placeholder="Conte com detalhes o que está acontecendo"
          onChange={event => setComment(event.target.value)}
        />

        <footer className="w-full gap-2 flex mt-2">
          <ScreenShotButton 
            screenshot={screenshot}
            onScreenshotTook={setScreenshot} 
          />
    
          <button
            type="submit"
            disabled={comment === '' || sendingFeedbackMessage}
            className="p-2 bg-brands-500 border-transparent rounded-md text-sm flex-1 flex items-center justify-center hover:bg-brands-300 focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brands-500 transition-colors disabled:opacity-50 disabled:hover:bg-brands-500"
          >
            {sendingFeedbackMessage ? <Loading /> : 'Enviar Feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}