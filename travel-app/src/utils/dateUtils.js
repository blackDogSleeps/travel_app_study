
function calculateDate() {
  const currentDate = new Date();
  const nextDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate() + 1,
    currentDate.getHours() + 1,
    currentDate.getMinutes(),
  );

  const cutFrom = 0;
  const cutTo = 10;

  return { 
    currentDate: currentDate.toISOString().slice(cutFrom, cutTo),
    nextDate: nextDate.toISOString().slice(cutFrom, cutTo) 
  }

}
  
export { calculateDate };