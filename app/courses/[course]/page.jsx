import CoursePage from '@components/CoursePage';

const coursePage = ({ params }) => {
    return (
        <div className='flex flex-col items-center justify-center w-full h-full'>
            <CoursePage courseId={params.course} />
        </div>
    )
}

export default coursePage;