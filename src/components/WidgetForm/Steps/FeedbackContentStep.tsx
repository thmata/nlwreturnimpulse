import { ArrowLeft } from 'phosphor-react';
import React from 'react'
import { FeedbackType } from '../../../src/components/WidgetForm';
import { CloseButton } from '../../CloseButton'
import { feedbackTypes } from '../Index'

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
}

const FeedbackContentStep = ({ feedbackType }: FeedbackContentStepProps) => {
    const feedbackTypeInfo = feedbackTypes[feedbackType];
    return (
        <>
            <header>
                <button type="button" className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
                    <ArrowLeft/>
                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} />
                    {feedbackTypeInfo.title}
                    </span>
                
                <CloseButton/>
            </header>
            <div className="flex py-8 gap-2 w-full">                       
                    </div>
        </>
      )
    }

export default FeedbackContentStep