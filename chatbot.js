  export const talk = async (chatSession, userMessage) => {
    const result = await chatSession.sendMessage(userMessage);
    console.log(result.response.text());
    return result.response.text();
  }
  