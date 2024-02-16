import { useEffect, useState } from "react";


const AddDropdownOption = ({ optionNumber, addOption }) => {
    const [option, setOption] = useState([""]);
    const [isCorrect, setIsCorrect] = useState("");
    const [dropdownOptionNumber, setOptionNumber] = useState(1);

    useEffect(
        () => {
            addOption(option, isCorrect, optionNumber);
        },
        [option, isCorrect]
    )

    return (
        <>
            <p>
                DropDown Option {optionNumber}:
            </p> <br />
            <div className="flex flex-col mb-2 ml-8">
            <label htmlFor={`dropdown${optionNumber}OptionNumber`}>
                Dropdown options count:
            </label> <br />
            <input
                className="p-2 m-2"
                type="number"
                name={`dropdown${optionNumber}OptionNumber`}
                placeholder={`Dropdown Option Number`}
                value={dropdownOptionNumber}
                onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                onChange={e => setOptionNumber(e.target.value)}
            />
            <br />
            <div className="flex flex-col mb-2">
                {Array.from({ length: dropdownOptionNumber }, (_, i) => (
                    <div key={i + 1}>
                        <label htmlFor={`dropdown${optionNumber}Option${i + 1}`}>
                            Option {i + 1}:
                        </label> <br />
                        <input
                            className="p-2 m-2"
                            type="text"
                            name={`dropdown${optionNumber}Option${i + 1}`}
                            placeholder={`Option ${i + 1}`}
                            value={option[i]}
                            onChange={e => {
                                let temp = [...option];
                                temp[i] = e.target.value;
                                setOption(temp);
                            }}
                        />
                        <br />
                    </div>
                ))}
            </div>
            <div className="flex flex-col mb-2">
                <label htmlFor={`dropdown${optionNumber}Correct`}>
                    Correct:
                </label> <br />
                <input
                    className="p-2 m-2"
                    type="text"
                    name={`dropdown${optionNumber}Correct`}
                    placeholder={`Correct Value for Option ${optionNumber}`}
                    value={isCorrect}
                    onChange={e => setIsCorrect(e.target.value)}
                />
                
            </div>
            </div>
        </>
    )
}

export default AddDropdownOption;