import { createPortal } from 'react-dom'
import {AiOutlineClose} from 'react-icons/ai'

const Modal = ({isOpen,onClose, children}) => {
  return createPortal(
   <>
   {isOpen && (
   <>
   <div className='m-auto relative z-50 min-h-[200px] bg-white max-w-[350px]'>
    <div className='flex justify-end p-4'>
        <AiOutlineClose onClick={onClose} className='cursor-pointer'/>
    </div>
    {children}
    </div>

    <div className=' h-screen w-screen backdrop-blur absolute top-0 z-40'/>
   
   </>
   )}
   </>,
   document.getElementById("modal-root")
  )
}

export default Modal