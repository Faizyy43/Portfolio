import { useState } from "react";

export default function Contact() {
    const [form, setForm] = useState({ name:"", email:"", message:""});

    const submit = async (e) => {
        e.prevenDefault();
        await api.post("/contact", form);
        alert("Message Sent");
    };

    return (
       <form onSubmit={submit} className="p-6 flex flex-col gap-3">
        <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})} />
        <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})} />
        <textarea placeholder="Message" onChange={e=>setForm({...form,message:e.target.value})}></textarea>
        <button className="bg-blue-500 text-white p-2">Send</button>
       </form>
    )
}