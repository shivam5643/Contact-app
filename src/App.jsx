import { useEffect, useState } from "react";
import Navbar from "./components/Navbar"
import { FaSearch,  } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import {collection, getDocs, onSnapshot} from 'firebase/firestore'
import { db } from "./config/firebase";
import ConatactCard from "./components/ConatactCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import Modal from "./components/Modal";
import NotFoundContact from "./components/NotFoundContact";

const App = () => {
 const [contacts,setContacts]=useState([]);
 const [isOpen,setOpen]=useState(false);

 const onOpen=()=>{
  setOpen(true);

 };
 const onClose=()=>{
  setOpen(false);

 };

 

 useEffect(()=>{
  const getContacts= async()=>{
    try {
      const contactRef=collection(db,"Contact");
      

      onSnapshot(contactRef,(snapshot)=>{
        const contactLists=snapshot.docs.map((doc)=>{
          return {
           id: doc.id,
           ...doc.data(),
          }
       })
      setContacts(contactLists);
      return contactLists;
 
      });
    } catch (error) {
      console.log(error)
    }
  }
  getContacts();
 },[])

 const fileterContacts=(e)=>{
  const value =e.target.value;
  const contactRef=collection(db,"Contact");
      

      onSnapshot(contactRef,(snapshot)=>{
        const contactLists=snapshot.docs.map((doc)=>{
          return {
           id: doc.id,
           ...doc.data(),
          }
       })

       const filteredContacts=contactLists.filter(contact=>
        contact.name.toLowerCase().includes(value.toLowerCase()))
      setContacts(filteredContacts);
      return filteredContacts;
    });
 
 };

  return (
    <>
    <div className="max-w-[375px] mx-auto px-4">
     <Navbar/>
      <div className="flex relative gap-2 ">
       <FaSearch className="text-white text-3xl absolute mt-1  ml-1 px-0.5" />
        <input 
         onChange={fileterContacts}
         type="text"
         className= "text-white pl-10  h-10 border-white rounded-m items-center rounded-md flex-grow bg-transparent border"
         />

         <div >

         <FaPlusCircle onClick={onOpen} className="text-white ml-1 text-4xl items-center content-center cursor-pointer gap-2" />
         </div>
      </div>
      <div className=" mt-4  flex flex-col gap-2" >
         {contacts.length<=0? <NotFoundContact/>: contacts.map((contact)=>(
            <ConatactCard contact={contact} key={contact.id}/>
          ))}
      </div>
      
     </div>
     {/* <Modal onClose={onClose} isOpen={isOpen} /> */}
     <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
    <ToastContainer position="bottom-center"/>
    </>
  )
}

export default App