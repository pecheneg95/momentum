import getHour from "./getHour";
import getDate from "./getDate";

export default function getTimeOfDay() {
  const hours = getHour(getDate());
  const dayTimes = ["night", "morning", "afternoon", "evening"];
  return dayTimes[Math.floor(hours / 6)];
}
