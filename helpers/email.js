import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
   const {nombre,email,token} = datos;

   const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const info = await transport.sendMail({
    from:'"App TusProyectos - Administrador de Proyectos"<cuentas@tusproyectos.com>',
    to:email,
    subject:"TusProyectos - Comprueba tu cuenta",
    text:"Comprueba tu cuenta en TusProyectos.com",
    html:`<p>Hola: ${nombre} Comprueba tu cuenta en TusProyectos.com</p>
    <p>Tu cuenta ya está casi lista, solo debes comprobarla en el siguiente enlace:</p>

    <a href="${process.env.FRONT_END_URL}/confirmar/${token}">Comprobar Cuenta</a>
    <p>Si tu no creaste esta cuenta, puedes ignorar este correo</p>
    `
  })
}
export const emailOlvidePassword = async (datos) => {
  const {nombre,email,token} = datos;




  const transport = nodemailer.createTransport({
   host: process.env.EMAIL_HOST,
   port: process.env.EMAIL_PORT,
   auth: {
     user: process.env.EMAIL_USER,
     pass: process.env.EMAIL_PASS
   }
 });

 const info = await transport.sendMail({
   from:'"App TusProyectos - Administrador de Proyectos"<cuentas@tusproyectos.com>',
   to:email,
   subject:"TusProyectos - Reestablece tu contraseña",
   text:"Reestablece tu contraseña",
   html:`<p>Hola: ${nombre} has solicitado reestablecer tu contraseña en TusProyectos.com</p>
   <p>Tu cuenta ya está casi lista, solo debes comprobarla en el siguiente enlace:</p>

   <a href="${process.env.FRONT_END_URL}/olvide-password/${token}">Reestablece tu contraseña</a>
   <p>Si tu no solicitaste reestablecer tu contraseña, puedes ignorar este correo</p>
   `
 })
}
