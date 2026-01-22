export const getSystemWeek = () => {
  const today = new Date();
  const week = [];
  // Monday set karne ka sabse saaf tareeka
  const start = new Date(today);
  start.setDate(today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1));

  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    week.push({
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      dateString: d.toISOString().split('T')[0],
    });
  }
  return week;
};

export const WEEK_DATA = getSystemWeek();