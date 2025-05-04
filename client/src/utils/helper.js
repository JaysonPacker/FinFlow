import { toaster } from "@/components/ui/toaster";

const handleError = (message) => {
  toaster.create({
    title: message,
    type: "error",
  });
};
const handleSuccess = (message) => {
  toaster.create({
    title: message,
    type: "success",
  });
};

/* Sends post requests to the server using fetch. Will look for various
   entries in the response JSON object, and will handle them appropriately.
*/

const sendPost = async (url, data, handler) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (result.redirect) {
    window.location = result.redirect;
  }

  if (result.error) {
    handleError(result.error);
  }

  if (handler) {
    handler(result);
  }
};

const sendGet = async (url) => {
  const response = await fetch(url);

  const result = await response.json();

  if (result.redirect) {
    window.location = result.redirect;
  }

  if (result.error) {
    handleError(result.error);
  }

  return result;
};

const sendDelete = async (url, data, handler) => {
  url = "/api" + url;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (result.redirect) {
    window.location = result.redirect;
  }

  if (result.error) {
    handleError(result.error);
  }

  if (handler) {
    handler(result);
  }
};

const verifyLogin = async () => {
  sendPost("/api/verifyLogin", {});
};

export default {
  handleError,
  sendPost,
  sendGet,
  sendDelete,
  handleSuccess,
  verifyLogin,
};
