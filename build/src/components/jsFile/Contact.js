import React from 'react'
import classes from '../cssFile/Contact.module.css';
import contactUsImg from '../Assets/ContactUsImg.jpg'

const Contact = () => {
  return (
    <main className={classes.profile}>
      <main className={classes.auth}>
      <section>
        <form>
          <div className={classes.control}>
            <label htmlFor='name'>Name <span style={{color:"red"}}>*</span></label>
            <input type='text' id='name' required />
          </div>
          <div className={classes.control}>
            <label htmlFor='product'>Email</label>
            <input type='email' id='email' />
          </div>
          <div className={classes.control}>
            <label htmlFor='contact'>Mobile <span style={{color:"red"}}>*</span></label>
            <input type='tel' id='contact' required/>
          </div>
          <div className={classes.control}>
            <label htmlFor='product'>Product</label>
            <input type="text" id='product' />
          </div>
          <div className={classes.control}>
            <label htmlFor='message'>Message</label>
            {/* <input type="textarea" id='message' cols="40" rows="4" placeholder='Please write your query...'/> */}
            <textarea name="message" id="message" cols="40" rows="4" placeholder='Please write your query...'></textarea>
          </div>
          <button className={classes.btn}>Submit Now</button>
        </form>
      </section>
    </main>
    <main className={classes.auth1}>
      <img className={classes.ContactUsImg} src={contactUsImg} alt="contactUsImg" />
    </main>
    </main>
  );
};

export default Contact;

//onClick={ () => props.onLogIn()}
