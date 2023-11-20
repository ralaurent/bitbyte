import React, { useEffect, useRef, useState } from "react"

function usePrevious(value) {
    const ref = useRef()
    console.log(ref.current)

    useEffect(() => {
      ref.current = value
      console.log(ref.current)
    },[value])
    
    return ref.current
    
  }
  
  export default usePrevious;