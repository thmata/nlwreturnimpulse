import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from ".."
import { api } from "../../../lib/api";

import { CloseButton } from "../../CloseButton"
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedbackSent: () => void;
}

export function FeedbackContentStep({ 
        feedbackType, 
        onFeedbackRestartRequested, 
        onFeedbackSent 
    }: FeedbackContentStepProps){
    
    // const para armazenar a screenshot caso seja tirada.
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState('');

    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    
    // só está pegando as informações da chave que foi enviada para o componente.
    const feedbackTypeInfo = feedbackTypes[feedbackType];
    
    async function handleSubmitFeedback(event: FormEvent){
        event.preventDefault();
        setIsSendingFeedback(true);
        // enviar para o database
        await api.post('/feedbacks', {
            type: feedbackType,
            comment: comment,
            screenshot: screenshot
        })
        setIsSendingFeedback(false);
        onFeedbackSent();
    }

    return (
        <>
            <header>

                <button 
                    type="button" 
                    className="top-5 left-5 absolute text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
                    onClick={onFeedbackRestartRequested}
                >
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                </button>

                <span className="text-xl text-zinc-800 dark:text-zinc-100  text leading-6 flex items-center gap-2">
                    <img 
                        src={feedbackTypeInfo.image.source} 
                        alt={feedbackTypeInfo.image.alt} 
                        className="h-6 w-6"
                    />
                    {feedbackTypeInfo.title}
                </span>

                <CloseButton />
            </header>

            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 font-normal text-zinc-800 dark:text-zinc-100 border-zinc-300 dark:border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin "
                    placeholder="Conte com detalhes o que está acontecendo..."
                    onChange={event => setComment(event.target.value)}
                />

                <footer className="flex gap-2 mt-2">
                    
                    <ScreenshotButton 
                        onScreenshotTook={setScreenshot} 
                        screenshot={screenshot}
                    />

                    <button
                        type="submit"
                        className="p-2 bg-brand-500 text-white rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500 disabled:cursor-not-allowed"
                        disabled={comment.length === 0 || isSendingFeedback}
                    >
                        {isSendingFeedback ? <Loading /> : 'Enviar Feedback'}
                    </button>
                </footer>

            </form>
        </>
    )
}