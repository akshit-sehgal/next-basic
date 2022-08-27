import { useContext, useRef } from 'react';
import NotificationContext from '../../store/notification-context';
import classes from './newsletter-registration.module.css';

const NewsletterRegistration = () => {
  const emailInputRef = useRef(null);
  const {showNotification} = useContext(NotificationContext);

  const registrationHandler = (event) => {
    event.preventDefault();

    showNotification({
      title: 'Signing Up...',
      message: 'Registering for newsletter',
      status: 'pending'
    });

    fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailInputRef.current.value
      })
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        return resp.json().then((data) => {
          throw new Error(data.message || 'Something went wrong')
        });
      })
      .then((res) => {
        showNotification({
          title: 'Success',
          message: 'Registered successfully',
          status: 'success'
        });
      }).catch((err)=>{
        showNotification({
          title: 'Error',
          message: err.message || 'Something went wrong!',
          status: 'error'
        });
      })

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
