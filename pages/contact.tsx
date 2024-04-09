import Head from "next/head";

import ContactForm from "../components/contact/contact-form";

export default function ContactPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Contact me</title>
        <meta name="description" content="Send me your messages!" />
      </Head>
      <ContactForm />
    </>
  );
}
