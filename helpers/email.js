import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
   const {nombre,email,token} = datos;

   const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4597a8ded8e77a",
      pass: "7d1c23407ff224"
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


  //TODO: mover todas las varibles en duro a variables de entorno

  const transport = nodemailer.createTransport({
   host: "smtp.mailtrap.io",
   port: 2525,
   auth: {
     user: "4597a8ded8e77a",
     pass: "7d1c23407ff224"
   }
 });

 const info = await transport.sendMail({
   from:'"App TusProyectos - Administrador de Proyectos"<cuentas@tusproyectos.com>',
   to:email,
   subject:"TusProyectos - Reestablece tu contraseña",
   text:"Reestablece tu contraseña",
   html:`<p>Hola: ${nombre} has solicitado reestablecer tu contraseña en TusProyectos.com</p>
   <p>Tu cuenta ya está casi lista, solo debes comprobarla en el siguiente enlace:</p>

   <a href="${process.env.FRONT_END_URL}/olvide-password/${token}">Comprobar Cuenta</a>
   <p>Si tu no solicitaste reestablecer tu contraseña, puedes ignorar este correo</p>
   `
 })
}
