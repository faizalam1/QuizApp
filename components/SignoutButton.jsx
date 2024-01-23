"use client";
import { signOut } from "next-auth/react";

const SignoutButton = () => {
    return (
        <button type='button' onClick={signOut} className='outline_btn'>
            Sign Out
        </button>
    )
}

export default SignoutButton