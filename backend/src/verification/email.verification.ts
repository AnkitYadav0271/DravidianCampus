import nodemailer from "nodemailer";

//________________________________________________________________________//

//                     Admin Otp Email                                  //

//________________________________________________________________________//

export const sendOtpEmail = (email: string, otp: string) => {
  if (!email) {
    return false;
  }

  if (!otp) {
    return false;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Password Reset otp",
    html: `<!DOCTYPE html>

<html>

<head>
    <meta charset="UTF-8">
    <title>Password Reset OTP</title>
</head>

<body style="
    margin:0;
    padding:0;
    background:#f5f5f5;
    font-family:Arial, Helvetica, sans-serif;
">

<div style="
    max-width:600px;
    margin:40px auto;
    background:#ffffff;
    border-radius:24px;
    overflow:hidden;
    box-shadow:0 10px 40px rgba(0,0,0,0.08);
">

    <!-- Header -->

    <div style="
        background:linear-gradient(135deg,#FB923C,#F97316);
        padding:40px 30px;
        text-align:center;
    ">

        <h1 style="
            color:white;
            margin:0;
            font-size:32px;
        ">
            Dravidian Campus
        </h1>

        <p style="
            color:#fff7ed;
            margin-top:10px;
            font-size:15px;
        ">
            Secure Password Reset Verification
        </p>

    </div>

    <!-- Body -->

    <div style="padding:40px 30px;">

        <h2 style="
            margin-top:0;
            color:#1f2937;
        ">
            Password Reset Request
        </h2>

        <p style="
            color:#4b5563;
            line-height:1.8;
            font-size:15px;
        ">
            We received a request to reset the password for your
            Dravidian Campus administrator account.
        </p>

        <p style="
            color:#4b5563;
            line-height:1.8;
            font-size:15px;
        ">
            Please use the following One-Time Password (OTP)
            to continue:
        </p>

        <!-- OTP Box -->

        <div style="
            margin:35px 0;
            background:#FAEED4;
            border:2px dashed #FB923C;
            border-radius:20px;
            padding:25px;
            text-align:center;
        ">

            <span style="
                font-size:40px;
                font-weight:700;
                letter-spacing:10px;
                color:#EA580C;
            ">
                ${otp}
            </span>

        </div>

        <p style="
            color:#4b5563;
            line-height:1.8;
            font-size:15px;
        ">
            This OTP will expire in
            <strong>10 minutes</strong>.
        </p>

        <p style="
            color:#4b5563;
            line-height:1.8;
            font-size:15px;
        ">
            If you did not request a password reset,
            you can safely ignore this email.
        </p>

        <!-- Security Notice -->

        <div style="
            background:#fff7ed;
            border-left:4px solid #FB923C;
            padding:15px 20px;
            border-radius:12px;
            margin-top:30px;
        ">

            <strong style="color:#9A3412;">
                Security Notice
            </strong>

            <p style="
                margin:10px 0 0;
                color:#7c2d12;
                line-height:1.6;
                font-size:14px;
            ">
                Never share this OTP with anyone.
                Dravidian Campus staff will never ask
                for your verification code.
            </p>

        </div>

    </div>

    <!-- Footer -->

    <div style="
        background:#fafafa;
        text-align:center;
        padding:25px;
        border-top:1px solid #e5e7eb;
    ">

        <p style="
            margin:0;
            color:#6b7280;
            font-size:13px;
        ">
            © 2026 Dravidian Campus
        </p>

        <p style="
            margin-top:8px;
            color:#9ca3af;
            font-size:12px;
        ">
            Empowering Learning Through Technology
        </p>

    </div>

</div>


</body>

</html>
`,
  };
  transporter.sendMail(emailOptions);
};
