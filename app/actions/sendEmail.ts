"use server"

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  // Validate the form data
  if (!name || !email || !message) {
    return {
      success: false,
      message: "Please fill in all fields.",
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    }
  }

  try {
    // Create mailto link with pre-filled content
    const subject = `Portfolio Contact: Message from ${name}`
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`

    // For now, we'll return success and let the client handle the mailto
    // In a production environment, you'd integrate with an email service like:
    // - Resend, SendGrid, Nodemailer, etc.

    return {
      success: true,
      message: "Message sent successfully! Thank you for reaching out.",
      mailtoLink: `mailto:qubitofficial25@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      message: "Failed to send message. Please try again.",
    }
  }
}
