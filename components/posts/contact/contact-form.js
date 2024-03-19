import { useState } from 'react'
import classes from './contact-form.module.css'

export default function ContactForm() {
    const [email, setEmail ] = useState('')
    const [name, setName ] = useState('')
    const [message, setMessage ] = useState('')

    function submitMessageHandler(e) {
        e.prevent.default()

        fetch('api/contact', {
            method: 'POST',
            body: JSON.stringify({email, name, message}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }


    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form className={classes.form} onSubmit={submitMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor='email'>Your email</label>
                        <input type='email' id='mail' required value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='name'>Your name</label>
                        <input type='text' id='name' required value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
                <div className={classes.control}>
                        <label htmlFor='message'>Your message</label>
                        <textarea id='message' rows='5' required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>
                <div className={classes.actions}>
                    <button>Send message</button>
                </div>
            </form>
        </section>
    )
}