import { Parallax } from 'react-parallax';
import code from '../images/code.webp';
import './ImageOne.css'

const ImageOne = () => (
    <Parallax className='imageone'blur={10} bgImage={code} bgImageAlt="code" strength={200}>
        <div className='content'>
         <span className='img-txt'>
         Gurukul Is An Open Community<br></br>
           For Anyone That Codes...
         </span>
        </div>
    </Parallax>
);

export default ImageOne;