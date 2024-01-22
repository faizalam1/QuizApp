
export const dynamic = "force-dynamic";

const mockQuizPage = (params) => {
    const { organization, course } = params.params;
    return (
        <div>{organization} {course} Mock Quiz Page</div>
    )
}


export default mockQuizPage;