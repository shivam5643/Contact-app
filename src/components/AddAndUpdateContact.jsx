import { ErrorMessage, Field, Form, Formik } from "formik"
import Modal from "./Modal"
import{db} from '../config/firebase'
import { addDoc,collection, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify"
import * as Yup from "yup";

const cotactSchemaValidation =Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
})
const AddAndUpdateContact = ({isOpen,onClose , isUpdate ,contact}) => {
  const addConatact= async (contact)=>{
    try {
      const contactRef=collection(db,"Contact");
       await addDoc(contactRef,contact);
       onClose();
       toast.success("Conatact Added Successfully")
    } catch (error) {
      console.log(error)
    }
  };  

  const UpdateConatact= async (contact,id)=>{
    try {
      const contactRef=doc(db,"Contact",id);
       await updateDoc(contactRef,contact);
       onClose();
       toast.success("Conatact Updated Successfully")
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div>
  <Modal isOpen={isOpen} onClose={onClose} > 
  <Formik

    validationSchema={cotactSchemaValidation}
    initialValues={isUpdate ?{
      name:contact.name,
      email: contact.email,

    }:{
      name:"",
      email: "",
    }}
    onSubmit={(values)=>{
    console.log(values)
    isUpdate?
    UpdateConatact(values,contact.id) : 
    addConatact(values);
    }}     
  
  >
          <Form className="flex flex-col gap-4 p-3">
            <div className="flex flex-col gap-1 ">
            <label htmlFor="name">Name</label>
            <Field name="name" className="h-10 border"   />
            <div className="text-xs text-red-500">
              <ErrorMessage name="name" />
            </div>
            </div>

            <div className="flex flex-col gap-1 py-2">
            <label htmlFor="email">Email</label>
            <Field  name="email" className="h-10 border"   />
            <div className="text-xs text-red-500">
              <ErrorMessage name="email" />
            </div>
            </div>

            <button className="bg-orange border p-5 my-4 self-end ">
               {isUpdate? "update": "add"} contact
            </button>
          </Form>
        </Formik>      
  </Modal>   
    
    </div>
  );
};

export default AddAndUpdateContact