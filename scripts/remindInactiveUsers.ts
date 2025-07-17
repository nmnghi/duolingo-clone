import nodemailer from 'nodemailer';
import dayjs from 'dayjs';
import 'dotenv/config';
import { db } from '@/db/drizzle';
import { sql } from 'drizzle-orm';
import { userProgress } from '@/db/schema';
import fs from 'fs';

const today = dayjs().format('YYYY-MM-DD');

async function remind() {
    const inactiveUsers = await db
        .select()
        .from(userProgress)
        .where(sql`DATE(${userProgress.lastActive}) < ${today}`);

    const transporter = nodemailer.createTransport({
        // host: process.env.EMAIL_HOST, // SMTP Server Address
        // port: Number(process.env.EMAIL_PORT), // Port của SMTP
        // secure: true, // Nếu sử dụng SSL, chuyển sang false nếu không dùng
        // auth: {
        //     user: process.env.EMAIL_USERNAME, // Tên đăng nhập
        //     pass: process.env.EMAIL_PASSWORD  // Mật khẩu hoặc app password
        // }

        // mail services
        service: "gmail",
        auth: {
            user: process.env.S_EMAIL,
            pass: process.env.S_PASS
        }
    });

    for (const user of inactiveUsers) {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            // to: user.userId, // hoặc map sang email nếu có
            to: "abhkim0803@gmail.com",
            subject: `Nhắc nhở đăng nhập`,
            text: `Bạn chưa đăng nhập hôm nay. Đừng quên giữ streak nhé!`,
        });

        console.log(`✅ Gửi nhắc đến ${user.userName}`);
    }

    const logDir = './logs';
    const logFile = `${logDir}/remind_log.txt`;

    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    if (fs.existsSync(logFile)) {
        fs.appendFileSync(logFile, `Task chạy lúc: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}\n`);
    } else {
        fs.writeFileSync(logFile, `Task chạy lúc: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}\n`);
    }

}
remind();
