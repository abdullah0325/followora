import React from 'react'

const GradientWrapper = ({children}) => {
  return (
 
    <div className=" rounded-md  bg-gradient-to-r from-red-600 to-pink-600 hover:from-pink-600 hover:to-red-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-pink-500/40  disabled:opacity-60">
      {children}
    </div>
)
}

export default GradientWrapper