import {
  useCallback,
  useEffect,
  useState,
  useRef
} from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [charactersAllowed, setcharactersAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = "";  // password variable
    let str = "ABCDEFGHJKLMNPQRSTUWXYZabcdefghijkmnpqresuvwxyz"; // string containing characters A-Z, a-z
    if (numbersAllowed) str += "23456789";  // if numbers are allowed, add numbers to string
    if (charactersAllowed) str += "@#$%^&*_"; // if characters are allowed, add characters to the string

    // generating password
    for (let i = 1; i <= length; i++) {
      // taking a random index from the `str`.adding 1 so that it doesn't returns zero
      let char = Math.floor(Math.random() * str.length + 1);

      // adding the item in that random index to the password variable
      pass += str.charAt(char);
    }

    setPassword(pass);  // setting the password
  }, [length, numbersAllowed, charactersAllowed, setPassword])

  // useEffect hook
  useEffect(() => {
    passwordGenerator()
  }, [length, numbersAllowed, charactersAllowed, passwordGenerator])

  // useRef hook
  const passwordRef = useRef(null)

  // Copying the password in clipboard
  const copyPassword = useCallback(() => {

    passwordRef.current?.select()

    // writing the password value in clipboard 
    window.navigator.clipboard.writeText(password)
    // NOTE: We can use this in react because the code is running on client side.
    // while using nextjs, use 'use client' on top to access window element
  }, [password])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg py-3 px-4 my-8 bg-[#393E46]'>
        <h1 className='text-3xl my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">

          {/* Password Input Feild */}
          <input type="text"
            value={password}
            className='bg-[#EEEEEE] text-[#222831] outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />

          {/* Copy Button */}
          <button
            onClick={copyPassword}
            className='bg-[#00ADB5] text-[#222831] outline-none px-3 py-2 shrink-0 hover:bg-[#00acb5e1]'
          >COPY
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>

          {/* Setting Length */}
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={25}
              value={length}
              className='cursor-pointer'
              onChange={(eLength) => {
                setLength(eLength.target.value)
              }}
            />
            <label>Length: {length}</label>
          </div>

          {/* Setting numbersAllowed */}
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numbersAllowed}
              value={setNumbersAllowed}
              className='cursor-pointer'
              onChange={(e) => {
                setNumbersAllowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>

          {/* Setting charactersAllowed */}
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charactersAllowed}
              value={setcharactersAllowed}
              className='cursor-pointer'
              onChange={(e) => {
                setcharactersAllowed((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
