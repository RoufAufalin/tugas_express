const express = require("express")
const router = express.Router()
const controller = require("../controllers/userController")
const { sendEmail } = require("../helper/mailer")

router.post("/registers", controller.register)

router.post("/login", controller.login)

router.get("/send-email", async (req, res, next) => {
  try {
    await sendEmail({
      to: req.body.email,
      subject: "Sesuatu yang spesial untukmu hari ini... ✨",
      html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border: 1px solid #f0f0f0; background-color: white;">
                
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 26px; letter-spacing: 1px;">Semangat Pagi! ☀️</h1>
                </div>

                <div style="padding: 20px 0 0 0; text-align: center;">
                    <img src="https://i.pinimg.com/736x/88/94/da/8894dac2a1405c9e6a2747b75fb216f7.jpg" 
                         alt="Semangat Hari Ini" 
                         style="width: 80%; max-width: 300px; border-radius: 15px; display: block; margin: 0 auto;">
                </div>
                
                <div style="padding: 30px 40px 40px 40px; text-align: center;">
                    <p style="font-size: 18px; color: #4a4a4a; line-height: 1.6; font-style: italic;">
                        "Setiap hari adalah kanvas kosong, dan kamu adalah pelukisnya. Buatlah mahakarya hari ini."
                    </p>
                    
                    <div style="margin: 25px 0; border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 15px 0;">
                        <p style="color: #764ba2; font-weight: bold; font-size: 22px; margin: 0;">
                            Selamat Menjalani Hari! 🚀
                        </p>
                    </div>

                    <p style="font-size: 15px; color: #888;">
                        Semoga semua urusanmu dilancarkan, kopi (atau tehmu) terasa nikmat, dan senyum selalu menghiasi wajahmu.
                    </p>
                    
                    <a href="#" style="display: inline-block; margin-top: 20px; padding: 14px 30px; background-color: #764ba2; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: bold; box-shadow: 0 4px 15px rgba(118, 75, 162, 0.3);">
                        Sebarkan Kebaikan
                    </a>
                </div>

                <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #aaa;">
                    <p>Dikirim dengan ❤️ untuk mencerahkan harimu.</p>
                </div>
            </div>
            `,
    })

    res.status(200).json({ succes: "Success Mengirim Email" })
  } catch (err) {
    next(err)
  }
})

module.exports = router
