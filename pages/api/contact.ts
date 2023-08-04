import { mailOptions, transport } from "../../config/nodemailer";

async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const data = req.body;

    if (!data.email) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    if (!data.phone) {
      return res.status(400).json({
        message: "Bad request",
      });
    }
    if (!data.content) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    try {
      await transport.sendMail({
        ...mailOptions,
        subject: `[가고싶어] ${data.email}님의 문의내역입니다.`,
        html: `<p>이메일: ${data.email}</p><p>연락처: ${data.phone}</p><p>문의내용: ${data.content}</p>`,
      });
      return res.status(200).json({ success: true });
    } catch (error: any) {
      console.log(error);
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  return res.status(400);
}

export default handler;
