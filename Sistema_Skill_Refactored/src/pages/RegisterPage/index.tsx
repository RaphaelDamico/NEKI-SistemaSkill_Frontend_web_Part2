import RegisterForm from "../../components/RegisterForm";
import styles from "./styles.module.css";

export default function RegisterPage() {

    return (
      <main className={styles.bodyContainer}>
        <div className={styles.bodyContent}>
          <section className={styles.textContainer}>
            <h1 className={styles.title}>System Skills</h1>
            <h2 className={styles.subTitle}>Gerencie e desenvolva suas habilidades profissionais.</h2>
          </section>
          <RegisterForm />
        </div>
      </main>
    )
  };