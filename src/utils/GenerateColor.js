import React, { useEffect } from 'react'
import tinycolor from 'tinycolor2'

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// const [previousColor, setPreviousColor] = useEffect("")

export const generateRandomColor = (baseColor) => {
    // if(baseColor) return tinycolor(baseColor).complement().toHexString()
    if(baseColor) {
        const background = tinycolor(baseColor).complement().toHexString()
        const header = tinycolor(background).darken(10).toString()
        const isLight = tinycolor(background).isLight()
        return { header, background, isLight }
    }

    let previousColor

    const palette = ["#8b41ff", "#6845fb", "#fe00ea", "#0038b9", "#ff0000", "#87e2ff", "#00ffd1", "#6e49ff", "#eb7f00", "#0057ff", "#ffa800", "#ff6868", "#0ca6dd", "#13df01"]
    const colors = tinycolor(palette[getRandomInt(palette.length - 1)]).analogous();
    const array = colors.map(function(t) { return t.toHexString(); });
    const color = shuffle(array)

    if(previousColor === color[0]){
        generateRandomColor()
    }
    
    previousColor = color[0]
    return color[0]
}