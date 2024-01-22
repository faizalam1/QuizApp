const coursePage = ({ params }) => {
    return (
        <div>{params.organization} {params.course} Page</div>
    )
}

export default coursePage;