import React from 'react'

const Button = ({onClickHandler, value, title}) => {
    // const ab = () => {
    //     console.log("all good here")
    // }
  return (
    <button onClick={onClickHandler} value={value} className={`px-2 py-1 border text-base hover:bg-blue
            hover:text-white`}>
        {title}
    </button>  
)
}

export default Button