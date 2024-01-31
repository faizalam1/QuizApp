import { useEffect, useState } from "react";


const AddOption = ({ optionNumber, addOption }) => {
  const [option, setOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(
    () => {
      addOption(option, isCorrect, optionNumber);
    },
    [option, isCorrect]
  )

  return (
    <>
      <p>
        Option {optionNumber}:
      </p> <br />
      <label htmlFor="option">
        Option Text:
      </label>
      <input className="p-2 m-2" type="text" name="option" placeholder="Option" value={option.option} onChange={e => setOption(e.target.value)} />
      <div className="flex justify-center">
      <label htmlFor="isCorrect">
        Is Correct:
      </label>
      <input className="p-2 m-2" type="checkbox" name="isCorrect" placeholder="Is Correct" value={option.isCorrect} onChange={e => setIsCorrect(!isCorrect)} />
      </div>
    </>
  )
}

export default AddOption;