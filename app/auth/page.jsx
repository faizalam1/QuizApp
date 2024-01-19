import SignIn from "@components/SignIn";
import SignUp from "@components/SignUp";

const authPage = () => {
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