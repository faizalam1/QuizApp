import { useEffect, useState } from "react";


const AddOption = ({ optionNumber, AddOption }) => {
  const [option, setOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(
    () => {
      AddOption(option, isCorrect, optionNumber);
    },
    [option, isCorrect]
  )

  return (
    <>
      <label>
        Option {optionNumber}:
      </label> <br />
      <input className="p-2 m-2" type="text" name="option" placeholder="Option" value={option.option} onChange={e => setOption(e.target.value)} />
      <input className="p-2 m-2" type="checkbox" name="isCorrect" placeholder="Is Correct" value={option.isCorrect} onChange={e => setIsCorrect(e.target.value)} />
    </>
  )
}

export default AddOption;