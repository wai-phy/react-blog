import {ExclamationTriangleIcon} from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
 
const Error = () => {
  return (
    <section className='errorPage'>
        <div>
            <ExclamationTriangleIcon className='errorIcon'/>
            <p>Something went wrong!!</p>
            <Link to={"/"}><button className='error-btn'>Go back home</button></Link>
        </div>
    </section>
  )
}

export default Error