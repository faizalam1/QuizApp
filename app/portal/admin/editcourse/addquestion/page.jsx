import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import AddQuestionForm from "@components/AddQuestionForm";

const addQuestionPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
        redirect("/auth");
    }

    return (
        <div className="flex-col items-center w-full">
            <h1 className="mt-10 text-center text-4xl font-bold text-gray-900">Add Question</h1>
            <AddQuestionForm />
        </div>
    )
}

export default addQuestionPage;