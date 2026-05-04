import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function handler(event: any) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    }
  }

  try {
    const { from, to, subject, html } = JSON.parse(event.body)

    if (!from || !to || !subject || !html) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' }),
      }
    }

    const data = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    })

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error: any) {
    console.error('Error sending email:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Failed to send email',
        error: error.message 
      }),
    }
  }
}
