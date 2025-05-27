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
      return (<p>Your score: {score} out of {data.length}</p>)
    }

  return (
    <div className='flex  items-center justify-center  p-4 h-100  rounded-2xl bg-amber-50'>

      <form onSubmit={handleSubmit} className="">
        
        <div className="text-lg font-semibold py-2 px-4 mb-6 bg-red-400 rounded ">
         {data[index].q}
        </div>
        {/* grid container for options */}
        <div className="grid grid-cols-2  gap-4">
          {['a', 'b', 'c', 'd'].map((option) => (
            <div key={option} className=" flex items-center p-2 gap-2 border rounded-lg hover:bg-red-400">
              <input
                type="checkbox"
                // id={option}
                name="answer"
                value={data[index][option]}
                checked={selectedAnswer === data[index][option]}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <label 
                htmlFor={option} 
                className="text-gray-700 cursor-pointer"
              >
                {data[index][option]}
              </label>
            </div>
          ))}
        </div>

        <button type="submit" className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600   transition-colors duration-200">{index === data.length -1 ? 'Finish':'Next Question'}</button>
        <label className=' flex items-center justify-center mt-2 font-semibold' htmlFor={index} >Total {index + 1} of {data.length} </label>
      </form>
        
    </div>
  )
}

export default Quiz