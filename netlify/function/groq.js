export async function handler(event) {
  const { subject, topic } = JSON.parse(event.body);

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: "Kamu adalah guru profesional di Indonesia."
        },
        {
          role: "user",
          content: {
  role: "user",
  content: `Buatkan 3 soal pilihan ganda untuk pelajaran ${subject} dengan topik ${topic}.
Format HARUS JSON seperti ini:
[
  {
    "q": "pertanyaan",
    "a": ["opsi1","opsi2","opsi3"],
    "correct": 0
  }
]`
}
