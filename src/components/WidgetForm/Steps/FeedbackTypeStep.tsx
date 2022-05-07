import { feedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";

type feedbackTypeStepProps = {
  onFeedbackTypeChanged: (Type: feedbackType) => void;
}


export function FeedbackTypeStep({ onFeedbackTypeChanged }: feedbackTypeStepProps) {

  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixa seu feedback</span>

        <CloseButton />
      </header>

      <div className="flex py-8 gap-2 w-full">
          { Object.entries(feedbackTypes).map(([key, value]) => {

            return (
              <button
                className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 items-center border-2 border-transparent hover:border-brands-500 focus:border-brands-500 focus:outline-none"
                key={key}
                onClick={() => onFeedbackTypeChanged(key as feedbackType)}
                type="button"
                
              >
                <img className="flex m-auto pb-2" src={value.image.source} alt={value.image.alt} />
                <span>{value.title}</span>
              </button>
            );
          })
          }
      </div>
    </>
  )
}