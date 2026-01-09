export const getFormattedDecimal = (num) => {
  let decimalPart = num?.toString()?.split(".")[1] || "0";

  if (decimalPart?.length === 1 && decimalPart !== "0") {
    decimalPart += "0";
  }

  return decimalPart;
};

export const getBetStatus = (betStatus)=>{
  const statusDetails = {
    PENDING : "text-mustardYellow",
    WIN : "text-green-500",
    LOSS : "text-Amaranth"
  }

  return statusDetails[betStatus]
}
