import dotenv from "dotenv";

dotenv.config();

import nodemailer from "nodemailer";

import type { EmailArgs } from "../../types/types.ts";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export const generateEnquiryEmail = async (args: EmailArgs) => {
  try {
    const res = transporter.sendMail({
      sender: process.env.EMAIL,
      to: "dravidiancampus1@gmail.com",
      subject: `Query regarding Admission of ${args.fullName}`,
      html: `
<div style="
    max-width:600px;
    margin:auto;
    font-family:Arial,sans-serif;
    background:#ffffff;
    border-radius:12px;
    overflow:hidden;
    border:1px solid #e5e7eb;
">

    <!-- Header -->
    <div style="
        background:#FAEED4;
        padding:24px;
        text-align:center;
    ">
        <h1 style="
            margin:0;
            color:#251901;
        ">
            Dravidian Campus
        </h1>

        <p style="
            margin-top:8px;
            color:#666;
        ">
            New Admission Enquiry
        </p>
    </div>

    <!-- Content -->
    <div style="padding:24px;">

        <h2 style="
            color:#251901;
            margin-bottom:20px;
        ">
            Student Details
        </h2>

        <table style="
            width:100%;
            border-collapse:collapse;
        ">

            <tr>
                <td style="padding:10px;font-weight:bold;">
                    Name
                </td>
                <td style="padding:10px;">
                    ${args.fullName}
                </td>
            </tr>

            <tr style="background:#f9fafb;">
                <td style="padding:10px;font-weight:bold;">
                    Email
                </td>
                <td style="padding:10px;">
                    ${args.email}
                </td>
            </tr>

            <tr>
                <td style="padding:10px;font-weight:bold;">
                    Phone
                </td>
                <td style="padding:10px;">
                    ${args.phoneNo}
                </td>
            </tr>

            <tr style="background:#f9fafb;">
                <td style="padding:10px;font-weight:bold;">
                    Course
                </td>
                <td style="padding:10px;">
                    ${args.course}
                </td>
            </tr>

        </table>

        <div style="
            margin-top:24px;
        ">
            <h3 style="color:#251901;">
                Message
            </h3>

            <div style="
                background:#f9fafb;
                padding:16px;
                border-radius:8px;
                line-height:1.6;
            ">
                ${args.message ?? ""}
            </div>
        </div>

    </div>

    <!-- Footer -->
    <div style="
        background:#251901;
        color:white;
        text-align:center;
        padding:20px;
    ">
        <p style="margin:0;">
            Dravidian Campus
        </p>

        <p style="
            margin-top:6px;
            color:#d1d5db;
            font-size:14px;
        ">
            Coaching • Computer Classes • Digital Library
        </p>
    </div>

</div>
`,
    });

    console.log(res);
  } catch (e) {
    throw new Error("Having trouble in sending query");
  }
};

// generateEnquiryEmail({
//   fullName: "Ankit Yadav",
//   email: "ankit@gmail.com",
//   phoneNo: "7800err455",
//   course: "computer",
//   message: "some message",
// });
