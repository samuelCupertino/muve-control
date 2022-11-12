export const speak = ( text:string, SpeechRecognition:Record<string, any> = {} ) => {
    // SpeechRecognition?.stopListening()
    speechSynthesis.cancel()
    const say = new SpeechSynthesisUtterance(text)
    say.lang = 'pt-Br'
    speechSynthesis.speak(say)
    // SpeechRecognition?.startListening({ continuous: true })
}