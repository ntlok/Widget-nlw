import { Camera, Trash } from "phosphor-react";
import html2canvas from 'html2canvas'
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreeshotButtonProps {
  screenshot: string | null;
  onScreenshotTook: (screenshot: string | null) => void;
}

export function ScreenShotButton({ onScreenshotTook, screenshot }: ScreeshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreeshot] = useState(false)

  async function handleTakeScreenshot() {
    setIsTakingScreeshot(true);

    const canvas = await html2canvas(document.querySelector('html')!)
    const base64image = canvas.toDataURL('image/png');

    onScreenshotTook(base64image);

    setIsTakingScreeshot(false)
  }

  if(screenshot) {
    return(
      <button
        type="button"
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        onClick={() => onScreenshotTook(null)}
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 100
        }}
      >
        <Trash weight="fill" />
      </button>
    )
  }

  return (
    <button 
      type="button" 
      onClick={handleTakeScreenshot}
      className="p-2 border-none bg-zinc-800 hover:bg-zinc-700 border-zinc-600 rounded-md focus:outline-none
      focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brands-500 transition-colors"  
    >
      {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
  )
}