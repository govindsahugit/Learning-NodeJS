export const hello = async (event) => {
  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      message: "Go Serverless v4! Your function executed successfully!!!!!",
    }),
  };
};
