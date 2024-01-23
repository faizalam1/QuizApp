import SignIn from "@components/SignIn";
import SignUp from "@components/SignUp";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const authPage = async () => {
    const session = await getServerSession();
    if (session){
        redirect("/courses")
    }

    return (
        <div className="flex-auto md:flex w-full h-full">
            <section className="w-full">
                <SignIn />
            </section>
            <hr className="border-black border-collapse md:hidden" />
            <section className="w-full">
                <SignUp />
            </section>
        </div>
    );
}

export default authPage;