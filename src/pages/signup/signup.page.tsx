import {Link, useNavigate} from "react-router-dom";
import {getToken} from "../../helpers/token";
import React, {FormEvent, useEffect, useState} from "react";
import {signUp, SignUpPayload} from "../../services/auth.service";
import {AxiosError} from "axios";


export default function SigninPage() {
    const token = getToken()
    const navigation = useNavigate()

    const [error, setError] = useState("")
    const [success, setSucces] = useState("")


    const [payload, setPayload] = useState<SignUpPayload>({
        email: "",
        password: ""
    })

    const handlerChange = ((e: React.ChangeEvent<HTMLInputElement>) => {
        setPayload(value => ({
            ...value,
            [e.target.name]: e.target.value
        }))
    })

    useEffect(() => {
        if(token) {
            navigation("/dashboard")
        }
    }, [token, navigation])


    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        signUp(payload).then(() => {
            setTimeout(() => {
                navigation("/")
            }, 400)
            setSucces("Signup is success")
            setError("")
        }).catch(err => {
            if(err instanceof AxiosError) {
                if(err.status === 400) {
                    setError(err.response?.data?.errors[0]?.message)
                } else {
                    setError("Something internal server")
                }
            }
        })
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {error && (<div className="text-center py-4 px-2 bg-red-500 text-white rounded">
                        {error}
                    </div>)}
                    {success && (<div className="text-center py-4 px-2 bg-yellow-400 text-white rounded">
                        {success}
                    </div>)}
                    <form action="#"  onSubmit={submitHandler} method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handlerChange}
                                    value={payload.email}
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={handlerChange}
                                    value={payload.password}
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already member?{' '}
                        <Link to="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
