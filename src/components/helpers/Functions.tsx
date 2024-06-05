export function checkIfOpen(time1: string, time2: Date) {
  // alert(new Date(time1) < new Date(time2))
  return new Date(time1) < new Date(time2); // true if time2 is later
}
