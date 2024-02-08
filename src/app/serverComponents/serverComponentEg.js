// import { dbConnect } from '@/services/mongo'

// import { addCourseToDB } from './actions/add-course'
// import AddCourse from './compoens/AddCourse'
// import CourseList from './compoens/CourseList'

// import CourseList from './components/CourseList'

export default async function Home() {

  // Get a MongoDB connection
//   await dbConnect();
  
  // Get all courses from the db using model
  const allCourses = await courses.find();
  
  // This gets printed on the server console
  console.log({allCourses})

  return (
    <main>
      <div>
        {/* <CourseList allCourses={allCourses} />   */}
      </div>
    </main>
  )
}