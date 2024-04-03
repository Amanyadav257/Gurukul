import { Parallax } from 'react-parallax';
import matrix from '../images/nasa.webp';
import './ImageOne.css'

const ImageThree = () => (
    <Parallax className='imageone'blur={10} bgImage={matrix} bgImageAlt="matrix" strength={200}>
        <div className='content'>
         <span className='img-txt'>
         <a className='ask' href='/questions'>Get Help From Professionals Now</a>
         </span>
        </div>
    </Parallax>
);

export default ImageThree;