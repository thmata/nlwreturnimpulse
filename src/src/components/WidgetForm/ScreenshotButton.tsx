import { useState } from "react";
import html2canvas from "html2canvas";

import { Camera, Trash } from "phosphor-react";
import { Loading } from "../Loading";

interface ScreenshotButtonProps {
    screenshot: string | null;
    onScreenshotTook: (screenshot: string | null) => void;
}

export function ScreenshotButton({screenshot, onScreenshotTook}: ScreenshotButtonProps){

    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

    async function handleTakeScreenshot(){
        setIsTakingScreenshot(true);
        const canvas = await html2canvas(document.querySelector('html')!); // a ! indica que sempre terá, então tira o erro.
        const base64image = canvas.toDataURL('image/png');

        // envia a imagem para o component FeedbackContentStep.
        onScreenshotTook(base64image);
        
        setIsTakingScreenshot(false);
    }
    // se ja tiver uma screenshot ele retorna isso, se não o padrão
    if (screenshot){
        return (
            <button
                type="button"
                onClick={() => onScreenshotTook(null)}
                className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 focus:ring-brand-500"
                style={{
                    backgroundImage: `url(${screenshot})`,
                }}
            >
                <Trash weight="fill" />
            </button>
        )
    }

    return(
        <button
            type="button"
            className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-md border-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 focus:ring-brand-500"
            onClick={handleTakeScreenshot}
        >
            {
                isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6 text-zinc-800 dark:text-zinc-100" />
            }
            
        </button>
    )
}