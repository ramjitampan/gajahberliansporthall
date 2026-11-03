const today = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function createDemoSchedules() {
  const date = today();
  return [
    { id: "demo-1", courtId: "court-1", date, startTime: "08:00", endTime: "09:00" },
    { id: "demo-2", courtId: "court-1", date, startTime: "09:00", endTime: "10:00" },
    { id: "demo-3", courtId: "court-2", date, startTime: "10:00", endTime: "11:00" },
  ];
}
