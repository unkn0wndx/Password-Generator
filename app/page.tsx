"use client";

import { Button } from '@nextui-org/button';
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import generator from "generate-password-browser";
import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { Select, SelectItem } from "@nextui-org/select";
import 'animate.css';

interface IFormInput {
  length: string
  numbers: boolean
  uppercase: boolean
  lowercase: boolean
  symbols: boolean
}

const numbersLength: number[] = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

export default function Home() {

  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, setValue } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = ({ length = '16', numbers = true, symbols = true, uppercase = true, lowercase = true }) => {

    try {
      const data = generator.generate({
        length: parseInt(length),
        numbers,
        lowercase,
        uppercase,
        symbols
      })

      setPassword(data);
      setIsOpen(false);
      navigator.clipboard.writeText(data);
    } catch (error) {
      alert("You must select at least one option")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">

      <div className="self-center text-xl font-light sm:text-2xl dark:text-white">
        Password Generator
      </div>
      {isOpen && password.length > 0 && <div className="self-center text-sm font-light dark:text-green-400 animate__animated animate__pulse animate__faster">Password copied</div>}
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

        <div className="flex flex-col flex-wrap gap-2 max-w-md">
          <div className='w-full'>
            <Select
              label="Length"
              defaultSelectedKeys={["16"]}
              {...register("length")}
            >
              {numbersLength.map((number) => (
                <SelectItem key={number} value={number}>
                  {number.toString()}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className='flex justify-center flex-wrap gap-2'>
            <Checkbox
              className="inline-flex w-full bg-content1 m-0 hover:bg-content2 items-center justify-start cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent data-[selected=true]:border-primary"
              defaultSelected onValueChange={(isSelected: boolean) => setValue('uppercase', isSelected)}
            >
              <div className="w-full flex justify-between gap-2">
                <div className="flex flex-col items-end gap-1">
                  <span className="text-tiny text-default-500">Uppercase</span>
                </div>
              </div>
            </Checkbox>

            <Checkbox
              className="inline-flex w-full bg-content1 m-0 hover:bg-content2 items-center justify-start cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent data-[selected=true]:border-primary"
              defaultSelected onValueChange={(isSelected: boolean) => setValue('lowercase', isSelected)}
            >
              <div className="w-full flex justify-between gap-2">
                <div className="flex flex-col items-end gap-1">
                  <span className="text-tiny text-default-500">Lowercase</span>
                </div>
              </div>
            </Checkbox>
            <Checkbox
              className="inline-flex w-full bg-content1 m-0 hover:bg-content2 items-center justify-start cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent data-[selected=true]:border-primary"
              defaultSelected onValueChange={(isSelected: boolean) => setValue('numbers', isSelected)}
            >
              <div className="w-full flex justify-between gap-2">
                <div className="flex flex-col items-end gap-1">
                  <span className="text-tiny text-default-500">Numbers</span>
                </div>
              </div>
            </Checkbox>
            <Checkbox
              className="inline-flex w-full bg-content1 m-0 hover:bg-content2 items-center justify-start cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent data-[selected=true]:border-primary"
              defaultSelected onValueChange={(isSelected: boolean) => setValue('symbols', isSelected)}
            >
              <div className="w-full flex justify-between gap-2">
                <div className="flex flex-col items-end gap-1">
                  <span className="text-tiny text-default-500">Symbols</span>
                </div>
              </div>
            </Checkbox>
          </div>
        </div>
      </div>
    </main >
  )
}
