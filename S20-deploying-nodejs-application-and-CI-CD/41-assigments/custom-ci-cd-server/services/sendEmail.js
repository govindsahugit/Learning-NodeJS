import { Resend } from "resend";

const resend = new Resend(process.env.EMAIL_RESEND_KEY);

export const sendEmail = async (data) => {
  const branch = data.ref.split("/").pop();
  const html = `
  <div style="font-family:sans-sarif;">
    <h2>Your CI/CD Pipeline is failed!</h2>
    <span>Repository Name: ${data.repository.full_name}</span> <br>
    <span>Branch Name: ${branch}</span> <br>
    <span>Commit Hash: ${data.after}</span> <br>
    <br>
    <p>Failed to run pipeline for commit <b>${data.commits[0].message}</b></p>
  </div>
  `;

  await resend.emails.send({
    from: "CI/CD Server <git.commit.status@govindsahu.me>",
    to: data.commits[0].committer.email,
    subject: "CI/CD Server Failure!",
    html,
  });

  return { success: true, message: "OTP sent successfully." };
};
