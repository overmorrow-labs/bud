import axios from "axios";

export default async ({ message }: { message: string }) => {
  const response = await axios.post(
    "http://localhost:3002/chat",
    {
      prompt: message,
    },
    {
      headers: {
        sessionId: sessionStorage.getItem("sessionId"),
      },
    }
  );
  if (response.status === 200) {
    const responseData = response.data;
    sessionStorage.setItem("sessionId", responseData.sessionId);
    return responseData.response;
  }
  return null;
};
