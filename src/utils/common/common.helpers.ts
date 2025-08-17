// Get plus code from coordinates
export async function getPlusCode(latitude: number, longitude: number): Promise<string> {
  const plusCodeRes = await fetch(
    `https://plus.codes/api?address=${latitude},${longitude}`
  );
  const plusCodeData = await plusCodeRes.json();
  return plusCodeData.global_code || "";
}

// Get address from coordinates
export async function getAddress(latitude: number, longitude: number): Promise<string> {
  const addressRes = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  );
  const addressData = await addressRes.json();
  let display = addressData.display_name || "Unknown location";
  if (display.length > 30) display = display.slice(0, 30) + "...";
  return display;
}

// Get current position and return [plusCode, address] or error string
export async function fetchLocationDetails(): Promise<{ plusCode: string; address: string } | { error: string }> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ error: "Geolocation not supported" });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const [plusCode, address] = await Promise.all([
            getPlusCode(latitude, longitude),
            getAddress(latitude, longitude),
          ]);
          resolve({ plusCode, address });
        } catch {
          resolve({ error: "Unable to fetch location" });
        }
      },
      () => resolve({ error: "Permission denied" })
    );
  });
}



/**
 * Generates dynamic delivery slots for today and tomorrow
 * Only shows slots that are at least 2 hours from current time
 */
export const generateDeliverySlots = () => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Calculate the earliest allowed hour (current time + 2 hours)
  const earliestHour = currentHour + 2;
  
  // Define business hours (8 AM to 8 PM)
  const businessStartHour = 8;
  const businessEndHour = 20;
  
  // Generate slots for today
  const todaySlots: Array<{ date: string; label: string; slots: string[] }> = [];
  const tomorrowSlots: Array<{ date: string; label: string; slots: string[] }> = [];
  
  // Today slots - only if there are still valid slots available
  const today = new Date();
  const todayLabel = 'Today';
  
  const todaySlotTimes: string[] = [];
  for (let hour = Math.max(businessStartHour, earliestHour); hour < businessEndHour; hour++) {
    const startTime = hour === 12 ? '12:00 PM' : hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`;
    const endTime = hour + 1 === 12 ? '12:00 PM' : hour + 1 > 12 ? `${hour + 1 - 12}:00 PM` : `${hour + 1}:00 AM`;
    todaySlotTimes.push(`${startTime} - ${endTime}`);
  }
  
  // Only add today if there are valid slots and it's not too late
  if (todaySlotTimes.length > 0 && earliestHour < businessEndHour) {
    todaySlots.push({
      date: today.toISOString().split('T')[0],
      label: todayLabel,
      slots: todaySlotTimes
    });
  }
  
  // Tomorrow slots - always available
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowLabel = tomorrow.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  
  const tomorrowSlotTimes: string[] = [];
  for (let hour = businessStartHour; hour < businessEndHour; hour++) {
    const startTime = hour === 12 ? '12:00 PM' : hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`;
    const endTime = hour + 1 === 12 ? '12:00 PM' : hour + 1 > 12 ? `${hour + 1 - 12}:00 PM` : `${hour + 1}:00 AM`;
    tomorrowSlotTimes.push(`${startTime} - ${endTime}`);
  }
  
  tomorrowSlots.push({
    date: tomorrow.toISOString().split('T')[0],
    label: tomorrowLabel,
    slots: tomorrowSlotTimes
  });
  
  return [...todaySlots, ...tomorrowSlots];
};