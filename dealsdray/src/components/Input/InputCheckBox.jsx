import React, { useState } from 'react'

const InputCheckBox = () => {
    const [allchecked, setAllChecked] = useState([])

    function handleChange(e) {
        if (e.target.checked) {
            setAllChecked([...allchecked, e.target.value]);
        } else {
            setAllChecked(allchecked.filter((item) => item !== e.target.value));
        }
    }
        
  return (
      <div>
      <h4>
      
      </h4>
      <div>
        <input value="One" type="checkbox" onChange={handleChange} />
        <span> One </span>
      </div>
      <div>
        <input value="Two" type="checkbox" onChange={handleChange} />
        <span> Two </span>
      </div>
      <div>
        <input value="Three" type="checkbox" onChange={handleChange} />
        <span> Three </span>
      </div>
      <div>
        <input value="Four" type="checkbox" onChange={handleChange} />
        <span> Four </span>
      </div>
      <div>
        <input value="Five" type="checkbox" onChange={handleChange} />
        <span> Five </span>
      </div>
      <div>The all checked values are {allchecked.join(" , ")}</div>
    </div>
  );
}

export default InputCheckBox