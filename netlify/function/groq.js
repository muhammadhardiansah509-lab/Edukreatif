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
          content: `Buatkan 3 soal pilihan ganda untuk pelajaran ${subject} dengan topik ${topic}. Sertakan jawaban benar.`
        }
      ]
    })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data.choices[0].message.content)
  };
        }
  
