<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Your Verification Code</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">

    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
        <tr>
            <td align="center">

                <!-- Card -->
                <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; padding:40px; box-shadow:0 4px 18px rgba(0,0,0,0.05);">
                    
                    <!-- Brand -->
                    <tr>
                        <td align="center" style="padding-bottom:25px;">
                            <h2 style="margin:0; font-size:22px; font-weight:700; color:#0a0a0f;">
                                PortoCollect
                            </h2>
                        </td>
                    </tr>

                    <!-- Title -->
                    <tr>
                        <td align="center" style="padding-bottom:15px;">
                            <h3 style="margin:0; font-size:18px; font-weight:600; color:#333;">
                                Verify Your Email Address
                            </h3>
                        </td>
                    </tr>

                    <!-- Description -->
                    <tr>
                        <td align="center" style="padding-bottom:25px;">
                            <p style="margin:0; font-size:14px; color:#666; line-height:1.6;">
                                Thank you for signing up. Use the verification code below to complete your registration.
                            </p>
                        </td>
                    </tr>

                    <!-- OTP Box -->
                    <tr>
                        <td align="center" style="padding-bottom:25px;">
                            <div style="display:inline-block; padding:15px 30px; font-size:28px; letter-spacing:6px; font-weight:700; background:#f9140d10; border:1px solid #f9140d40; border-radius:10px; color:#F9140D;">
                                {{ $otp }}
                            </div>
                        </td>
                    </tr>

                    <!-- Expiration -->
                    <tr>
                        <td align="center" style="padding-bottom:30px;">
                            <p style="margin:0; font-size:13px; color:#999;">
                                This code will expire in 10 minutes.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="border-top:1px solid #eee; padding-top:20px;">
                            <p style="margin:0; font-size:12px; color:#aaa;">
                                If you did not request this, you can safely ignore this email.
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>