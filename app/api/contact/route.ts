import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json(
        { message: firstError?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const validatedData = result.data;
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { name, email, phone, company, service, message } = validatedData;

    await resend.emails.send({
      from: "SwiftPro Contact <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL || "info@swiftpro.com.ng"],
      subject: `New Contact Form Submission - ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A2463;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold;">Name:</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">${company || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold;">Service:</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold;">Message:</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">${message}</td>
            </tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { message: "Failed to submit form" },
      { status: 500 }
    );
  }
}
