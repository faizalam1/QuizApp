'use client'
import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/navigation';

const SignUp = () => {
    const [formdata, setFormdata] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [formValid, setFormValid] = useState({
        email: false,
        username: false,
        confirmPassword: false
    });

    const [passwordStrong, setPasswordStrong] = useState(false);

    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, username, password, confirmPassword } = formdata;
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            })
        });
        if (res.status == 201){
            signIn('credentials', {
                emailOrUsername: email,
                password: password,
                redirect: false
            });
            router.push('/courses');
            router.refresh();
        }
        else if (res.status == 400)
            alert("Email or username are not valid");
        else if (res.status == 409)
            alert("Email or username is already taken");
        else
            alert("User creation failed");
    }

    useEffect(() => {
        const emailRegex = new RegExp(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/);
        if (emailRegex.test(formdata.email)) {
            setFormValid({ ...formValid, email: true });

        }
        else {
            setFormValid({ ...formValid, email: false });
        }
    }, [formdata.email]);

    useEffect(() => {
        //Username should be 3 characters long and can contain only alphanumeric characters and underscore
        const UsernameRegex = new RegExp(/^[a-zA-Z0-9_]{3,}$/);
        if (UsernameRegex.test(formdata.username)) {
            setFormValid({ ...formValid, username: true });
        }
        else {
            setFormValid({ ...formValid, username: false });
        }
    }, [formdata.username]);

    useEffect(() => {
        //Password should be 8 characters long and should contain atleast one uppercase, one lowercase, one number and one special character
        const isPasswordStrong =

            setPasswordStrong(passwordStrong);
        console.log(isPasswordStrong);
    }, [formdata.password]);

    useEffect(() => {
        if (formdata.password === formdata.confirmPassword) {
            setFormValid({ ...formValid, confirmPassword: true });
        }
        else {
            setFormValid({ ...formValid, confirmPassword: false });
        }
    }, [formdata.password, formdata.confirmPassword]);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign Up your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="/api/register" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <a
                                data-tooltip-id='emailErrorTooltip'
                                data-tooltip-variant='error'
                                data-tooltip-content='Please enter a valid email address.'
                            >
                                <input
                                    name="email"
                                    id="RegisterEmail"
                                    type="email"
                                    value={formdata.email}
                                    onChange={(e) => setFormdata({ ...formdata, email: e.target.value })}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                />
                            </a>
                        </div>
                        <Tooltip
                            id="emailErrorTooltip"
                            place="bottom"
                            effect="solid"
                            isOpen={formdata.email}
                            hidden={formValid.email}
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <a
                                data-tooltip-id='usernameErrorTooltip'
                                data-tooltip-variant='error'
                                data-tooltip-html='Username must be at least 3 characters long, composed of alphanumeric characters and underscores (_),<br> and it should be unique.'
                            >
                                <input
                                    name="username"
                                    type="username"
                                    value={formdata.username}
                                    onChange={(e) => setFormdata({ ...formdata, username: e.target.value })}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                />
                            </a>
                        </div>
                        <Tooltip
                            id="usernameErrorTooltip"
                            place="bottom"
                            effect="solid"
                            isOpen={formdata.username}
                            hidden={formValid.username}
                        />
                    </div>

                    <div>

                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>

                        <div className="mt-2">
                            <a
                                data-tooltip-id='passwordErrorTooltip'
                                data-tooltip-variant='error'
                                data-tooltip-html='Password must be at least 8 characters long, composed of at least one uppercase letter, <br>one lowercase letter, one number and one special character.'
                            >
                                <input
                                    name="password"
                                    type="password"
                                    value={formdata.password}
                                    onChange={(e) => setFormdata({ ...formdata, password: e.target.value })}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                />
                            </a>
                        </div>
                        <Tooltip
                            id="passwordErrorTooltip"
                            place="bottom"
                            effect="solid"
                            isOpen={formdata.password}
                            hidden={
                                formdata.password.length >= 8 &&
                                Boolean(formdata.password.match(/[a-z]/)) &&
                                Boolean(formdata.password.match(/[A-Z]/)) &&
                                Boolean(formdata.password.match(/[0-9]/)) &&
                                Boolean(formdata.password.match(/[^a-zA-Z0-9]/))
                            }
                        />
                    </div>

                    <div>

                        <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                            Confirm Password
                        </label>

                        <div className="mt-2">
                            <a
                                data-tooltip-id='confirmPasswordErrorTooltip'
                                data-tooltip-variant='error'
                                data-tooltip-content='Passwords do not match.'
                            >
                                <input
                                    name="confirmPassword"
                                    type="Password"
                                    value={formdata.confirmPassword}
                                    onChange={(e) => setFormdata({ ...formdata, confirmPassword: e.target.value })}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                />
                            </a>
                        </div>
                        <Tooltip
                            id="confirmPasswordErrorTooltip"
                            place="bottom"
                            effect="solid"
                            isOpen={formdata.confirmPassword}
                            hidden={formValid.confirmPassword}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={formValid.email && formValid.username &&
                                formdata.password.length >= 8 &&
                                Boolean(formdata.password.match(/[a-z]/)) &&
                                Boolean(formdata.password.match(/[A-Z]/)) &&
                                Boolean(formdata.password.match(/[0-9]/)) &&
                                Boolean(formdata.password.match(/[^a-zA-Z0-9]/)) &&
                                formValid.confirmPassword ? false : true}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;