import { useRef } from 'react';
import classes from './newsletter-registration.module.css';

const NewsletterRegistration = () => {
  const emailInputRef = useRef(null);

  const registrationHandler = (event) => {
    event.preventDefault();

    fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailInputRef.current.value
      })
    })
      .then((resp) => resp.json())
      .then((res) => {
        console.log(res)
      });

  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
