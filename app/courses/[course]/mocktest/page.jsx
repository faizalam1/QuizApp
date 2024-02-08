import Questions from "@/components/Questions";

export const dynamic = "force-dynamic";

const mockQuizPage = (params) => {
    const { organization, course } = params.params;
    return (
        <div>
            {organization} {course} Mock Quiz Page
            
            <Questions courseID={course} />
        
        </div>
    )
}


export default mockQuizPage;