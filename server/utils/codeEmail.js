import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const verifyMail = async (email, code) => {
  try {
    /* NODEMAILER STUFF */
    const transporter = nodemailer.createTransport({
      service: "yandex",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    /* TESTING SUCCESS */
    transporter.verify((err, success) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Nodemailer ready for message, ${success}`);
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Вход в аккаунт",
      text: "Код для входа в аккаунт",

      html: `
        <div style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin-top: 2rem;
          gap: 1rem;
        "
      >

        <h1>Ваш код: ${code}</h1>

        <p>
          Никому не сообщайте этот код!
        </p>
      </div>
    `,
    });

    console.log("Mail send successfuly");
  } catch (err) {
    console.log(err);
  }
};

export default verifyMail;
