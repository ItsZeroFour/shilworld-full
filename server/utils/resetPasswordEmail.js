import nodemailer from "nodemailer";

const resetPasswordEmail = async (email, link) => {
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
      subject: "Сброс пароля для аккаунта",
      text: "Сброс пароля",

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
        <a
          href="${link}"
          style="
            background: #3570ec;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            color: #fff;
            font-size: 1.1rem;
            font-family: sans-serif;
            text-decoration: none;
          "
          >Кликните сюда для сброса пароля</a
        >

        <p>
          Если вы не сбрасывали пароль, то игнорируйте это сообщение
        </p>
      </div>
    `,
    });

    console.log("Mail send successfuly");
  } catch (err) {
    console.log(err);
  }
};

export default resetPasswordEmail;