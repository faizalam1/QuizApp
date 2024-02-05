import Link from 'next/link';

const CourseCard = ({ course }) => {
  return (
    <div className='bg-white flex flex-col bg-opacity-60 p-6 rounded-2xl'>
      <h2 className='font-medium text-lg'>{course.name}</h2>
      <p className='font-light text-base'>{course.organization}</p>
      <Link href={`/courses/${course.id}`}
        className='text-blue-500 hover:underline cursor-pointer'
      >More Info</Link>
    </div>
  )
}

export default CourseCard;