import { useState } from "react";

import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";

import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSucessStep } from "./Steps/FeedbackSucessStep";


// armazenar todos os tipos de button e conteúdo para facilitar se houver manutenção.
export const feedbackTypes = {
    BUG: {
        title: "Problema",
        image: {
            source: bugImageUrl,
            alt: "Imagem de um inseto",
        }
    },
    IDEA: {
        title: "Ideia",
        image: {
            source: ideaImageUrl,
            alt: "Imagem de uma lâmpada",
        }
    },
    OTHER: {
        title: "Outro",
        image: {
            source: thoughtImageUrl,
            alt: "Imagem de um balão de pensamento",
        }
    },
};

// Seleciona somente as chaves dos elementos do feedbackTypes.
export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){

    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>();

    // saber se o feedback foi enviado ou não encontrado
    const [feedbackSent, setFeedbackSent] = useState(false);

    function handleRestartFeedback(){
        setFeedbackSent(false);
        setFeedbackType(null);
    }

    return(
        <div className="bg-white dark:bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

            {
                feedbackSent ? (
                    <FeedbackSucessStep onFeedbackRestartRequested={handleRestartFeedback} />
                ) : (
                    <>
                        {
                            !feedbackType ? (
                                <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                            ) : (
                                <FeedbackContentStep 
                                    feedbackType={feedbackType} 
                                    onFeedbackRestartRequested={handleRestartFeedback}
                                    onFeedbackSent={() => setFeedbackSent(true)}
                                />
                            )
                        }
                    </>
                )
            }

            <footer className="text-xs text-zinc-500 dark:text-zinc-400">
                Feito com ♥ pela <a className="underline underline-offset-2" href="https://rocketseat.com.br" target="_blank" >Rocketseat</a>
            </footer>
        </div>
    );
}