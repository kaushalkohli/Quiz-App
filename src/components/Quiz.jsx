import React, { useState } from 'react'
import { Data } from './question'

function Quiz() {

    const [data] = useState(Data)

    const [index, setIndex] = useState(0)

    const [score, setScore] = useState(0)

    const [selectedAnswer, setSelectedAnswer] = useState('')

    const [isComplete, setIsComplete] = useState(false)


    function handleSubmit(e){
      e.preventDefault()
     
      // check if answer is selected 
      if(!selectedAnswer){
        const exit = window.confirm("do you want to exit the game?")
        if(exit){
          setIsComplete(true)
        }else{
          setIsComplete(false)
        }
        return 
      }

      // validation answer and update score
      if(selectedAnswer === data[index].ans){
        setScore(score+1)
        // console.log(score)
      }

      // move to next question or compete quiz
      if(index < data.length-1){
        setIndex(index+1)
        setSelectedAnswer('') // reset selection for next question
      }else{
        setIsComplete(true)
      }
      

    }

    if(isComplete){
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
          <div className="bg-white p-8 rounded-xl shadow-2xl">
            <p className="text-2xl font-bold text-center">Your score: {score} out of {data.length}</p>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
        <div className="w-full max-w-2xl p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl m-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="text-xl font-semibold py-4 px-6 bg-white/20 rounded-xl text-white">
             {data[index].q}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['a', 'b', 'c', 'd'].map((option) => (
                <div 
                  key={option} 
                  className={`flex items-center p-4 border border-white/30 rounded-xl backdrop-blur-sm transition-all duration-300
                    ${selectedAnswer === data[index][option] 
                      ? 'bg-white/30 border-white' 
                      : 'hover:bg-white/20'}`}
                >
                  <input
                    type="checkbox"
                    name="answer"
                    value={data[index][option]}
                    checked={selectedAnswer === data[index][option]}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label 
                    htmlFor={option} 
                    className="ml-3 text-white cursor-pointer flex-1"
                  >
                    {data[index][option]}
                  </label>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <button 
                type="submit" 
                className="w-full bg-white/20 text-white py-3 px-6 rounded-xl hover:bg-white/30 transition-all duration-300 font-semibold"
              >
                {index === data.length -1 ? 'Finish':'Next Question'}
              </button>
              
              <div className="text-white text-center font-semibold">
                Question {index + 1} of {data.length}
              </div>
            <div className='flex items-center justify-around'>
               <button 
                type="button"
                onClick={() => {
                  if(window.confirm("Play Again")) {
                    setIsComplete()
                  }
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                Play Again
              </button>
              <button 
                type="button"
                onClick={() => {
                  if(window.confirm("Are you sure you want to end the quiz?")) {
                    setIsComplete(true)
                  }
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                End Quiz
              </button>
              
            </div>
            </div>
          </form>
        </div>
      </div>
    )
}

export default Quiz