import Image from "next/image";

import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/nina.jpeg"
          alt="an image showing Nina"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Nina</h1>
      <p>Its blog about programing.</p>
    </section>
  );
}

export default Hero;
