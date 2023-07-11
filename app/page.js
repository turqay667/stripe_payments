import Image from 'next/image'
import styles from './page.module.css'
import PaymentForm from './components/PaymentForm';

export default function Home() {

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <h2>Stripe payment page</h2>
       <PaymentForm/>
      </div>
    </main>
  )
}
