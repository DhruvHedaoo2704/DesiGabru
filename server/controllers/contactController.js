import sendEmail from '../utils/sendEmail.js';

export const sendContact = async (req, res) => {
  const { name, email, subject, message } = req.body;
  await sendEmail({
    email: process.env.ADMIN_EMAIL || process.env.SMTP_EMAIL,
    subject: `Contact: ${subject}`,
    message: `From: ${name} <${email}>\n\n${message}`,
    html: `<h3>Contact Form</h3><p><strong>${name}</strong> (${email})</p><p>${message}</p>`,
  });
  res.json({ success: true, message: 'Message sent successfully' });
};

export const aiAssistant = async (req, res) => {
  const { message } = req.body;
  const responses = {
    beard: 'For beard care, try our Royal Beard Elixir and Midnight Beard Balm. Apply after shower for best results.',
    hair: 'Our Titanium Hair Wax gives 12hr hold with zero flakes. Use a pea-sized amount on damp hair.',
    face: 'Start with our Charcoal Face Wash, then Hydra Shield Moisturizer morning and night.',
    default: `Thanks for reaching out! As your Desii Gabru grooming AI, I recommend exploring our ${message.includes('bundle') ? 'Bundles page for combo savings' : 'Bestsellers collection'}. For personalized advice, tell me about your skin type or beard length.`,
  };

  const lower = message.toLowerCase();
  let reply = responses.default;
  if (lower.includes('beard')) reply = responses.beard;
  else if (lower.includes('hair')) reply = responses.hair;
  else if (lower.includes('face') || lower.includes('skin')) reply = responses.face;

  res.json({
    success: true,
    reply,
    timestamp: new Date().toISOString(),
  });
};
