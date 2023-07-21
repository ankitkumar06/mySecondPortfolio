const contactSchema = require("../schema/systemContactSchema");
const Mongoose  = require('mongoose');
const nodemailer = require('nodemailer');



exports.createContact = async (req, res, next) => {
const { firstName,lastName, email,project,userMessage} = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'info.shiv223@gmail.com',
          pass: 'iypdkgdozjvghmby', //generate pass from google gmail
        },
      });
    
      const mailOptionSentToUser = {
        from: 'info.shiv223@gmail.com',
        to: email,
        subject:" Mail from Ankit PortFolio",
        text: 'This is the body of the email',
        html:`     <table align="center" style="width: 100%; font-family: arial,sans-serif!important; font-size: 13px;">
        <tbody>
            <tr>
                <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" style="padding-bottom: 10px; border: solid 1px #c0c0c0; width: 570px">
                        <tbody>
                            <tr>
                                <td>&nbsp;</td>
                                <td align="center" style="padding: 15px; border-bottom: #ebebeb"><a href="https://kmankit.netlify.app/" style="display: inline-block" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://www.onference.in&amp;source=gmail&amp;ust=1646743756856000&amp;usg=AOvVaw2wdE_RN8Bu5nXBDPaVfi2_">
                                    <h2 style= "background-color:#F5FFFA";border-radius:10px;>Ankit Portfolio</h2></a></td>
                                <td>&nbsp;</td>
                            </tr>

                            <tr>
                                <td colspan="3" style="padding: 15px 25px">Hello,${firstName}</td>
                            </tr>
   
                            <tr>
                                <td colspan="3" style="padding: 10px 25px; line-height: 1em;">

                                    <div>Thank You For Contact to Me !</div>
                                    <div>${firstName} ${lastName}.</div>
                                </td>
                            </tr>

                            <tr style="border: dashed 1px #c0c0c0; ">
                                <td colspan="3" style="padding: 10px 25px; line-height: 1.5em">This is a system generated mail with regards to your account at <a href="https://kmankit.netlify.app/" target="_blank" data-saferedirecturl="https://kmankit.netlify.app/">www.<span class="il">ankitpage</span>.in</a> We take the highest measures to ensure that your profile detail is secure with us.
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </td>
            </tr>
        </tbody>
    </table>`
      };
      const mailOptions = {
        from: '',
        to: "info.shiv223@gmail.com",
        subject:" Mail from Portfolio",
        text: 'This is the body of the email',
        html:`     <table align="center" style="width: 100%; font-family: arial,sans-serif!important; font-size: 13px;">
        <tbody>
            <tr>
                <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" style="padding-bottom: 10px; border: solid 1px #c0c0c0; width: 570px">
                        <tbody>
                            <tr>
                                <td>&nbsp;</td>
                                <td align="center" style="padding: 15px; border-bottom: #ebebeb"><a href="https://kmankit.netlify.app/" style="display: inline-block" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://www.onference.in&amp;source=gmail&amp;ust=1646743756856000&amp;usg=AOvVaw2wdE_RN8Bu5nXBDPaVfi2_">
                                    <h2 style= "background-color:#F5FFFA";border-radius:10px;>Ankit Portfolio</h2></a></td>
                                <td>&nbsp;</td>
                            </tr>

                            <tr>
                                <td colspan="3" style="padding: 15px 25px">Hello,</td>
                            </tr>

                            <tr>
                                <td colspan="3" style="padding: 10px 25px 0px;">Message: ${userMessage}

                                </td>
                            </tr>
                            
                            <tr>
                           
                            <td colspan="3" style="padding: 10px 25px 0px; border: 1px solid #c0c0c0; line-height: 1.2em;">
                           <b> User Details : </b><br></br>
                           FirstName : ${firstName},<br></br>
                           LastName : ${lastName},<br></br>
                           Email: ${email}

                            </td>
                        </tr>
                            <tr>
                                <td colspan="3" style="padding: 10px 25px; line-height: 1em;">

                                    <div>Regards,</div>
                                    <div>${firstName} ${lastName}.</div>
                                </td>
                            </tr>

                            <tr style="border: dashed 1px #c0c0c0; ">
                                <td colspan="3" style="padding: 10px 25px; line-height: 1.5em">This is a system generated mail with regards to your account at <a href="https://kmankit.netlify.app/" target="_blank" data-saferedirecturl="https://kmankit.netlify.app/">www.<span class="il">ankitpage</span>.in</a> We take the highest measures to ensure that your profile detail is secure with us.
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </td>
            </tr>
        </tbody>
    </table>`
      };

    try {
        const {
            firstName,
            lastName,
            email,
            project,
            userMessage,
        } = req.body;
        // const findContact = await contactSchema.find({roleName : roleName})
        // if(findContact.length !== 0){
        //     console.log(findContact);
        //     return res.status(400).json({error:"contact Already exixts !"});
        // }
        const cteContact = await contactSchema.create({
            firstName,
            lastName,
            email,
            project,
            userMessage,
            // enteredBy: { userID, userName },
        });

        
        if (!cteContact) {
            res.status(400).json({ message: "Try Again!" });
            return;
        }
        if (cteContact) {
            await cteContact.save();
            res.status(200).json({
                message: "Created Successfully!",
                cteContact,
            });
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                  console.error(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            transporter.sendMail(mailOptionSentToUser, function(error, info) {
                if (error) {
                  console.error(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            return;
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: `Something went Wrong! ${err.msg}` });
        return;
    }
};