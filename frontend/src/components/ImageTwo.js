import { Parallax } from 'react-parallax';
import math from '../images/math.webp';
import './ImageOne.css'

const ImageTwo = () => (
    <Parallax className='imageone'blur={10} bgImage={math} bgImageAlt="code" strength={200}>
        <div className='content'>
         <span className='img-txt'>
         Ask Anything!<br></br>
         we guarantee that <br></br> you will never return Empty..
         </span>
        </div>
    </Parallax>
);

export default ImageTwo;