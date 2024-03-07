import {CalendarDaysIcon} from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom';
const PostItem = ({post}) => {
    const {id,title, date, image} = post;
  return (
    <section className='posts'> 
        <Link to={`${id}`}><img src={image} alt={title} /></Link>
        <Link to={`${id}`}><p className='title'>{title}</p></Link>
        <p className='date'><CalendarDaysIcon className='dateIcon'/>{date}</p>
        <hr />
        {/* <p>{description}</p> */}
    </section>
  )
}

export default PostItem