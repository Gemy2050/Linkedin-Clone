// *** Toast Notification ***

import toast from "react-hot-toast";

export const notify = (type, message, duration = 3000) =>
  toast[type](message, {
    duration,
  });

export const showToastForPromise = (promise, messages, options) => {
  toast.promise(promise, messages, options);
};

// *** Get Post Date ***
export const getDate = (postTime) => {
  let date;

  let options = { day: "2-digit", month: "2-digit", year: "numeric" };
  let postDate = new Date(postTime).toLocaleDateString(["en-GB"], options);
  let today = new Date();
  let yesterday = new Date(today - 24 * 60 * 60 * 1000);

  if (date !== postDate) {
    if (today.toLocaleDateString(["en-GB"], options) === postDate) {
      date = "Today";
    } else if (yesterday.toLocaleDateString(["en-GB"], options) === postDate) {
      date = "Yesterday";
    } else {
      date = postDate;
    }
  }
  return date;
};
