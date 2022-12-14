import React from 'react'
import { useState } from 'react'
import axios from "axios"

const PasswordGen = () => {
const [letterAmount, setLetterAmount] = useState("")
const [numberAmount, setNumberAmount] = useState("")
const [symbolAmount, setSymbolAmount] = useState("")
const [password, setPassword] = useState("")

const [word, setWord] = useState("")
const [number, setNumber] = useState("")
const [symbol, setSymbol] = useState("")

const symbols = [ '~', '!', '@', '#', '$', '%', '^', '&', '*', '-', '+', '=', '?']

function getNum(numberAmount) {
  let result = Math.floor(Math.random() * (10 ** numberAmount))
  return result
}
function getMultipleRandom(symbols, symbolAmount) {
  const shuffled = [...symbols].sort(() => .5 - Math.random());
  let symbolResults = (shuffled.slice(0, symbolAmount));
  return symbolResults.join('');
}

const client = axios.create({
  baseURL: "https://random-word-api.herokuapp.com/"
})


let handleSubmit = async (e) => {
  e.preventDefault()
try {
  const response = await client.get(`word?length=${letterAmount}`)
  let data = response.data[0]
  let upperCased = data.charAt(0).toUpperCase() + data.slice(1)
  setWord(upperCased)
  setNumber(getNum(numberAmount))
  setSymbol(getMultipleRandom(symbols, symbolAmount));
  setPassword(`${word}${number}${symbol}`)
} catch (error) {
  console.log(error)
} 
}

  return (
    <>
      <div className="intro">
        <h1>Password Gen</h1>
        <p>With threats to cyber security on the rise, websites have to up their password requirements for the user's safety. Let's face it though, creating these passwords can be a hassle especially when changing them. PasswordGen comes into play by allowing you to create a random password combination that also makes sense!</p>
        <p> Most password generators make a random string of characters and symbols but no one is going to remember that when we want to sign in. Here you will be able to generate a password through filters and the root of the password will always be an actual word so it is easier to remember. It will also be less biased, making it harding to determine by others. Give it a shot below!</p>
      </div>
      <div className="instructions">
        <h1>Instructions</h1>
      <h3>Input in the following filters to help fit the password creation guidelines needed</h3>
      </div>
    <div className="passwordGen">
      <div className="passwordForm">
      <form onSubmit={handleSubmit}>
        <label>Amount of letter chracters for word:</label>
        <input type="number" value={letterAmount} onChange={(e) => setLetterAmount(e.target.value)}min={0} max={8} required/>
        <label>Amount of Numeric characters:</label>
        <input type="number" value={numberAmount} onChange={(e) => setNumberAmount(e.target.value)}min={0} max={9} required/>
        <label>Amount of special characters</label>
        <input type="number" value={symbolAmount} onChange={(e) => setSymbolAmount(e.target.value)} min={0} max={5} required></input>
        <button type="submit">Generate</button>
      </form>
      </div>
      {password && <h1>{password}</h1>}
    </div>
    </>
  )
}

export default PasswordGen