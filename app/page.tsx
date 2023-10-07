"use client";

import { Button } from '@nextui-org/button';
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import generator from "generate-password-browser";
import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { Tooltip } from "@nextui-org/tooltip";

interface IFormInput {
  length: string
  numbers: boolean
  uppercase: boolean
  symbols: boolean
}

export default function Home() {

  const [password, setPassword] = useState("")
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, setValue } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = ({ length = '16', numbers = true, symbols = true, uppercase = true }) => {

    const data = generator.generate({
      length: parseInt(length),
      numbers,
      lowercase: true,
      uppercase,
      symbols,
      excludeSimilarCharacters: true,
      strict: true,
    })

    setPassword(data);
    setIsOpen(false);
    navigator.clipboard.writeText(data);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">

      <div className="self-center text-xl font-light sm:text-2xl dark:text-white">
        Password Generator
      </div>
      {isOpen && password.length > 0 && <div className="self-center text-sm font-light dark:text-green-400">Password copied</div>}
      <div className="p-1">
        <div className="flex flex-col max-w-md my-3 gap-3">
          <Input
            size='lg'
            variant="bordered"
            type="text"
            value={password}
            onClick={() => setIsOpen(true)}
          />
          <Button onClick={handleSubmit(onSubmit)} color="success" className="hover:-translate-y-1" variant="shadow" size='lg'>
            Generate
          </Button>
        </div>

        <div className="flex flex-row flex-wrap gap-2">
          <div className='flex-auto w-24 h-full'>
            <Input
              type="number"
              label="Length"
              defaultValue={'16'}
              {...register("length")}
              // labelPlacement='outside-left'
              size='lg'
            />
          </div>
          <div className='flex flex-wrap gap-2'>
            <div className="flex flex-col flex-wrap gap-2">
              <div>
                <Checkbox defaultSelected onValueChange={(isSelected: boolean) => setValue('uppercase', isSelected)} size="lg">Uppercase</Checkbox>
              </div>
              <div>
                <Checkbox defaultSelected onValueChange={(isSelected: boolean) => setValue('numbers', isSelected)} size="lg">Numbers</Checkbox>
              </div>
            </div>
            <div className="flex flex-col flex-wrap gap-2">
              <div>
                <Checkbox defaultSelected onValueChange={(isSelected: boolean) => setValue('symbols', isSelected)} size="lg">Symbols</Checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
