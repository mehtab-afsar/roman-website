export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, organisation, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }

  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/contact_submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': process.env.SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify({ name, organisation, email, message }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Supabase error:', error);
    return res.status(500).json({ error: 'Failed to save submission' });
  }

  return res.status(200).json({ success: true });
}
