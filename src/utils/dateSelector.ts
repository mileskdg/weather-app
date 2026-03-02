export const formatDate = (wantedDate: "YESTERDAY" | "TODAY" | "TOMORROW") => {
  let date = new Date();

  switch (wantedDate) {
    case "YESTERDAY":
      {
        date.setDate(date.getDate() - 1);
      }
      break;
    case "TOMORROW":
      {
        date.setDate(date.getDate() + 1);
      }
      break;
    case "TODAY":
    default:
      break;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
